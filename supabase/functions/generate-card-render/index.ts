// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
// Import the Trigger.dev SDK - replace "<your-sdk-version>" with the version of the SDK you are using, e.g. "3.0.0". You can find this in your package.json file.
import { tasks } from "npm:@trigger.dev/sdk@3.0.0/v3";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.46.1";
import puppeteer from "https://deno.land/x/puppeteer@16.2.0/mod.ts";
import type { helloWorldTask } from "../../../trigger/example.ts";

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
  );

  const siteUrl = Deno.env.get("SITE_URL") ?? "http://localhost:3000";

  // Get the payload from the request
  const { record } = await req.json();
  const cardId = record.id;

  // Testing trigger.dev task
  Deno.serve(async () => {
    await tasks.trigger<typeof helloWorldTask>(
      // Your task id
      "hello-world",
      // Your task payload
      "Hello from a Supabase Edge Function!",
    );
    return new Response("OK");
  });

  try {
    // Launch browser and take screenshot
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(
      `${siteUrl}/cards/${cardId}?mode=initial`,
      {
        waitUntil: "networkidle0",
      },
    );

    const element = await page.$(`#card-render-container-${cardId}-initial`);

    if (!element) {
      throw new Error("Card element not found");
    }

    const screenshot = await element.screenshot({ type: "png" });

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase
      .storage
      .from("card-renders")
      .upload(`${cardId}-initial.png`, screenshot, {
        contentType: "image/png",
        upsert: true,
      });

    if (uploadError) throw uploadError;

    // Get public URL
    const { data: { publicUrl } } = supabase
      .storage
      .from("card-renders")
      .getPublicUrl(`${cardId}-initial.png`);

    // Update card record with render URL
    const { error: updateError } = await supabase
      .from("nexus_cards")
      .update({ card_render: [publicUrl] })
      .eq("id", cardId);

    if (updateError) throw updateError;

    await browser.close();

    return new Response(
      JSON.stringify({ success: true, cardId, publicUrl }),
      { headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
});
