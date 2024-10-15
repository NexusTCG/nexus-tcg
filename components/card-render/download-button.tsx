"use client";

import { useState } from "react";
import { toPng } from "html-to-image";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type DownloadButtonProps = {
  cardId: number;
  mode: "initial" | "anomaly";
};

export function DownloadButton({ cardId, mode }: DownloadButtonProps) {
  const [isPending, setIsPending] = useState(false);

  const handleDownload = async () => {
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
  };

  return (
    <Button
      type="button"
      size="sm"
      className="font-medium"
      disabled={isPending}
      onClick={handleDownload}
    >
      {isPending ? "Downloading..." : "Download"}
    </Button>
  );
}
