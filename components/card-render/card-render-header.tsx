import React from "react";
// Custom components
import CardVotes from "@/components/card-render/card-render-votes";

type CardRenderHeaderProps = {
  cardId: number;
  cardName: string;
  mode: 'initial' | 'anomaly';
}

export default function CardRenderHeader({ 
  cardId,
  cardName,
  mode,
}: CardRenderHeaderProps) {
  return (
    <div
      id="card-render-header"
      className="
        flex
        flex-row
        justify-between
        items-center
        w-full
        px-4
        py-2
        bg-zinc-900
        border-b
        border-zinc-700
      "
    >
      <div
        id="card-render-header-content"
        className="
          flex
          flex-col
          justify-start
          items-start
          gap-0.5
        "
      >
        <h2 className="font-medium">{cardName ? cardName : "Card name"}</h2>
        <small className="opacity-50 text-xs">{mode.toUpperCase()}</small>
      </div>
      {cardId && (<CardVotes cardId={cardId} />)}
    </div>
  )
}