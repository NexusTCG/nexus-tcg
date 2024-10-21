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
  discordPost,
  discordPostUrl,
}: ShareButtonsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPlatform, setCurrentPlatform] = useState<SocialPlatform | null>(
    null
  );

  const shareUrl = `https://play.nexus/cards/${cardId}`;
  const shareText = `Check out ${cardName}, a Nexus TCG card created by ${cardCreator}!`;

  const shareData: SocialShareData = {
    cardId,
    cardName,
    cardCreator,
    shareUrl,
    shareText,
  };

  function handleShare(platform: SocialPlatform) {
    setIsLoading(true);
    setCurrentPlatform(platform);
    shareToSocial(platform, shareData)
      .then(() => {
        toast({
          title: "Shared successfully",
          description: `Your card has been shared to ${platform}.`,
        });
      })
      .catch((error) => {
        console.error(`Error sharing to ${platform}:`, error);
        toast({
          title: "Share failed",
          description: `Failed to share your card to ${platform}. Please try again.`,
          variant: "destructive",
        });
      })
      .finally(() => {
        setIsLoading(false);
        setCurrentPlatform(null);
      });
  }

  function handleDiscordAction() {
    if (discordPost && discordPostUrl) {
      window.open(discordPostUrl, "_blank");
    } else {
      handleShare("discord");
    }
  }

  return (
    <div className="flex flex-col gap-2">
      {Object.entries(socialPlatforms).map(([key, platform]) => {
        const platformKey = key as SocialPlatform;
        if (platformKey === "discord") {
          return (
            <Button
              key={platformKey}
              onClick={handleDiscordAction}
              className="flex justify-between items-center"
              disabled={isLoading}
            >
              <div className="flex flex-row gap-2">
                <platform.icon className="w-[1.2rem] h-[1.2rem]" />
                {discordPost
                  ? "View on Discord"
                  : isLoading && currentPlatform === "discord"
                  ? "Sharing on Discord..."
                  : "Share on Discord"}
              </div>
              {isLoading && currentPlatform === "discord" && !discordPost && (
                <Loader2 className="w-[1.2rem] h-[1.2rem] animate-spin" />
              )}
            </Button>
          );
        }
        return (
          <Button
            key={platformKey}
            onClick={() => handleShare(platformKey)}
            className="flex justify-between items-center"
            disabled={isLoading}
          >
            <div className="flex flex-row gap-2">
              <platform.icon className="w-[1.2rem] h-[1.2rem]" />
              {isLoading && currentPlatform === platformKey
                ? `Sharing on ${platform.name}...`
                : `Share on ${platform.name}`}
            </div>
            {isLoading && currentPlatform === platformKey ? (
              <Loader2 className="w-[1.2rem] h-[1.2rem] animate-spin" />
            ) : (
              <small className="text-muted-foreground font-light">
                {platform.description}
              </small>
            )}
          </Button>
        );
      })}
    </div>
  );
}
