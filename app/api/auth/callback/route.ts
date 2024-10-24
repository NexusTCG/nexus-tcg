"use server";

import { createClient } from "@/app/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// Verify there is a session
// Redirect to /login if there is no session
// Grab the session from the data object
// Verify the user has a complete profile based on their id (first name, last name, email, and avatar url)
// Grab the first name, last name, email, and avatar url from the user_metadata object
// Pass the data to /login/create-profile via query params if the user does not have a profile
// Redirect to /login/create-profile if the user does not have a profile
// Redirect to /home if the user has a profile

export async function GET(
  req: NextRequest
) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || url.origin;

  if (code) {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    
    try {
      // Exchange code for session
      const { 
        data, 
        error 
      } = await supabase
        .auth
        .exchangeCodeForSession(code);

      if (error) {
        return NextResponse.redirect(
          `${baseUrl}/login?error=${encodeURIComponent(
            (error as Error).message || 
            "An unexpected error occurred"
          )}`
        );
      } 
    
      if (
        data?.session && 
        data?.session.user
      ) {
        const user = data.session.user;

        // Fetch: Profile
        let { 
          data: profile, 
          error: profileError 
        } = await supabase
          .from("profiles")
          .select("*")
          .eq(
            "id", 
            user.id
          )
          .maybeSingle();

        // Redirect to /login/create-profile if:
        // Error fetching profile
        if (profileError) {
          return Response.redirect(
            `${url.origin}/login/create-profile/?error=${encodeURIComponent(
              profileError.message || 
              "An unexpected error occurred"
            )}`
          );
        }

        const { 
          name, 
          avatar_url 
        } = user.user_metadata;

        // Redirect to /login/create-profile if:
        // No profile, or no username
        if (
          (
            !profile || 
            (
              profile && 
              (
                !profile.username || 
                profile.username === ""
              )
            )
          )
        ) {
          const queryParams = new URLSearchParams({
            user_id: user.id,
            full_name: name || "",
            avatar_url: avatar_url || "",
          }).toString();

          // Pass first name, last name, email, and avatar url to /login/create-profile
          return Response.redirect(
            `${url.origin}/login/create-profile?${queryParams}`
          );
        }

        // If user has a profile, but no avatar_url, update profile
        if (
          profile && 
          (
            avatar_url ||
            avatar_url !== ""
          ) 
            &&
          (
            !profile.avatar_url || 
            profile.avatar_url === ""
          )
        ) {
          const { 
            error 
          } = await supabase
            .from("profiles")
            .update({
              avatar_url: avatar_url,
            })
            .eq(
              "id", 
              user.id
            )
        }

        // Redirect to /home if:
        // Profile and complete profile
        if (
          profile && 
          profile.username
        ) {
          return NextResponse.redirect(`${baseUrl}/home`);
        }
      }
    } catch (error) {
      // Redirect to /login if: Error
      return NextResponse.redirect(
        `${baseUrl}/login?error=${encodeURIComponent(
          (error as Error).message || 
          "An unexpected error occurred"
        )}`
      );
    }
  }
  
  // Redirect to /login if: No code
  return NextResponse.redirect(`${baseUrl}/login`);
}