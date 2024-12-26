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

      // Add console log listener for debugging
      page.on(
        "console",
        (msg) => logger.info("Browser console:", { message: msg.text() }),
      );

      // Navigate to the card page
      await page.goto(
        `${siteUrl}/cards/${cardId}?mode=initial`,
        { waitUntil: "networkidle0", timeout: 60000 },
      );

      // Wait for initial render with logging
      logger.info("Waiting for elements to load...");

      // Wait for card element and hide unwanted elements
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
        await Promise.all([
          page.waitForSelector(`#card-render-container-${cardId}-initial`, {
            timeout: 60000,
          })
            .then(() => logger.info("Card container found")),
          page.waitForSelector(`#grade-icon-initial`, { timeout: 60000 })
            .then(() => logger.info("Grade icon element found")),
          page.waitForFunction(
            () => {
              const img = document.querySelector(
                "#grade-icon-initial",
              ) as HTMLImageElement;
              const isLoaded = img && img.complete && img.naturalHeight !== 0;
              console.log("Grade icon load status:", {
                exists: !!img,
                complete: img?.complete,
                naturalHeight: img?.naturalHeight,
              });
              return isLoaded;
            },
            { timeout: 60000 },
          ).then(() => logger.info("Grade icon fully loaded")),
        ]);
      } catch (waitError) {
        // Log the HTML state when the error occurs
        const pageContent = await page.content();
        logger.error("Element wait failed. Current page state:", {
          error: waitError,
          html: pageContent.substring(0, 1000), // Limit to first 1000 chars
        });
        throw waitError;
      }

      const element = await page.$(`#card-render-container-${cardId}-initial`);
      if (!element) {
        throw new Error("Card element not found");
      }

      // Get the element's dimensions
      const box = await element.boundingBox();
      if (!box) {
        throw new Error("Could not get element dimensions");
      }

      // Take screenshot of the element
      const screenshot = await element.screenshot({ type: "png" });

      // Generate filename
      const filename = isUpdate
        ? `card-${cardId}-${Date.now()}.png`
        : `card-${cardId}.png`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabaseAdmin
        .storage
        .from("card-renders")
        .upload(filename, screenshot, {
          contentType: "image/png",
          upsert: true,
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = await supabaseAdmin
        .storage
        .from("card-renders")
        .getPublicUrl(filename);

      // Update card record with render URL
      const { error: updateError } = await supabaseAdmin
        .from("nexus_cards")
        .update({
          card_render: publicUrl,
        })
        .eq("id", cardId);

      if (updateError) throw updateError;

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
