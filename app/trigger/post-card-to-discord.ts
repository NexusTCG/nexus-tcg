import { logger, task } from "@trigger.dev/sdk/v3";
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

    if (webhookUrl.includes("discord.com/api/webhooks")) {
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
          throw new Error("Failed to post card to Discord");
        }

        if (response.status === 200) {
          logger.info("Card posted to Discord", {
            cardId,
            cardName,
            cardCreator,
          });
        }

        return { success: true };
      } catch (error) {
        logger.error("Error posting card to Discord", {
          error: error instanceof Error ? error.message : "Unknown error",
        });

        return {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    }
  },
});
