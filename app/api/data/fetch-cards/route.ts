import { NextRequest, NextResponse } from "next/server";
import { getCardsDTO } from "@/app/server/data/cards-dto";

export async function GET(
  request: NextRequest,
) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id")
    ? parseInt(searchParams.get("id")!, 10)
    : undefined;
  const limit = searchParams.get("limit")
    ? parseInt(searchParams.get("limit")!)
    : undefined;
  const filters = searchParams.get("filters")
    ? JSON.parse(searchParams.get("filters")!)
    : undefined;
  const order = searchParams.get("order")
    ? JSON.parse(searchParams.get("order")!)
    : undefined;
  const currentWeekOnly = searchParams.get("currentWeekOnly") === "true";

  console.log("[Server] Fetching cards", {
    id,
    limit,
    filters,
    order,
    currentWeekOnly,
  });

  try {
    const cards = await getCardsDTO({
      id,
      limit,
      filters,
      order,
      currentWeekOnly,
    });

    if (!cards || (Array.isArray(cards) && cards.length === 0)) {
      return NextResponse.json({
        message: "No cards found",
        data: [],
      });
    }

    return NextResponse.json(cards);
  } catch (error) {
    console.error(
      `[Server] Error fetching cards: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
    return NextResponse.json({
      error: "Failed to fetch cards",
      details: error instanceof Error ? error.message : String(error),
    }, {
      status: 500,
    });
  }
}
