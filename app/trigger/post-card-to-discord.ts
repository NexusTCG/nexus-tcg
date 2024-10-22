// Utils
import { logger, task } from "@trigger.dev/sdk/v3";
import { createClient } from "@/app/utils/supabase/server";
import { cookies } from "next/headers";
// Types
import { SocialShareData } from "@/app/lib/types/components";

type DiscordMessage = {
  id: string;
};

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
    const serverId = process.env.DISCORD_SERVER_ID;
    const channelId = process.env.DISCORD_CHANNEL_ID;

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
        const errorBody = await response.text();
        logger.error("Failed to post card to Discord", {
          status: response.status,
          errorBody,
        });
        throw new Error(
          `Failed to post card to Discord: ${response.status} ${errorBody}`,
        );
      }

      const discordMessage: DiscordMessage = await response.json();

      if (!discordMessage.id) {
        throw new Error("Invalid response from Discord: missing message id");
      }

      logger.info("Successfully posted to Discord", {
        messageId: discordMessage.id,
      });

      const discordPostUrl =
        `https://discord.com/channels/${serverId}/${channelId}/${discordMessage.id}`;

      const cookieStore = cookies();
      const supabase = createClient(cookieStore);

      logger.info("Updating Supabase", { cardId, discordPostUrl });

      const { error } = await supabase
        .from("nexus_cards")
        .update({
          discord_post: true,
          discord_post_url: discordPostUrl,
        })
        .eq("id", cardId);

      if (error) {
        throw error;
      }

      logger.info("Updated card Discord post status", {
        cardId,
        discordPostUrl,
      });

      return { success: true, discordPostUrl };
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
