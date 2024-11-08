import { NextRequest, NextResponse } from "next/server";
import { getCardsDTO } from "@/app/server/data/cards-dto";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const VALID_FILTERS = [
  "all",
  "agent",
  "event",
  "software",
  "software_agent",
  "hardware",
  "hardware_agent",
];

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

    // const search = searchParams.get("search");
    const rawFilter = searchParams.get("filter");
    const filter = VALID_FILTERS.includes(rawFilter || "") ? rawFilter : "all";
    const currentWeekOnly = searchParams.get("currentWeekOnly") === "true";
    const sort = searchParams.get("sort") || "id";
    const order = searchParams.get("order") || "asc";

    // Construct order config
    const orderConfig = {
      column: sort,
      direction: order as "asc" | "desc",
    };

    console.log("[Server] Fetching cards", {
      // id,
      limit,
      filter,
      order,
      currentWeekOnly,
    });

    const cards = await getCardsDTO({
      // id,
      limit,
      filter: filter || undefined,
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
