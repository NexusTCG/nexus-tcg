import { logger, task } from "@trigger.dev/sdk/v3";
import puppeteer from "puppeteer";
import { createClient } from "@supabase/supabase-js";

type TaskPayload = {
  cardId: string;
};

export const takeAndUploadScreenshotTask = task({
  id: "take-and-upload-screenshot",
  run: async ({ payload }: { payload: TaskPayload }) => {
    const { cardId } = payload;
    logger.info("Starting screenshot task for card", { cardId });

    // Initialize Supabase client
    const supabase = createClient(
      process.env.SUPABASE_URL ?? "",
      process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
    );

    const siteUrl = process.env.SITE_URL ?? "http://localhost:3000";

    try {
      // Launch browser and take screenshot
      const browser = await puppeteer.launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
      const page = await browser.newPage();

      await page.goto(
        `${siteUrl}/cards/${cardId}?mode=initial`,
        { waitUntil: "networkidle0" },
      );

      const element = await page.$(`#card-render-container-${cardId}-initial`);
      if (!element) {
        throw new Error("Card element not found");
      }

      const screenshot = await element.screenshot({ type: "png" });

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase
        .storage
        .from("card-renders")
        .upload(`${cardId}-initial.png`, screenshot, {
          contentType: "image/png",
          upsert: true,
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase
        .storage
        .from("card-renders")
        .getPublicUrl(`${cardId}-initial.png`);

      // Update card record with render URL
      const { error: updateError } = await supabase
        .from("nexus_cards")
        .update({ card_render: [publicUrl] })
        .eq("id", cardId);

      if (updateError) throw updateError;

      await browser.close();

      logger.info("Screenshot task completed", { cardId, publicUrl });
      return { success: true, cardId, publicUrl };
    } catch (error) {
      logger.error("Error in screenshot task", { error });
      throw error;
    }
  },
});
