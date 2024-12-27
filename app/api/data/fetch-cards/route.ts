import { NextRequest, NextResponse } from "next/server";
import { getCardsDTO } from "@/app/server/data/cards-dto";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const VALID_SORT_OPTIONS = ["id", "name", "type", "grade"] as const;
const VALID_ORDER_OPTIONS = ["asc", "desc"] as const;
const VALID_FILTER_CARD_TYPE_OPTIONS = [
  "all",
  "agent",
  "event",
  "software",
  "software_agent",
  "hardware",
  "hardware_agent",
] as const;
const VALID_FILTER_ENERGY_OPTIONS = [
  "all",
  "light",
  "storm",
  "dark",
  "chaos",
  "growth",
  "void",
] as const;
const VALID_FILTER_GRADE_OPTIONS = [
  "all",
  "core",
  "rare",
  "epic",
  "prime",
] as const;
const VALID_FROM_OPTIONS = ["week", "month", "year", "all"] as const;

export async function GET(
  request: NextRequest,
) {
  try {
    // Get search parameters from the request URL
    const searchParams = request.nextUrl.searchParams;

    // Basic params
    const id = searchParams.get("id")
      ? parseInt(searchParams.get("id")!, 10)
      : undefined;
    const limit = searchParams.get("limit")
      ? parseInt(searchParams.get("limit")!, 10)
      : undefined;
    const search = searchParams.get("search") || undefined;

    // Sort and order - ensure non-null values
    const sortParam = searchParams.get("sort");
    const sort: string = VALID_SORT_OPTIONS.includes(sortParam as any)
      ? sortParam!
      : "id";

    const orderParam = searchParams.get("order");
    const order: "asc" | "desc" =
      VALID_ORDER_OPTIONS.includes(orderParam as any)
        ? orderParam as "asc" | "desc"
        : "desc";

    // Filters - convert null to undefined
    const typeParam = searchParams.get("type");
    const type = VALID_FILTER_CARD_TYPE_OPTIONS.includes(typeParam as any)
      ? typeParam || undefined
      : undefined;

    const energyParam = searchParams.get("energy");
    const energy = VALID_FILTER_ENERGY_OPTIONS.includes(energyParam as any)
      ? energyParam || undefined
      : undefined;

    const gradeParam = searchParams.get("grade");
    const grade = VALID_FILTER_GRADE_OPTIONS.includes(gradeParam as any)
      ? gradeParam || undefined
      : undefined;

    // From - ensure non-null value
    const fromParam = searchParams.get("from");
    const from = VALID_FROM_OPTIONS.includes(fromParam as any)
      ? (fromParam as "week" | "month" | "year" | "all")
      : "all";

    // Approved only
    const approvedOnly = searchParams.get("approvedOnly") === "true";

    // Construct order config with non-null values
    const orderConfig = {
      column: sort,
      direction: order,
    } as const;

    console.log("[Server] Fetching cards", {
      id,
      search,
      limit,
      type,
      energy,
      grade,
      approvedOnly,
      from,
    });

    const cards = await getCardsDTO({
      id,
      search,
      limit,
      type,
      energy,
      grade,
      order: orderConfig,
      from,
      approvedOnly,
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
