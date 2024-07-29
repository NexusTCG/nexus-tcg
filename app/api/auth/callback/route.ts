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
    
      if (data?.session && data?.session.user) {
        const user = data.session.user;
        
        // Check if user has a profile
        const { 
          data: profile, 
          error: profileError 
        } = await supabase
          .from("profiles")
          .select("username, avatar_url, bio")
          .eq("id", user.id)
          .single();

        if (profileError && profileError.code !== 'PGRST116') {
          console.error("Error fetching user profile:", profileError);
        }

        if (!profile || !profile.username) {
          // If no profile or username, redirect to create-profile
          const avatarUrl = user.user_metadata.avatar_url || '';
          return NextResponse.redirect(`${baseUrl}/login/create-profile?avatar=${encodeURIComponent(avatarUrl)}`);
        }
        // const { data: profile, error: profileError } = await supabase
        //   .from("profiles")
        //   .select("*")
        //   .eq("id", data.session.user.id)
        //   .maybeSingle();
      
        // if (profileError) {
        //   console.error("Error fetching user profile:", profileError);
        // }

        // // If user has no profile, redirect to create profile
        // if (!profile) {
        //   return NextResponse.redirect(`${baseUrl}/login/create-profile`);
        // }

        // If user has profile, redirect to home
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