"use server";

import { createClient } from "@/app/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("[Server] Logout error:", error.message);
    return NextResponse.json({ success: false }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
