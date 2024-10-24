import { cache } from "react";
import { cookies } from "next/headers";
import { createClient } from "@/app/utils/supabase/server";
import { ProfileDTO } from "@/app/lib/types/dto";
import { getCurrentUserId } from "@/app/server/auth";

export const getUserProfileDTO = cache(async (): Promise<ProfileDTO | null> => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  try {
    const userId = await getCurrentUserId();

    const { data, error } = await supabase
      .from("profiles")
      .select("first_name, last_name, username, bio, avatar_url, created_at")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Error fetching user profile:", error.message);
      // return error instead
      return null;
    }

    return {
      user_id: userId,
      first_name: data?.first_name,
      last_name: data?.last_name,
      username: data?.username,
      bio: data?.bio,
      avatar_url: data?.avatar_url,
      created_at: data?.created_at,
    };
  } catch (error) {
    console.error("Error in getUserProfileDTO:", error);
    // return error instead
    return null;
  }
});
