import React from "react";
// Components
import { Button } from "@/components/ui/button";

// TODO: Accept card name data from parent component
// TODO: Accept current card mode state from parent component

export default function CardCreatorHeader() {

  const cardName = "Card Name"; // Replace with dynamic data
  const cardMode = "Card Mode"; // Replace with dynamic data
  
  return (
    <div
      id="card-creator-header"
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
        id="card-creator-header-content"
        className="
          flex
          flex-col
          justify-start
          items-start
          gap-0.5
        "
      >
        <h2 className="font-medium">{cardName}</h2>
        <small className="text-zinc-400 text-xs">{cardMode.toUpperCase()}</small>
      </div>
      <Button
        disabled={true} // TODO: Disable if form is invalid
        size="sm"
        className="font-semibold"
      >
        Finish
      </Button>
    </div>
  )
}