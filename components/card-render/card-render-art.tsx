"use client";

import React from "react";
// Utils
import Image from "next/image";

type CardRenderArtProps = {
  mode: "initial" | "anomaly";
  cardId: number;
  cardArt: string;
  cardName: string;
  username: string;
};

export default function CardRenderArt({
  mode,
  cardId,
  cardArt,
  cardName,
  username,
}: CardRenderArtProps) {
  return (
    <div
      id="card-render-art-container"
      style={{
        borderRadius: "0 0 20px 20px",
        position: "relative",
        overflow: "hidden",
        aspectRatio: "10 / 7",
        maxHeight: "415px",
      }}
      className="
        w-[360px] 
        h-full 
        border-2 
        z-10 
        -mt-0.5 
        shadow 
        shadow-black/50 
        group
      "
    >
      <div className="w-full h-full overflow-hidden">
        <Image
          key={`${cardId}-${mode}`}
          src={cardArt}
          alt={`${cardName} by ${username}`}
          data-testid="card-art-image"
          fill
          priority
          quality={100}
          onLoad={(img) => {
            (img.target as HTMLImageElement).style.visibility = "visible";
          }}
          style={{
            objectFit: "cover",
            visibility: "hidden",
          }}
        />
      </div>
    </div>
  );
}
