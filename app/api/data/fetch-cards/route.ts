import { NextRequest, NextResponse } from "next/server";
import { getCardsDTO } from "@/app/server/data/cards-dto";

export async function GET(
  request: NextRequest,
) {
  try {
    // Get search parameters from the request URL
    const searchParams = request.nextUrl.searchParams;

    // Parse search parameters
    // const id = searchParams.get("id")
    //   ? parseInt(searchParams.get("id")!, 10)
    //   : undefined;
    const limit = searchParams.get("limit")
      ? parseInt(searchParams.get("limit")!)
      : undefined;

    // const filters: Record<string, any> = {};
    // const search = searchParams.get("search");
    // const filter = searchParams.get("filter");

    const currentWeekOnly = searchParams.get("currentWeekOnly") === "true";

    const sort = searchParams.get("sort") || "created_at";
    const order = searchParams.get("order") || "desc";

    // Construct order config
    const orderConfig = {
      column: sort,
      direction: order as "asc" | "desc",
    };

    // console.log("[Server] Fetching cards", {
    //   id,
    //   limit,
    //   filters,
    //   order,
    //   currentWeekOnly,
    // });

    const cards = await getCardsDTO({
      // id,
      limit,
      // filters,
      order: orderConfig,
      currentWeekOnly,
    });

    if (!cards || (Array.isArray(cards) && cards.length === 0)) {
      return NextResponse.json([]);
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
