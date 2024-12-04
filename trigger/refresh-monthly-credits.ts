import { schedules } from "@trigger.dev/sdk/v3";
import { supabaseAdmin } from "@/app/utils/supabase/admin";
import { TIER_CONFIG } from "@/app/lib/types/components";

export const refreshMonthlyCreditsTask = schedules.task({
  id: "refresh-monthly-credits",
  cron: "0 0 * * *",
  run: async (payload) => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data: usersToRefresh, error } = await supabaseAdmin
      .from("profiles")
      .select("*")
      .lte("credits_refresh_date", thirtyDaysAgo.toISOString());

    if (error) {
      throw new Error(
        `[Server] Error fetching users to refresh: ${error.message}`,
      );
    }

    // Update user credits
    for (const user of usersToRefresh) {
      const tierConfig = TIER_CONFIG[user.plan as keyof typeof TIER_CONFIG];

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
