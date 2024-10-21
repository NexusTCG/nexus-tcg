import React from "react";
// Data
import { socialPlatforms } from "@/app/lib/data/data";
// Actions
import { shareToSocial } from "@/app/utils/actions/actions";
// Types
import { SocialShareData, SocialPlatform } from "@/app/lib/types/components";
// Components
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

type ShareButtonsProps = {
  cardId: number;
  cardName: string;
  cardCreator: string;
};

export default function ShareButtons({
  cardId,
  cardName,
  cardCreator,
}: ShareButtonsProps) {
  const shareUrl = `https://play.nexus/cards/${cardId}`;
  const shareText = `Check out ${cardName}, a Nexus TCG card created by ${cardCreator}!`;

  const shareData: SocialShareData = {
    cardId,
    cardName,
    cardCreator,
    shareUrl,
    shareText,
  };

  const handleShare = async (platform: SocialPlatform) => {
    try {
      await shareToSocial(platform, shareData);
      toast({
        title: "Shared successfully",
        description: `Your card has been shared to ${platform}.`,
      });
    } catch (error) {
      console.error(`Error sharing to ${platform}:`, error);
      toast({
        title: "Share failed",
        description: `Failed to share your card to ${platform}. Please try again.`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {Object.entries(socialPlatforms).map(([key, platform]) => (
        <Button
          key={key}
          onClick={() => handleShare(key as SocialPlatform)}
          className="flex justify-between items-center"
        >
          <div className="flex flex-row gap-2">
            <platform.icon className="w-[1.2rem] h-[1.2rem]" />
            Share on {platform.name}
          </div>
          <small className="text-muted-foreground font-light">
            {platform.description}
          </small>
        </Button>
      ))}
    </div>
  );
}
