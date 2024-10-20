import React from "react";
// Utils
import Link from "next/link";
// Server
import { getCurrentUserId } from "@/app/server/auth";
// Actions
import { calculateTimeAgo } from "@/app/utils/actions/actions";
// Custom components
import { DownloadButton } from "@/components/card-render/download-button";
import { ShareModal } from "@/components/card-render/share-modal";

type CardRenderPageFooterProps = {
  createdAt?: string | null;
  updatedAt?: string;
  username: string;
  cardId: number;
  cardName: string;
  activeMode: "initial" | "anomaly";
  currentCardArtUrl?: string;
};

export default async function CardRenderPageFooter({
  createdAt,
  updatedAt,
  username,
  cardId,
  cardName,
  activeMode,
  currentCardArtUrl,
}: CardRenderPageFooterProps) {
  const userId = await getCurrentUserId();

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
            <span className="opacity-60">Updated </span>
            <span className="font-medium">{calculateTimeAgo(updatedAt)}</span>
          </>
        ) : (
          <>
            <span className="opacity-60">Created </span>
            <span className="font-medium">{calculateTimeAgo(createdAt)}</span>
          </>
        )}
        <span className="opacity-60"> by </span>
        <span
          className="
            font-medium 
            text-teal-500 
            hover:underline 
            hover:opacity-80
          "
        >
          <Link href={`/profile/${username}`}>{username}</Link>
        </span>
      </p>
      <div
        id={`${cardId}-footer-actions-container`}
        className="
          flex 
          flex-row 
          justify-end 
          items-center
          gap-2
        "
      >
        <ShareModal cardId={cardId} cardName={cardName} />
        {userId && (
          <DownloadButton
            cardId={cardId}
            mode={activeMode}
            currentCardArtUrl={currentCardArtUrl}
          />
        )}
      </div>
    </div>
  );
}
