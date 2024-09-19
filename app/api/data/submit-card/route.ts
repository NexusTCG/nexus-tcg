import { createClient } from "@/app/utils/supabase/server";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { CardFormSchema } from "@/app/lib/schemas/database";

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed." }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const cardData = await req.json();
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  try {
    const parsedCardData = CardFormSchema.parse({
      nexus_card_data: cardData.nexus_card_data,
      initialMode: cardData.initialMode,
      anomalyMode: cardData.anomalyMode,
    });

    console.log("[Server] Submitting card data:", {
      nexus_card_data: parsedCardData.nexus_card_data,
      initial_mode_data: parsedCardData.initialMode,
      anomaly_mode_data: parsedCardData.anomalyMode,
    });

    const {
      data,
      error,
    } = await supabase
      .rpc("insert_card_data", {
        nexus_card_data: parsedCardData.nexus_card_data,
        initial_mode_data: parsedCardData.initialMode,
        anomaly_mode_data: parsedCardData.anomalyMode,
      });

    if (error) {
      console.error("[Server] Supabase error:", error);
      throw error;
    }

    console.log("[Server] Card submitted successfully:", data);
    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("[Server] Error submitting card:", error);
    return new Response(JSON.stringify({ error: "Error submitting card" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
