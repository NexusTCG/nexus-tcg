import { NextResponse } from "next/server";
import { getCardsDTO } from "@/app/server/data/cards-dto";

export async function GET() {
  try {
    const currentWeekCards = await getCardsDTO({
      order: { column: "created_at", direction: "desc" },
      currentWeekOnly: true,
    });

    if (!currentWeekCards || currentWeekCards.length === 0) {
      console.log("[Server] No cards found for current week");
      return NextResponse.json([]);
    }

    return NextResponse.json(currentWeekCards);
  } catch (error) {
    console.log("[Server] Error fetching current week cards", error);
    return NextResponse.json([]);
  }
}
