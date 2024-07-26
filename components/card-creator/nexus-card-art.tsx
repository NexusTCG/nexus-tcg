import React from "react"
import Image from 'next/image';

type NexusCardArtProps = {
  cardArtUrl: string,
  cardName: string,
  cardCreator: string,
}

export default function NexusCardArt({
  cardArtUrl,
  cardName,
  cardCreator,
}: NexusCardArtProps) {
  return (
    <div
      id="card-art-container"
      style={{ 
        borderRadius: "0 0 8px 8px",
        position: "relative",
        overflow: "hidden",
        aspectRatio: "4 / 3",
      }}
      className="
        w-full
        h-full
        overflow-hidden
        border-2
        z-10
        -mt-0.5
        shadow-sm
        shadow-black/50
      "
    >
      <Image
        src={cardArtUrl}
        alt={`${cardName} by ${cardCreator}`}
        fill
        style={{
          objectFit: "cover",
          }}
      />
    </div>
  )
}