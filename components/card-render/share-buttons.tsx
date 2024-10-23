"use client";

import React, { useState } from "react";
// Data
import { socialPlatforms } from "@/app/lib/data/data";
// Types
import { SocialShareData, SocialPlatform } from "@/app/lib/types/components";
// Components
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
// Custom components
import ShareButtonDiscord from "@/components/card-render/share-button-discord";

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

  async function handleShare(platform: SocialPlatform) {
    setIsLoading(true);
    setCurrentPlatform(platform);
    try {
      const response = await fetch("/api/data/share-to-social", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          platform,
          data: shareData,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to share");
      }

      const result = await response.json();

      if (result.success) {
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
    <div
      id="share-buttons-container"
      className="
        flex 
        flex-col 
        items-center
        justify-center
        gap-2
      "
    >
      <ShareButtonDiscord
        cardId={cardId}
        cardName={cardName}
        cardCreator={cardCreator}
        discordPost={discordPost}
        discordPostUrl={discordPostUrl}
      />
      {Object.entries(socialPlatforms).map(([key, platform]) => {
        const platformKey = key as SocialPlatform;
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
              <small>{platform.description}</small>
            )}
          </Button>
        );
      })}
    </div>
  );
}
