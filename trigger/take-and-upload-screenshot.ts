import { logger, task } from "@trigger.dev/sdk/v3";
import puppeteer from "puppeteer";
import { createClient } from "@supabase/supabase-js";

export const takeAndUploadScreenshotTask = task({
  id: "take-and-upload-screenshot",
  run: async (payload: { cardId: string; isUpdate?: boolean }) => {
    const { cardId, isUpdate } = payload;
    logger.info(
      `Starting screenshot task for ${isUpdate ? "updated" : "new"} card`,
      { cardId },
    );

    // Initialize Supabase client
    const supabase = createClient(
      process.env.SUPABASE_URL ?? "",
      process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
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
        { waitUntil: "networkidle0" },
      );

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
        ? `card-${cardId}-initial-${Date.now()}.png`
        : `card-${cardId}-initial.png`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase
        .storage
        .from("card-renders")
        .upload(filename, screenshot, {
          contentType: "image/png",
          upsert: true,
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase
        .storage
        .from("card-renders")
        .getPublicUrl(filename);

      // Update card record with render URL
      const { error: updateError } = await supabase
        .from("nexus_cards")
        .update({
          card_render: [publicUrl],
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
