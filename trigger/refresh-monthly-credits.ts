import { schedules } from "@trigger.dev/sdk/v3";
import { supabaseAdmin } from "@/app/utils/supabase/admin";
import { TIER_CONFIG } from "@/app/lib/types/components";

export const refreshMonthlyCreditsTask = schedules.task({
  id: "refresh-monthly-credits",
  cron: "0 0 * * *",
  run: async (payload) => {
    // Get timestamp and convert to date with YYYY-MM-DD format
    const now = new Date(payload.timestamp);
    const today = now.toISOString().split("T")[0];

    const { data: usersToRefresh, error } = await supabaseAdmin
      .from("profiles")
      .select("*")
      .like("credits_refresh_date", `${today}%`);

    if (error) {
      throw new Error(
        `[Server] Error fetching users to refresh: ${error.message}`,
      );
    }

    // Update user credits
    for (const user of usersToRefresh) {
      const tierConfig = TIER_CONFIG[user.plan as keyof typeof TIER_CONFIG];

      // Calculate next refresh date (30 days out)
      const nextRefresh = new Date(now);
      nextRefresh.setDate(nextRefresh.getDate() + 30);

      await supabaseAdmin
        .from("profiles")
        .update({
          credits: tierConfig.credits,
          credits_refresh_date: new Date().toISOString(),
        })
        .eq("id", user.id);
    }

    console.log(
      `[Server] Refreshed credits for ${
        usersToRefresh?.length || 0
      } users at ${payload.timestamp}. ` +
        `[Server] Plans updated: ${
          usersToRefresh?.map((u) => u.plan).join(", ")
        }`,
    );
  },
});
