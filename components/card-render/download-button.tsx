"use client";

import React, { useState } from "react";
import { usePostHog } from "posthog-js/react";
// Utils
import { toPng } from "html-to-image";
import { createClient } from "@/app/utils/supabase/client";
// Components
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type DownloadButtonProps = {
  cardId: number;
  mode: "initial" | "anomaly";
  currentCardArtUrl?: string;
};

export function DownloadButton({
  cardId,
  mode,
  currentCardArtUrl,
}: DownloadButtonProps) {
  const [isPending, setIsPending] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const supabase = createClient();
  const posthog = usePostHog();

  async function downloadImage(path: string, filename: string) {
    try {
      const filePath = path.split("/card-renders/")[1];

      const { data } = supabase.storage
        .from("card-renders")
        .getPublicUrl(filePath);

      if (!data.publicUrl) {
        throw new Error("Could not get public URL");
      }

      const link = document.createElement("a");
      link.href = data.publicUrl;
      link.download = filename;
      link.click();

      posthog.capture("card_downloaded", {
        distinctId: cardId,
        success: true,
      });

      posthog.capture("card_downloaded", {
        distinctId: cardId,
        success: true,
      });

      toast.success("Your card has been downloaded!");
    } catch (error) {
      posthog.capture("card_downloaded", {
        distinctId: cardId,
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      });

      console.error("Error downloading image:", error);
      toast.error("Failed to download the image. Please try again!");
    }
  }

  async function handleDownload() {
    setIsPending(true);
    try {
      // Fetch card render URL from Supabase
      const { data, error } = await supabase
        .from("nexus_cards")
        .select("card_render")
        .eq("id", cardId)
        .single();

      if (error) {
        throw error;
      } else if (!data.card_render) {
        throw new Error("Card render not found");
      }

      const renderUrl = data.card_render;

      if (renderUrl) {
        // Download existing render
        await downloadImage(renderUrl, `card-${cardId}-${mode}.png`);
        toast("Your card has been downloaded.");
      } else {
        // Call API route to trigger Supabase Edge Function to generate card render
        const response = await fetch("/api/data/generate-card-render", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ record: { id: cardId.toString(), mode } }),
        });

        if (!response.ok) {
          throw new Error("Failed to trigger render generation");
        }

        toast(
          "Render generation started. Please try downloading again in a few moments."
        );

        // Fall back to html-to-image method
        await generateImageFromDOM();
      }
    } catch (error) {
      console.error("Error downloading card:", error);
      // Fall back to html-to-image method
      await generateImageFromDOM();
    } finally {
      setIsPending(false);
      setDownloaded(true);
    }
  }

  async function generateImageFromDOM() {
    setIsPending(true);
    try {
      // Force a re-render by updating state
      setIsPending(false);
      setIsPending(true);

      // Wait for the next render cycle
      await new Promise((resolve) => setTimeout(resolve, 0));

      const element = document.getElementById(
        `card-render-container-${cardId}-${mode}`
      );
      if (element) {
        // Update the card art URL before generating the image
        const imgElement = element.querySelector(
          'img[data-testid="card-art-image"]'
        ) as HTMLImageElement;
        if (imgElement && currentCardArtUrl) {
          imgElement.src = currentCardArtUrl;
        }

        // Wait for the image to load
        await new Promise((resolve) => {
          if (imgElement && imgElement.complete) {
            resolve(null);
          } else if (imgElement) {
            imgElement.onload = () => resolve(null);
            imgElement.onerror = () => resolve(null);
          } else {
            resolve(null);
          }
        });

        const dataUrl = await toPng(element, {
          quality: 0.95,
          pixelRatio: 2,
          cacheBust: true,
        });
        const link = document.createElement("a");
        link.download = `card-${cardId}-${mode}.png`;
        link.href = dataUrl;
        link.click();
        toast("Your card has been downloaded.");
      } else {
        throw new Error("Card element not found");
      }
    } catch (error) {
      console.error("Error generating image:", error);
      toast("Failed to download the card. Please try again.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Button
      type="button"
      size="sm"
      className="font-medium"
      disabled={isPending || downloaded}
      onClick={handleDownload}
    >
      {isPending ? "Downloading..." : downloaded ? "Downloaded" : "Download"}
    </Button>
  );
}
