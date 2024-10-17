"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { FaDiscord, FaReddit, FaXTwitter } from "react-icons/fa6";

type ShareButtonsProps = {
  cardId: number;
  cardName: string;
};

export default function ShareButtons({ cardId, cardName }: ShareButtonsProps) {
  const shareUrl = `https://play.nexus/cards/${cardId}`;
  const shareText = `Check out my Nexus TCG card: ${cardName}`;

  // TODO: Move share functionality to API route / server action
  // TODO: Implement Discord share webhook

  function shareToDiscord() {
    // Placeholder URL
    window.open(
      `https://discord.com/channels/@me?message=${encodeURIComponent(
        `${shareText}\n${shareUrl}`
      )}`,
      "_blank"
    );
  }

  function shareToReddit() {
    const redditShareUrl = `https://new.reddit.com/r/playnexus/submit?url=${encodeURIComponent(
      shareUrl
    )}&title=${encodeURIComponent(cardName)}&type=link`;

    window.open(redditShareUrl, "_blank");
  }

  function shareToTwitter() {
    // Placeholder URL
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        shareText
      )}&url=${encodeURIComponent(shareUrl)}`,
      "_blank"
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <Button
        onClick={shareToDiscord}
        className="flex justify-between items-center"
      >
        <div className="flex flex-row gap-2">
          <FaDiscord className="w-[1.2rem] h-[1.2rem]" />
          Share on Discord
        </div>
        <small className="text-muted-foreground font-light">
          Posts to Nexus' server
        </small>
      </Button>
      <Button
        onClick={shareToReddit}
        className="flex justify-between items-center"
      >
        <div className="flex flex-row gap-2">
          <FaReddit className="w-[1.2rem] h-[1.2rem]" />
          Share on Reddit
        </div>
        <small className="text-muted-foreground font-light">/r/playnexus</small>
      </Button>
      <Button
        onClick={shareToTwitter}
        className="flex justify-between items-center"
      >
        <div className="flex flex-row gap-2">
          <FaXTwitter className="w-[1.2rem] h-[1.2rem]" />
          {`Share on X (Twitter)`}
        </div>
        <small className="text-muted-foreground font-light">
          @PlayNexusTcg
        </small>
      </Button>
    </div>
  );
}
