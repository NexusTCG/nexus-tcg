import "server-only";

// Utils
import { createClient } from "@/app/utils/supabase/server";
import { cookies } from "next/headers";
import { toPng } from "html-to-image";
import puppeteer from "puppeteer";
// Types
import { CardDTO } from "@/app/lib/types/dto";
// Server
import { getCurrentUserId } from "@/app/server/auth";
// Tasks
import { generateCardRender } from "@/app/trigger/generate-card-render";

// TODO: Add action to delete a card
// TODO: Add action to update a card
// TODO: Add action to delete a user

// --- UPLOAD DATA --- //

export async function uploadGeneratedArt(
  imageUrls: string[],
) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  try {
    const uploadedUrls = await Promise.all(imageUrls.map(async (imageUrl) => {
      const response = await fetch(imageUrl);

      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`);
      }

      const imageBuffer = await response.arrayBuffer();

      const filename = `generated-art/${Date.now()}-${
        Math.random().toString(36).substring(2, 15)
      }.webp`;

      const { error: uploadError } = await supabase
        .storage
        .from("generated-art")
        .upload(filename, imageBuffer, {
          contentType: "image/webp",
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        throw new Error(
          `Failed to upload generated art image: ${uploadError.message}`,
        );
      }

      const { data } = supabase
        .storage
        .from("generated-art")
        .getPublicUrl(filename);

      return data.publicUrl;
    }));

    return uploadedUrls;
  } catch (error) {
    console.error("Failed to upload generated art:", error);
    throw error;
  }
}

// --- FETCH DATA --- //

export async function fetchRandomKeyword() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  try {
    const {
      data,
      error,
    } = await supabase
      .from("keywords")
      .select();

    if (error) {
      throw new Error(`Error fetching keywords: ${error.message}`);
    }

    if (!data || data.length === 0) {
      throw new Error("No keywords found");
    }

    const randomIndex = Math.floor(Math.random() * data.length);
    return data[randomIndex];
  } catch (error) {
    console.error("Failed to get random keyword:", error);
    throw error;
  }
}

// --- GENERATE DATA --- //

export async function triggerCardRender(
  cardId: string,
  mode: "initial" | "anomaly",
) {
  const result = await generateCardRender.trigger({ cardId, mode });
  return result;
}

// export async function generateCardRenders(card: CardDTO): Promise<CardDTO> {
//   const cookieStore = cookies();
//   const supabase = createClient(cookieStore);

//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   const renders: string[] = [];

//   for (const mode of ['initial', 'anomaly']) {
//     await page.goto(`${process.env.NEXT_PUBLIC_SITE_URL}/cards/${card.id}?mode=${mode}`, {
//       waitUntil: 'networkidle0'
//     });

//     const element = await page.$(`#card-render-container-${card.id}-${mode}`);

//     if (element) {
//       const screenshot = await element.screenshot({ type: 'png' });

//       const { data, error } = await supabase
//         .storage
//         .from('card-renders')
//         .upload(`${card.id}/card-${card.id}-${mode}.png`, screenshot, {
//           contentType: 'image/png',
//           upsert: true,
//         });

//       if (error) throw error;

//       const { data: { publicUrl } } = supabase
//         .storage
//         .from('card-renders')
//         .getPublicUrl(`${card.id}/card-${card.id}-${mode}.png`);

//       renders.push(publicUrl);
//     }
//   }

//   await browser.close();

//   if (renders.length === 2) {
//     const { error } = await supabase
//       .from('nexus_cards')
//       .update({ cardRender: renders })
//       .eq('id', card.id);

//     if (error) throw error;

//     return {
//       ...card,
//       card_render: renders,
//     };
//   }

//   return card;
// }
