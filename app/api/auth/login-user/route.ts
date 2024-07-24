"use server";

import { createClient } from "@/app/utils/supabase/server";
import { cookies } from "next/headers";

const protectedRedirectRoute = "/home";

export async function POST(
  request: Request
) {
  const requestUrl = new URL(request.url).origin;
  const formData = await request.formData();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase
    .auth
    .signInWithPassword({
      email, 
      password
    });

    if (error) {
      console.log(`Error when attempting sign in: ${error.message}`);
      const errorMessage = encodeURIComponent(error.message);
      return Response.redirect(`${requestUrl}/login?error=${errorMessage}`);
    } else {
      return Response.redirect(`${requestUrl}${protectedRedirectRoute}`);
    };
};