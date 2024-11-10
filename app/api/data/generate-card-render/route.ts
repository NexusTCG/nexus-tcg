import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
) {
  const { cardId, mode } = await req.json();

  try {
    // Call the Supabase edge function to generate the card render
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/generate-card-render`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ record: { id: cardId, mode } }),
      },
    );

    if (!response.ok) {
      throw new Error("Failed to generate card render");
    }

    const result = await response.json();
    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    console.error("[Server] Error triggering card render generation:", error);
    return NextResponse.json({
      error: "Failed to trigger card render generation",
      message: error instanceof Error ? error.message : "Unknown error",
    }, { status: 500 });
  }
}
