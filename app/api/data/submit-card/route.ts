"use server";

import { createClient } from "@/app/utils/supabase/server";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";

export async function POST(
  req: NextRequest
) {
  if (req.method === "POST") {
    const cardData = await req.json();
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    try {
      const { data, error } = await supabase
        .from("cards")
        .insert([cardData])
        .select();

      if (error) {
        throw error;
      }

      return new Response(JSON.stringify({ success: true, data }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });

    } catch (error) {
      console.error('Error submitting card:', error);
        return new Response(
          JSON.stringify({ 
            error: 'Error submitting card' 
          }), {
            status: 500,
            headers: { 
              'Content-Type': 'application/json' 
            },
        });
    }
  } else {
    return new Response(
      JSON.stringify({ 
        error: 'Method not allowed.' 
      }), {
        status: 405,
        headers: { 
          'Content-Type': 'application/json' 
        },
    });
  }
} 