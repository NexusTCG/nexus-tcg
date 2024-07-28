import { cache } from "react";
import { cookies } from "next/headers";
import { createClient } from "@/app/utils/supabase/server";

const cookieStore = cookies();
const supabase = createClient(cookieStore);

export const getCurrentUserId = cache(async () => {
  const { 
    data, 
    error 
  } = await supabase
    .auth
    .getUser();

  if (error) throw error;

  const currentUserId = data.user.id;

  return currentUserId;
});