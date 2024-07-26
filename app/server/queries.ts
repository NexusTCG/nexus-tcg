import "server-only";
// Utils
import { createClient } from "@/app/utils/supabase/server";
import { cookies } from "next/headers";
// Actions
import { getCurrentUserId } from "@/app/server/auth";

const cookieStore = cookies();
const supabase = createClient(cookieStore);
const userId = getCurrentUserId();

export async function getUserProfile() {
  // TODO: Logic to fetch user profile
}

export async function getUserCards() {
  // TODO: Logic to fetch user cards
}