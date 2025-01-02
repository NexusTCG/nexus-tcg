import { logger, task, wait } from "@trigger.dev/sdk/v3";
import puppeteer from "puppeteer";
import { supabaseAdmin } from "@/app/utils/supabase/admin";

export const takeAndUploadScreenshotTask = task({
  id: "take-and-upload-screenshot",
  run: async (
    payload: {
      cardId: string;
      mode?: "initial" | "anomaly";
      isUpdate?: boolean;
    },
  ) => {
    const { cardId, mode, isUpdate } = payload;
    logger.info(
      `Starting screenshot task for ${isUpdate ? "updated" : "new"} card`,
      { cardId },
    );

    // TODO: Update to custom URL
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ??
      "https://nexus-tcg.vercel.app/";

    try {
      // Launch browser and take screenshot
      const browser = await puppeteer.launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
      const page = await browser.newPage();

      // Set viewport size
      await page.setViewport({
        width: 2400,
        height: 2400,
        deviceScaleFactor: 4, // Increased from 2 to match html-to-image quality
      });

      // Navigate to the card page
      await page.goto(
        `${siteUrl}/cards/${cardId}?mode=${
          mode === "initial" ? "initial" : "anomaly"
        }`,
        { waitUntil: "networkidle0", timeout: 60000 },
      );

      // Wait for card element and hide unwanted elements
      logger.info("Waiting for elements to load...");
      await page.evaluate(() => {
        // Hide cookie banner
        const cookieBanner = document.querySelector(
          '[aria-label="Cookie Banner"]',
        );
        if (cookieBanner) {
          (cookieBanner as HTMLElement).style.display = "none";
        }

        // Hide any navigation or header elements
        const header = document.querySelector("header");
        if (header) {
          (header as HTMLElement).style.display = "none";
        }
      });

      try {
        logger.info("Waiting for card element and grade icon to load...");

        // First wait for card container
        await page.waitForSelector(
          `#card-render-container-${cardId}-${
            mode === "initial" ? "initial" : "anomaly"
          }`,
          {
            timeout: 60000,
          },
        );
        logger.info("Card container found");

        // Then wait for grade icon with more detailed logging
        const gradeIconSelector = `#grade-icon-${
          mode === "initial" ? "initial" : "anomaly"
        }`;
        await page.waitForSelector(gradeIconSelector, { timeout: 60000 });
        logger.info("Grade icon element found");

        // Force load the image
        await page.evaluate((selector) => {
          const img = document.querySelector(selector) as HTMLImageElement;
          if (img) {
            img.loading = "eager";
            img.style.visibility = "visible";
            img.style.display = "block";
          }
        }, gradeIconSelector);

        // Wait longer for initial page load
        await wait.for({ seconds: 2 });

        // Simpler check for image loading
        const imageState = await page.evaluate((selector) => {
          const img = document.querySelector(selector) as HTMLImageElement;
          return {
            exists: !!img,
            complete: img?.complete,
            src: img?.src,
            currentSrc: img?.currentSrc,
            loading: img?.loading,
            display: img?.style.display,
            visibility: img?.style.visibility,
          };
        }, gradeIconSelector);

        logger.info("Grade icon state:", imageState);

        if (!imageState.exists || !imageState.complete) {
          throw new Error(
            `Grade icon not ready: ${JSON.stringify(imageState)}`,
          );
        }
      } catch (waitError) {
        // Get more context about the page state
        const diagnostics = await Promise.all([
          page.content(),
          page.url(),
          page.title(),
          page.evaluate(() => ({
            viewportSize: {
              width: window.innerWidth,
              height: window.innerHeight,
            },
            documentState: document.readyState,
            allImages: Array.from(document.images).map((img) => ({
              id: img.id,
              src: img.src,
              complete: img.complete,
            })),
          })),
        ]).catch((e) => logger.error("Error getting diagnostics:", e));

        logger.error("Element wait failed. Detailed state:", {
          error: waitError,
          url: diagnostics?.[1],
          title: diagnostics?.[2],
          pageState: diagnostics?.[3],
          html: diagnostics?.[0]?.substring(0, 1000),
        });

        throw new Error(
          `Grade icon loading failed: ${
            (waitError as Error).message
          }\nPage URL: ${diagnostics?.[1]}`,
        );
      }

      // Get the element
      logger.info("Getting card element...");
      const element = await page.$(
        `#card-render-container-${cardId}-${
          mode === "initial" ? "initial" : "anomaly"
        }`,
      );
      if (!element) {
        throw new Error("Card element not found");
      }

      // Get current card data
      const { data: currentCard, error: fetchError } = await supabaseAdmin
        .from("nexus_cards")
        .select("card_render")
        .eq("id", cardId)
        .single();

      if (fetchError) throw fetchError;

      // Take screenshot
      logger.info("Taking screenshot...");
      const screenshot = await element.screenshot({ type: "png" });

      // Generate filename
      const timestamp = Date.now();
      const filename = `card-${cardId}-${timestamp}.png`;

      // Remove old render if it exists
      if (currentCard?.card_render) {
        logger.info("Removing old render...");
        const oldFilename = currentCard.card_render.split("/").pop();
        if (oldFilename) {
          await supabaseAdmin
            .storage
            .from("card-renders")
            .remove([oldFilename])
            .catch((error) =>
              logger.warn("Failed to remove old render", { error })
            );
        }
      }

      // Upload new screenshot
      logger.info("Uploading new screenshot...");
      const { error: uploadError } = await supabaseAdmin
        .storage
        .from("card-renders")
        .upload(filename, screenshot, {
          contentType: "image/png",
          cacheControl: "no-cache, no-store, must-revalidate",
        });

      if (uploadError) throw uploadError;

      logger.info("Screenshot uploaded successfully");

      // Get public URL
      logger.info("Getting public URL...");
      const { data: { publicUrl } } = await supabaseAdmin
        .storage
        .from("card-renders")
        .getPublicUrl(filename);

      // Update card record
      logger.info("Updating card record...");
      const { error: updateError } = await supabaseAdmin
        .from("nexus_cards")
        .update({
          card_render: publicUrl,
        })
        .eq("id", cardId);

      if (updateError) throw updateError;

      // Close browser
      await browser.close();

      logger.info("Screenshot task completed successfully", {
        cardId,
        publicUrl,
      });

      return {
        success: true,
        cardId,
        publicUrl,
        isUpdate,
      };
    } catch (error) {
      logger.error("Error in screenshot task", { error });
      throw error;
    }
  },
});
