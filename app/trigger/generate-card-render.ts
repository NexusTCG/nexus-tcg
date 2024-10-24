import { logger, task } from "@trigger.dev/sdk/v3";
import { createClient } from "@/app/utils/supabase/server";
import { cookies } from "next/headers";
import puppeteer from "puppeteer";

export const generateCardRender = task({
  id: "generate-card-render",
  run: async (payload: {
    cardId: string;
    mode: "initial" | "anomaly";
  }) => {
    const { cardId, mode } = payload;

    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    logger.info("Generating card render", { cardId, mode });

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(
      `${process.env.NEXT_PUBLIC_SITE_URL}/cards/${cardId}?mode=${mode}`,
      {
        waitUntil: "networkidle0",
      },
    );

    const element = await page.$(`#card-render-container-${cardId}-${mode}`);

    if (element) {
      const screenshot = await element.screenshot({ type: "png" });

      logger.info("Card render generated", { cardId, mode });

      // Upload screenshot to Supabase
      const {
        data,
        error,
      } = await supabase
        .storage
        .from("card-renders")
        .upload(`${cardId}-${mode}.png`, screenshot, {
          contentType: "image/png",
          upsert: true,
        });

      if (error) {
        logger.error("Error uploading screenshot", { cardId, mode, error });
        throw error;
      }

      logger.info("Screenshot uploaded successfully", { cardId, mode });

      // Get public URL from Supabase
      const {
        data: { publicUrl },
      } = await supabase
        .storage
        .from("card-renders")
        .getPublicUrl(`${cardId}-${mode}.png`);

      logger.info("Public URL", { cardId, mode, publicUrl });

      // Get current card render data from Supabase
      const {
        data: cardData,
        error: fetchError,
      } = await supabase
        .from("cards")
        .select("card_render")
        .eq("id", cardId)
        .single();

      if (fetchError) {
        logger.error("Error fetching card data", {
          cardId,
          mode,
          fetchError,
        });
        throw fetchError;
      }

      const updatedCardRender = cardData.card_render
        ? [...cardData.card_render, publicUrl]
        : [publicUrl];

      // Update card render data in Supabase
      const { error: updateError } = await supabase
        .from("cards")
        .update({ card_render: updatedCardRender })
        .eq("id", cardId);

      if (updateError) {
        logger.error("Error updating card render", {
          cardId,
          mode,
          updateError,
        });
        throw updateError;
      }

      logger.info("Card render updated successfully", { cardId, mode });
    } else {
      logger.warn("Element not found", { cardId, mode });
    }

    await browser.close();

    return { success: true, cardId, mode };
  },
});
