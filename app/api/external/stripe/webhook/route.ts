"use server";

import Stripe from "stripe";
import stripe from "@/app/utils/stripe/stripe";
import { supabaseAdmin } from "@/app/utils/supabase/admin";
// Types
import { TIER_CONFIG, TierName } from "@/app/lib/types/components";

const relevantEvents = new Set([
  "customer.subscription.created",
  "customer.subscription.updated",
  "customer.subscription.deleted",
]);

// Helper function to determine tier from price ID
function getTierFromPriceId(priceId: string): TierName {
  for (const [tier, config] of Object.entries(TIER_CONFIG)) {
    if ("priceId" in config && config.priceId === priceId) {
      return tier as TierName;
    }
  }
  return "core";
}

export async function POST(
  req: Request,
) {
  // Parse the request body
  const body = await req.text();
  // Get the Stripe signature from the headers
  const sig = req.headers.get("stripe-signature") as string;
  // Get the Stripe webhook secret from the environment variables
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  // Initialize the event variable
  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret) {
      return new Response("Webhook secret not found.", {
        status: 400,
      });
    }
    event = stripe
      .webhooks
      .constructEvent(
        body,
        sig,
        webhookSecret,
      );
    console.log(`🔔  Webhook received: ${event.type}`);
  } catch (error) {
    console.log(`❌ Error message: ${(error as Error).message}`);
    return new Response(`Webhook Error: ${(error as Error).message}`, {
      status: 400,
    });
  }

  if (relevantEvents.has(event.type)) {
    const subscription = event.data.object as Stripe.Subscription;
    const userId = subscription.metadata.userId;

    if (!userId) {
      console.error("No userId found in subscription metadata");
      return new Response("userId is required", { status: 400 });
    }

    try {
      const { data: userProfile, error: userProfileError } = await supabaseAdmin
        .from("profiles")
        .select("credits, plan")
        .eq("id", userId)
        .single();

      if (userProfileError) {
        console.error("[Server] Error fetching user profile", userProfileError);
        throw userProfileError;
      }

      // Get the current date
      const currentDate = new Date().toISOString();

      // Determine new tier
      let newTier: TierName = "core";
      if (
        subscription.status === "active" && subscription.items.data[0]?.price.id
      ) {
        newTier = getTierFromPriceId(subscription.items.data[0]?.price.id);
      }

      // Determine updates
      let updates: {
        plan: string;
        credits?: number;
        credits_refresh_date: string;
      } = {
        plan: newTier,
        credits_refresh_date: currentDate,
      };

      // Get old tier and config
      const oldTier = userProfile.plan as TierName;
      const oldTierConfig = TIER_CONFIG[oldTier];
      const newTierConfig = TIER_CONFIG[newTier];

      // Handle credits updates
      if (subscription.status === "active") {
        //Upgrade or change between paid tiers
        if (
          oldTier === "core" ||
          TIER_CONFIG[newTier].credits > oldTierConfig.credits
        ) {
          updates.credits = newTierConfig.credits;
        }
      } else {
        // Downgrade to free tier
        if (userProfile.credits < TIER_CONFIG.core.credits) {
          updates.credits = TIER_CONFIG.core.credits;
        }
      }

      // Update user profile
      const { error: updateError } = await supabaseAdmin
        .from("profiles")
        .update(updates)
        .eq("id", userId);

      if (updateError) throw updateError;
    } catch (error) {
      console.error("[Server] Error updating user profile", error);
      return new Response("Error updating user profile", { status: 500 });
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 });
  } else {
    console.log(`❌ Unhandled event type: ${event.type}`);
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
}
