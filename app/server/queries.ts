// import "server-only";
// // Utils
// import { createClient } from "@/app/utils/supabase/server";
// import { cookies } from "next/headers";
// // Actions
// import { getCurrentUserId } from "@/app/server/auth";

// export async function getUserProfile() {
//   const cookieStore = cookies();
//   const supabase = createClient(cookieStore);
//   const userId = getCurrentUserId();
//   // TODO: Logic to fetch user profile
// }

// export async function getUserCards() {
//   const cookieStore = cookies();
//   const supabase = createClient(cookieStore);
//   const userId = getCurrentUserId();
//   // TODO: Logic to fetch user cards
// }