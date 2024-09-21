import React from "react";
// Components
import { Button } from "@/components/ui/button";

type CardRenderHeaderProps = {
  cardName: string;
  mode: 'initial' | 'anomaly';
  toggleMode: () => void;
}

export default function CardRenderHeader({ 
  cardName,
  mode,
  toggleMode
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
      <>Votes</>
    </div>
  )
}