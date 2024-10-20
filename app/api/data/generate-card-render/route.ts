import { NextRequest, NextResponse } from "next/server";
import { generateCardRender } from "@/app/trigger/generate-card-render";

export async function POST(
  req: NextRequest,
) {
  const { cardId, mode } = await req.json();

  try {
    const result = await generateCardRender.trigger({ cardId, mode });
    return NextResponse.json({
      success: true,
      taskId: result.id,
    });
  } catch (error) {
    console.error("Error triggering card render generation:", error);
    return NextResponse.json({
      error: "Failed to trigger card render generation",
      message: error instanceof Error ? error.message : "Unknown error",
    }, { status: 500 });
  }
}

// Add this function for internal use
export async function triggerCardRender(
  cardId: string,
  mode: "initial" | "anomaly",
) {
  const result = await generateCardRender.trigger({ cardId, mode });
  return result;
}
