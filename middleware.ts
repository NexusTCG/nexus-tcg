import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/app/utils/supabase/middleware";

// Define public routes
const publicRoutes = ["/", "/login", "/login/create-profile", "/cards", "/create", "/learn", "/play", "/profile/[slug]"];

export async function middleware(request: NextRequest) {
  const { supabase, response } = createClient(request);
  const url = new URL(request.url);
  const path = url.pathname;

  // Check if the current path is public
  const isPublicRoute = publicRoutes.some(route => 
    path === route || (route === "/cards" && path.startsWith("/cards/"))
  );

  if (isPublicRoute) {
    return response;
  }

  // Check user session
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    // Redirect to login if user is not authenticated
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If user is authenticated and tries to access login or home page, redirect to dashboard
  if (user && (path === "/" || path.includes("/login"))) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('username')
      .eq('id', user.id)
      .single();

    if (profile?.username) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else if (path !== "/login/create-profile") {
      return NextResponse.redirect(new URL("/login/create-profile", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|images|favicon.ico).*)"],
};