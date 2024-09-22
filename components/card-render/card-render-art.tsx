import React from "react";
// Utils
import Image from "next/image";

type CardRenderArtProps = {
  cardArt: string;
  cardName: string;
  username: string;
}

export default function CardRenderArt({
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
          src={cardArt}
          alt={`${cardName} by ${username}`}
          fill
          style={{ 
            objectFit: "cover",
          }}
        />
      </div>
    </div>
  )
};