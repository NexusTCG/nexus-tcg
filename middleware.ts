import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/app/utils/supabase/middleware";

// Define public routes
const publicRoutes = [
  "/",
  "/login",
  "/login/create-profile",
  "/cards",
  "/learn",
  "/profile/[slug]",
];

// function isOpenGraphRoute(path: string) {
//   const isOG = path.includes("/opengraph-image") ||
//     path.includes("/twitter-image");
//   console.log(
//     `[Server] Path: ${path} Is OpenGraph: ${isOG}`,
//   );
//   return isOG;
// }

function isOpenGraphRoute(path: string) {
  return path.includes("/opengraph-image") || path.includes("/twitter-image");
}

export async function middleware(request: NextRequest) {
  const { supabase, response } = createClient(request);
  const url = new URL(request.url);
  const path = url.pathname;

  // Return response for opengraph image
  if (isOpenGraphRoute(path)) {
    return NextResponse.next();
  }

  // Check user session
  const { data: { user } } = await supabase.auth.getUser();

  // Redirect authenticated users to home or create profile
  if (user && (path === "/" || path.includes("/login"))) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", user.id)
      .single();

    if (profile?.username) {
      return NextResponse.redirect(new URL("/home", request.url));
    } else if (path !== "/login/create-profile") {
      return NextResponse.redirect(
        new URL("/login/create-profile", request.url),
      );
    }
  }

  // Check if the current path is public
  const isPublicRoute = publicRoutes.some((route) =>
    path === route || (route === "/cards" && path.startsWith("/cards/"))
  );

  // If the route is public, return the response
  if (isPublicRoute) {
    return response;
  }

  // Redirect to login if user is not authenticated
  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|images|favicon.ico|opengraph-image|twitter-image).*)",
    "/cards/:path*/opengraph-image",
    "/cards/:path*/twitter-image",
  ],
};
