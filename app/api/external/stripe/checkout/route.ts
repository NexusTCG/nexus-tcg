"use server";

import stripe from "@/app/utils/stripe/stripe";
import { supabaseAdmin } from "@/app/utils/supabase/admin";
import { NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
) {
  const token = req.headers.get("Authorization")?.split("Bearer ")[1];
  const { priceId } = await req.json();

  if (!token) {
    console.error("[Server] No token provided");
    return new Response("No token provided", {
      status: 401,
    });
  }

  try {
    const {
      data: { user },
      error,
    } = await supabaseAdmin
      .auth
      .getUser(token);

    // Validate user
    if (error || !user || !user.id) {
      console.error("[Server] Unauthorized", error);
      return new Response("Unauthorized", {
        status: 401,
      });
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${new URL(req.url).origin}/create?success=true`,
      cancel_url: `${new URL(req.url).origin}/create?canceled=true`,
      subscription_data: {
        metadata: {
          userId: user.id,
        },
      },
      metadata: {
        userId: user.id,
      },
    });

    return new Response(
      JSON.stringify({
        url: session.url,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.error("[Server] Error creating checkout session", error);
    return new Response("An unexpected error occurred", { status: 500 });
  }
}
