import "server-only";

import { createClient } from "@/app/utils/supabase/server";
import { cookies } from "next/headers";
// Server
import { getCurrentUserId } from "@/app/server/auth";

// TODO: Add action to delete a card
// TODO: Add action to update a card
// TODO: Add action to delete a user

// INSERT DATA

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
