import { NextRequest, NextResponse } from "next/server";
import { shareToSocial } from "@/app/utils/actions/actions";
import { SocialPlatform, SocialShareData } from "@/app/lib/types/components";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { platform, data } = body as {
    platform: SocialPlatform;
    data: SocialShareData;
  };

  try {
    const result = await shareToSocial(platform, data);
    return NextResponse.json(result);
  } catch (error) {
    console.error(`Error sharing to ${platform}:`, error);
    return NextResponse.json(
      { success: false, error: "Failed to share" },
      { status: 500 },
    );
  }
}
