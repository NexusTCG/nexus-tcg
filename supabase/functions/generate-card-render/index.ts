// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
// Import the Trigger.dev SDK - replace "<your-sdk-version>" with the version of the SDK you are using, e.g. "3.0.0". You can find this in your package.json file.
import { tasks } from "npm:@trigger.dev/sdk@3.0.0/v3";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import type { takeAndUploadScreenshotTask } from "../../../trigger/take-and-upload-screenshot.ts";

serve(async (req) => {
  try {
    const { record } = await req.json();
    const cardId = record.id;

    await tasks.trigger<typeof takeAndUploadScreenshotTask>(
      "take-and-upload-screenshot",
      { cardId },
    );

    return new Response(
      JSON.stringify({ success: true, message: "Screenshot task triggered" }),
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
