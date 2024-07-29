"use server";

import { createClient } from "@/app/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || url.origin;

  if (code) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    
    try {
      // Exchange code for session
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        console.error("Error exchanging code for session:", error);
        return NextResponse.redirect(
          `${baseUrl}/login?error=${encodeURIComponent(error.message)}`
        );
      } 
    
      if (
        data?.session && 
        data?.session.user
      ) {
        const user = data.session.user;
        
        // Check if user has a profile
        let { 
          data: profile, 
          error: profileError 
        } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (!profile) {
          const { 
            error: insertError 
          } = await supabase
            .from("profiles")
            .insert({
              id: user.id,
              email: user.email,
              first_name: user.user_metadata.first_name || '',
              last_name: user.user_metadata.last_name || '',
              avatar_url: user.user_metadata.avatar_url || '',
            });

          if (insertError) {
            console.error(
              "Error creating user profile:", 
              insertError
            );
          } else {
            // Fetch the newly created profile
            ({ 
              data: profile, 
              error: profileError 
            } = await supabase
              .from("profiles")
              .select("*")
              .eq("id", user.id)
              .single());
          }
        }

        if (
          profile && 
          !profile.username
        ) {
          return NextResponse.redirect(`${baseUrl}/login/create-profile`);
        }

        // If user has a complete profile, redirect to home
        return NextResponse.redirect(`${baseUrl}/home`);
      }
    } catch (error) {
      console.error("Unexpected error in auth callback:", error);
      return NextResponse.redirect(
        `${baseUrl}/login?error=An unexpected error occurred`
      );
    }
  }
  
  // If no code, redirect to login
  return NextResponse.redirect(`${baseUrl}/login`);
}