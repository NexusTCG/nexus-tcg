"use client";

import React, { useState, useEffect } from "react";
// Utils
import { createClient } from "@/app/utils/supabase/client";
import { cn } from "@/lib/utils";
// Components
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
// Icons
import { FaDiscord } from "react-icons/fa";

type ShareButtonDiscordProps = {
  cardId: number;
  isCardCreator: boolean;
  discordPost: boolean;
  discordPostUrl: string | null;
};

export default function ShareButtonDiscord({
  cardId,
  isCardCreator,
  discordPost: initialDiscordPost,
  discordPostUrl: initialDiscordPostUrl,
}: ShareButtonDiscordProps) {
  // Add debug logs
  console.log("ShareButton Props:", {
    cardId,
    isCardCreator,
    initialDiscordPost,
    initialDiscordPostUrl,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [discordPost, setDiscordPost] = useState<boolean>(initialDiscordPost);
  const [discordPostUrl, setDiscordPostUrl] = useState<string | null>(
    initialDiscordPostUrl
  );

  const supabase = createClient();

  async function handleDiscordShare() {
    setIsLoading(true);
    try {
      const response = await fetch("/api/external/post-card-to-discord", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cardId }),
      });

      if (!response.ok) {
        throw new Error("Failed to share to Discord");
      }

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Shared successfully",
          description: "Your card has been posted to Discord!",
        });
        setTimeout(() => {
          window.open(result.discordPostUrl, "_blank");
        }, 1000);
      } else {
        throw new Error(result.error || "Failed to share to Discord");
      }
    } catch (error) {
      console.error("Error sharing to Discord:", error);
      toast({
        title: "Share failed",
        description: "Failed to share your card to Discord. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  // Fetch initial discord data
  useEffect(() => {
    async function fetchDiscordData() {
      const { data, error } = await supabase
        .from("nexus_cards")
        .select("discord_post, discord_post_url")
        .eq("id", cardId)
        .single();

      if (error) {
        console.error("Error fetching discord data:", error);
      } else if (data) {
        setDiscordPost(data.discord_post || false);
        setDiscordPostUrl(data.discord_post_url || null);
      }
    }

    fetchDiscordData();
  }, [cardId]);

  // Subscribe to realtime updates
  useEffect(() => {
    const channel = supabase
      .channel(`public:nexus_cards:id=eq.${cardId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "nexus_cards",
          filter: `id=eq.${cardId}`,
        },
        (payload) => {
          if (
            payload.new &&
            typeof payload.new === "object" &&
            "discord_post" in payload.new &&
            "discord_post_url" in payload.new
          ) {
            setDiscordPost(payload.new.discord_post || false);
            setDiscordPostUrl(payload.new.discord_post_url || null);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [cardId]);

  const shouldShowButton = isCardCreator || discordPost;

  if (!shouldShowButton) {
    console.log("Button hidden because:", { isCardCreator, discordPost });
    return null;
  }

  const animateButton =
    (isCardCreator && discordPost) || (isCardCreator && isLoading);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() =>
              discordPost && discordPostUrl
                ? window.open(discordPostUrl, "_blank")
                : handleDiscordShare()
            }
            disabled={isLoading}
            className={cn(
              "flex justify-between items-center relative overflow-hidden transition-all duration-2000",
              {
                "bg-teal-300 hover:bg-teal-300/50 border-teal-50/50":
                  animateButton,
                "animate-pulse-subtle": animateButton,
                "after:absolute after:inset-0": animateButton,
                "after:bg-gradient-to-r after:from-transparent after:via-teal-100/20 after:to-transparent":
                  animateButton,
                "after:animate-shimmer after:duration-1000": animateButton,
              }
            )}
          >
            <div className="flex flex-row gap-2">
              {isLoading ? (
                <Loader2 className="w-[1.2rem] h-[1.2rem] animate-spin" />
              ) : (
                <FaDiscord className="w-[1.2rem] h-[1.2rem] mt-0.5" />
              )}
              {discordPost && discordPostUrl
                ? "View on Discord"
                : isLoading
                ? "Posting on Discord..."
                : "Post to Discord"}
            </div>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-[250px] mt-2">
          {isCardCreator
            ? discordPost
              ? "View card on Nexus' Discord server to vote and discuss"
              : "Share card to Nexus' Discord server to allow voting and discussion"
            : "View card on Nexus' Discord server to vote and discuss"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
