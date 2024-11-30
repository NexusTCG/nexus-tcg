import { NextResponse } from "next/server";
// Server
import { getUserProfileDTO } from "@/app/server/data/user-dto";

export async function GET() {
  try {
    const profileDTO = await getUserProfileDTO();

    if (!profileDTO) {
      console.error("[Server] Failed to fetch user profile.");
      return NextResponse.json(
        { error: "Failed to fetch user profile." },
        { status: 404 },
      );
    }

    return NextResponse.json(profileDTO, { status: 200 });
  } catch (error) {
    console.error("[Server] Error in user-dto route:", error);
    return NextResponse.json(
      { error: "Failed to fetch user profile." },
      { status: 500 },
    );
  }
}
