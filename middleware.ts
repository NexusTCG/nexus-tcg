import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/app/utils/supabase/middleware";

const routes = {
  root: "/",
  login: "/login",
  home: "/home",
};

export async function middleware(
  request: NextRequest
) {
  const {
    supabase,
    response
  } = createClient(request);

  const path = new URL(request.url).pathname;
  const isProtectedRoute = path !== routes.root && path !== routes.login;

  // Get user session
  // const { 
  //   data: { 
  //     user: session 
  //   }
  // } = await supabase
  //   .auth
  //   .getUser()

  // if (!session) {
  //   // Unauthenticated user logic
  //   if (isProtectedRoute) {
  //     return NextResponse.redirect(new URL(routes.login, request.url));
  //   }
  //   // Allow access to root and login routes for unauthenticated users
  //   return response;
  // } else {
  //   // Authenticated user logic
  //   if (!isProtectedRoute) {
  //     return NextResponse.redirect(new URL(routes.home, request.url));
  //   }
  //   // Allow access to protected routes for authenticated users
  //   return response;
  // }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|images|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|bmp|tiff)$).*)",
  ],
};