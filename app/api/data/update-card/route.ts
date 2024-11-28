import { createClient } from "@/app/utils/supabase/server";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";
// Types
import { CardFormSchema } from "@/app/lib/schemas/database";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed." }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { cardData, cardId } = await req.json();
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  try {
    const parsedCardData = CardFormSchema.parse({
      nexus_card_data: cardData.nexus_card_data,
      initialMode: cardData.initialMode,
      anomalyMode: cardData.anomalyMode,
    });

    console.log("[Server] Updating card data:", {
      card_id: cardId,
      nexus_card_data: parsedCardData.nexus_card_data,
      initial_mode_data: parsedCardData.initialMode,
      anomaly_mode_data: parsedCardData.anomalyMode,
    });

    const { data, error } = await supabase
      .rpc("update_card_data", {
        card_id: parseInt(cardId),
        nexus_card_data: parsedCardData.nexus_card_data,
        initial_mode_data: parsedCardData.initialMode,
        anomaly_mode_data: parsedCardData.anomalyMode,
      });

    if (error) {
      console.error("[Server] Supabase error:", error);
      throw error;
    }

    console.log("[Server] Card updated successfully:", data);

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          ...data,
          id: cardId,
        },
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("[Server] Error updating card:", error);
    let errorMessage = "Error updating card";
    if (error instanceof ZodError) {
      errorMessage = error.errors.map((e) =>
        `${e.path.join(".")}: ${e.message}`
      ).join(", ");
    }
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
