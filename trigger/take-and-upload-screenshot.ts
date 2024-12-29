import { logger, task, wait } from "@trigger.dev/sdk/v3";
import puppeteer from "puppeteer";
import { supabaseAdmin } from "@/app/utils/supabase/admin";

export const takeAndUploadScreenshotTask = task({
  id: "take-and-upload-screenshot",
  run: async (payload: { cardId: string; isUpdate?: boolean }) => {
    const { cardId, isUpdate } = payload;
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
        `${siteUrl}/cards/${cardId}?mode=initial`,
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

      // Wait for 2 seconds to ensure the card is fully loaded
      await wait.for({ seconds: 2 });

      try {
        logger.info("Waiting for card element and grade icon to load...");
        await Promise.all([
          page.waitForSelector(`#card-render-container-${cardId}-initial`, {
            timeout: 60000,
          })
            .then(() => logger.info("Card container found")),
          page.waitForSelector(`#grade-icon-initial`, { timeout: 60000 })
            .then(() => logger.info("Grade icon element found")),
        ]);

        // Verify grade icon is loaded
        const imageState = await page.evaluate(() => {
          const img = document.querySelector(
            "#grade-icon-initial",
          ) as HTMLImageElement;
          return {
            exists: !!img,
            src: img?.src || "no-src",
          };
        });
        logger.info("Image state:", imageState);
      } catch (waitError) {
        // Log the HTML state when the error occurs
        const pageContent = await page.content();
        logger.error("Element wait failed. Current page state:", {
          error: waitError,
          html: pageContent.substring(0, 1000), // Limit to first 1000 chars
        });
        throw waitError;
      }

      // Get the element
      logger.info("Waiting for card element to load...");
      const element = await page.$(`#card-render-container-${cardId}-initial`);
      if (!element) {
        throw new Error("Card element not found");
      }

      // Get the element's dimensions
      logger.info("Getting element dimensions...");
      const box = await element.boundingBox();
      if (!box) {
        throw new Error("Could not get element dimensions");
      }

      // Get current card data to check existing render
      logger.info("Fetching current card data...");
      const {
        data: currentCard,
        error: fetchError,
      } = await supabaseAdmin
        .from("nexus_cards")
        .select("card_render, updated_at")
        .eq("id", cardId)
        .single();

      if (fetchError) throw fetchError;

      // Take screenshot of the element
      logger.info("Taking screenshot...");
      const screenshot = await element.screenshot({ type: "png" });

      // Generate filename with timestamp hash
      logger.info("Generating filename...");
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

          logger.info("Old render removed successfully");
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

      logger.info("Public URL:", { publicUrl });

      // Update card record with render URL
      logger.info("Updating card record with render URL...");
      const { error: updateError } = await supabaseAdmin
        .from("nexus_cards")
        .update({
          card_render: publicUrl,
        })
        .eq("id", cardId);

      if (updateError) throw updateError;

      logger.info("Card record updated successfully");

      // Close browser
      logger.info("Closing browser...");
      await browser.close();

      logger.info(
        `Screenshot task completed for ${isUpdate ? "updated" : "new"} card`,
        { cardId, publicUrl },
      );
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
