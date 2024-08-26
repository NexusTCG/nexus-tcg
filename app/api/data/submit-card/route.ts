"use server";

import { createClient } from "@/app/utils/supabase/server";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: 'Method not allowed.' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const cardData = await req.json();
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  try {
    const { data, error } = await supabase.rpc('insert_card_data', {
      nexus_card_data: {
        user_id: cardData.user_id,
        username: cardData.username,
        grade: cardData.grade,
      },
      initial_mode_data: cardData.initialMode,
      anomaly_mode_data: cardData.anomalyMode,
    });

    if (error) {
      throw error;
    }

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error submitting card:', error);
    return new Response(JSON.stringify({ error: 'Error submitting card' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}