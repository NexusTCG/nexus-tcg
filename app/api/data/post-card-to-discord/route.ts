import { NextRequest, NextResponse } from "next/server";
import { postCardToDiscord } from "@/app/trigger/post-card-to-discord";

export async function POST(req: NextRequest) {
  const {
    cardId,
    cardName,
    cardCreator,
    shareText,
    shareUrl,
  } = await req.json();

  try {
    const result = await postCardToDiscord.trigger({
      cardId,
      cardName,
      cardCreator,
      shareText,
      shareUrl,
    });

    return NextResponse.json({
      success: true,
      taskId: result.id,
    });
  } catch (error) {
    console.error("[Server] Error posting card to Discord", error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }, { status: 500 });
  }
}
