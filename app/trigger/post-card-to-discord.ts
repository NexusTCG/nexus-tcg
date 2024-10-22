// Utils
import { logger, task } from "@trigger.dev/sdk/v3";
import { createClient } from "@/app/utils/supabase/server";
import { cookies } from "next/headers";
// Types
import { SocialShareData } from "@/app/lib/types/components";

export const postCardToDiscord = task({
  id: "post-card-to-discord",
  run: async (payload: SocialShareData) => {
    const {
      cardId,
      cardName,
      cardCreator,
      shareText,
      shareUrl,
    } = payload;

    logger.info("Posting card to Discord", {
      cardId,
      cardName,
      cardCreator,
      shareText,
      shareUrl,
    });

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (!webhookUrl) {
      throw new Error("Discord webhook URL is not configured");
    }

    try {
      const message = {
        content:
          `Check out this Nexus TCG card: ${cardName} by ${cardCreator}!\n${shareUrl}`,
      };

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });

      if (!response.ok) {
        const errorData = await response.json();
        logger.error("Discord API error", errorData);
        throw new Error(
          `Failed to post card to Discord: ${
            errorData.message || response.statusText
          }`,
        );
      }

      const responseData = await response.json();
      const messageId = responseData.id;

      if (messageId) {
        const cookieStore = cookies();
        const supabase = createClient(cookieStore);

        // Extract channel ID from the webhook URL
        const channelId = webhookUrl.split("/").slice(-2, -1)[0];

        const discordPostUrl =
          `https://discord.com/channels/${process.env.DISCORD_SERVER_ID}/${channelId}/${messageId}`;

        const { data, error } = await supabase
          .from("nexus_cards")
          .update({
            discord_post: true,
            discord_post_url: discordPostUrl,
          })
          .eq("id", cardId);

        if (error) {
          logger.error("Error updating card Discord post status", { error });
          throw error;
        } else {
          logger.info("Updated card Discord post status", {
            cardId,
            discordPostUrl,
          });
        }

        return { success: true, discordPostUrl };
      } else {
        throw new Error("Failed to get message ID from Discord response");
      }
    } catch (error) {
      logger.error("Error posting card to Discord", {
        error: error instanceof Error ? error.message : "Unknown error",
      });

      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  },
});
