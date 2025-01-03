// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { tasks } from "npm:@trigger.dev/sdk@^3.1.2/v3";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import type { takeAndUploadScreenshotTask } from "../../../trigger/take-and-upload-screenshot.ts";

serve(async (req) => {
  try {
    const { record, isUpdate } = await req.json();
    const cardId = record.id;
    const mode = record.mode;

    await tasks.trigger<typeof takeAndUploadScreenshotTask>(
      "take-and-upload-screenshot",
      {
        cardId,
        mode,
        isUpdate: !!isUpdate,
      },
    );

    return new Response(
      JSON.stringify({
        success: true,
        message: `Screenshot task triggered for ${
          isUpdate ? "updated" : "new"
        } card`,
      }),
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
