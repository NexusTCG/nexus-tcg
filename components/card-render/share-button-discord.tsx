"use client";

import React, { useState, useEffect } from "react";
// Utils
import { createClient } from "@/app/utils/supabase/client";
import { cn } from "@/lib/utils";
// Components
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
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

  // Don't render button if not owner and card isn't posted
  if (!isCardCreator && !discordPost) return null;

  return (
    <Button
      onClick={() =>
        discordPost && discordPostUrl
          ? window.open(discordPostUrl, "_blank")
          : handleDiscordShare()
      }
      disabled={isLoading}
      className={cn(
        "flex justify-between items-center w-full relative overflow-hidden transition-all duration-300",
        discordPost
          ? [
              "bg-teal-900/20 hover:bg-teal-900/30 border-teal-500/50",
              "animate-pulse-subtle",
              "after:absolute after:inset-0",
              "after:bg-gradient-to-r after:from-transparent after:via-teal-400/10 after:to-transparent",
              "after:animate-shimmer after:duration-1000",
            ]
          : "bg-zinc-900"
      )}
    >
      <div className="flex flex-row gap-2">
        <FaDiscord className="w-[1.2rem] h-[1.2rem]" />
        {discordPost && discordPostUrl
          ? "View on Discord"
          : isLoading
          ? "Sharing on Discord..."
          : "Share on Discord"}
      </div>
      {isLoading ? (
        <Loader2 className="w-[1.2rem] h-[1.2rem] animate-spin" />
      ) : (
        <small>Posts to Nexus' server</small>
      )}
    </Button>
  );
}
