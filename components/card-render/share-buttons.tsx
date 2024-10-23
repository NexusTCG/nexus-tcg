"use client";

import React, { useState } from "react";
// Data
import { socialPlatforms } from "@/app/lib/data/data";
// Actions
import { shareToSocial } from "@/app/utils/actions/actions";
// Types
import { SocialShareData, SocialPlatform } from "@/app/lib/types/components";
// Components
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

type ShareButtonsProps = {
  cardId: number;
  cardName: string;
  cardCreator: string;
  discordPost: boolean;
  discordPostUrl: string | null;
};

export default function ShareButtons({
  cardId,
  cardName,
  cardCreator,
  discordPost: initialDiscordPost,
  discordPostUrl: initialDiscordPostUrl,
}: ShareButtonsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPlatform, setCurrentPlatform] = useState<SocialPlatform | null>(
    null
  );
  const [discordPost, setDiscordPost] = useState(initialDiscordPost);
  const [discordPostUrl, setDiscordPostUrl] = useState(initialDiscordPostUrl);

  const shareUrl = `https://play.nexus/cards/${cardId}`;
  const shareText = `Check out ${cardName}, a Nexus TCG card created by ${cardCreator}!`;

  const shareData: SocialShareData = {
    cardId,
    cardName,
    cardCreator,
    shareUrl,
    shareText,
  };

  async function handleShare(platform: SocialPlatform) {
    setIsLoading(true);
    setCurrentPlatform(platform);
    try {
      const result = await shareToSocial(platform, shareData);
      if (result.success) {
        if (platform === "discord" && result.postUrl) {
          setDiscordPost(true);
          setDiscordPostUrl(result.postUrl);
        }
        toast({
          title: "Shared successfully",
          description: `Your card has been shared to ${socialPlatforms[platform].name}.`,
        });
      } else {
        throw new Error(
          result.error || `Failed to share to ${socialPlatforms[platform].name}`
        );
      }
    } catch (error) {
      console.error(`Error sharing to ${platform}:`, error);
      toast({
        title: "Share failed",
        description: `Failed to share your card to ${socialPlatforms[platform].name}. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setCurrentPlatform(null);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      {Object.entries(socialPlatforms).map(([key, platform]) => {
        const platformKey = key as SocialPlatform;
        const isDiscord = platformKey === "discord";
        const shouldOpenDiscordPost =
          isDiscord && discordPost && discordPostUrl;

        return (
          <Button
            key={platformKey}
            onClick={() =>
              shouldOpenDiscordPost
                ? window.open(discordPostUrl, "_blank")
                : handleShare(platformKey)
            }
            className="flex justify-between items-center"
            disabled={isLoading}
          >
            <div className="flex flex-row gap-2">
              <platform.icon className="w-[1.2rem] h-[1.2rem]" />
              {shouldOpenDiscordPost
                ? "View on Discord"
                : isLoading && currentPlatform === platformKey
                ? `Sharing on ${platform.name}...`
                : `Share on ${platform.name}`}
            </div>
            {isLoading && currentPlatform === platformKey ? (
              <Loader2 className="w-[1.2rem] h-[1.2rem] animate-spin" />
            ) : (
              <small>{platform.description}</small>
            )}
          </Button>
        );
      })}
    </div>
  );
}
