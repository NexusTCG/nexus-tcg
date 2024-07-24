"use server";

import { createClient } from "@/app/utils/supabase/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function GET(
  request: NextRequest
) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const {
      data,
      error
    } = await supabase
      .auth
      .exchangeCodeForSession(code);

    if (error) {
      return Response.redirect(
        `${requestUrl.origin}/login?error=${encodeURIComponent(error.message)}`
      );
    }

    if (data.session.user) {
      return Response.redirect(`${requestUrl.origin}/home`);
    } else {
      return Response.redirect(
        `${requestUrl.origin}/login?error=No user found in session.`
      );
    };
  };
};
