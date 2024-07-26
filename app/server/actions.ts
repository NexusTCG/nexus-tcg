import "server-only";
import { createClient } from "@/app/utils/supabase/server";
import { cookies } from "next/headers";
// Server
import { getCurrentUserId } from "@/app/server/auth";

const cookieStore = cookies();
const supabase = createClient(cookieStore);

// TODO: Add action to delete a card
// TODO: Add action to update a card
// TODO: Add action to delete a user