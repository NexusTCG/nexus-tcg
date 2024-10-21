"use client";

import React from "react";
// Data
import { socialPlatforms } from "@/app/lib/data/data";
// Actions
import { shareToSocial } from "@/app/utils/actions/actions";
// Types
import { SocialShareData } from "@/app/lib/types/components";
// Components
import { Button } from "@/components/ui/button";
// Icons
import { FaDiscord, FaReddit, FaXTwitter, FaFacebook } from "react-icons/fa6";

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

  return (
    <div className="flex flex-col gap-2">
      {Object.entries(socialPlatforms).map(([key, platform]) => (
        <Button
          key={key}
          onClick={() =>
            shareToSocial(key as keyof typeof socialPlatforms, shareData)
          }
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
