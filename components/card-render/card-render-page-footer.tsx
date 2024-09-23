import React from "react";
// Utils
import Link from "next/link";
import { toPng } from 'html-to-image';
// Actions
import { calculateTimeAgo } from "@/app/utils/actions/actions";
// Components
import { Button } from "@/components/ui/button";

type CardRenderPageFooterProps = {
  createdAt?: string | null;
  updatedAt?: string;
  username: string;
  cardId: number; 
  activeMode: 'initial' | 'anomaly';
}

export default function CardRenderPageFooter({
  createdAt,
  updatedAt,
  username,
  cardId,
  activeMode,
}: CardRenderPageFooterProps) {

  async function handleDownload(
    mode: 'initial' | 'anomaly'
  ) {
    const element = document.getElementById(
      `card-render-container-${cardId}-${mode}`
    );
    if (element) {
      try {
        await new Promise(resolve => setTimeout(resolve, 100));

        const dataUrl = await toPng(element, { 
          quality: 0.95,
          cacheBust: true,
        });
        const link = document.createElement('a');
        link.download = `card-${cardId}-${activeMode}.png`;
        link.href = dataUrl;
        link.click();
      } catch (error) {
        console.error('Error generating image:', error);
      }
    }
  };

  return (
    <div 
      id="card-creator-footer" 
      className="
        flex 
        flex-row 
        justify-between 
        items-center 
        w-full 
        border-t 
        border-zinc-700 
        p-4
        gap-2
      "
    >
      <p className="text-sm">
        {updatedAt && updatedAt !== createdAt ? (
          <>
            <span className="opacity-60">
              Updated{" "}
            </span>
            <span className="font-medium">
              {calculateTimeAgo(updatedAt)}
            </span>
          </>
        ) : (
          <>
            <span className="opacity-60">
              Created{" "}
            </span>
            <span className="font-medium">
              {calculateTimeAgo(createdAt)}
            </span>
          </>
        )}
        <span className="opacity-60">{" "}by{" "}</span>
        <span
          className="
            font-medium 
            text-teal-500 
            hover:underline 
            hover:opacity-80
          "
        >
          <Link href={`/profile/${username}`}>
            {username}
          </Link>
        </span>
      </p>
      <div
        className="
          flex 
          flex-row 
          justify-end 
          items-center
          gap-2
        "
      >
        <Button size="sm" className="font-medium">
          Share
        </Button>
        {activeMode === "initial" ? (
          <Button
            size="sm"
            className="font-medium"
            onClick={() => handleDownload("initial")}
          >
            Download
          </Button>
        ) : (
          <Button
            size="sm"
            className="font-medium"
            onClick={() => handleDownload("anomaly")}
          >
            Download
          </Button>
        )}
      </div>
    </div>
  )
}