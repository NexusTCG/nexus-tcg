import { NextRequest, NextResponse } from "next/server";
// Actions
import { triggerCardRender } from "@/app/server/actions";

export async function POST(
  req: NextRequest,
) {
  const { cardId, mode } = await req.json();

  try {
    const result = await triggerCardRender(cardId, mode);
    return NextResponse.json({
      success: true,
      taskId: result.id,
    });
  } catch (error) {
    console.error("[Server] Error triggering card render generation:", error);
    return NextResponse.json({
      error: "Failed to trigger card render generation",
      message: error instanceof Error ? error.message : "Unknown error",
    }, { status: 500 });
  }
}
