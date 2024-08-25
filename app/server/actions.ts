import "server-only";
import { createClient } from "@/app/utils/supabase/server";
import { cookies } from "next/headers";
// // Server
// import { getCurrentUserId } from "@/app/server/auth";

const cookieStore = cookies();
const supabase = createClient(cookieStore);

// TODO: Add action to delete a card
// TODO: Add action to update a card
// TODO: Add action to delete a user

export async function getRandomKeyword() {
  try {
    const { 
      data, 
      error 
    } = await supabase
      .from("keywords")
      .select()

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