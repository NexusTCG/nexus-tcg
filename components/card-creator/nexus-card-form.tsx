import React from "react"
// Custom components
import NexusCardArt from "@/components/card-creator/nexus-card-art"
import NexusCardContainer from "@/components/card-creator/nexus-card-container";
import NexusCardFormHeader from "@/components/card-creator/nexus-card-form-header"
import NexusCardFormCost from "@/components/card-creator/nexus-card-form-cost"

// TODO: Replace with dynamic data
const cardArtUrl = "https://nxqwqvpgdaksxhkhkiem.supabase.co/storage/v1/object/public/card-art/card-art/1721896579240-flda1vy7c69.png"
const cardName = "Card Name"
const cardCreator = "Card Creator"

export default function NexusCardForm() {
  return (
    <NexusCardContainer>
      <NexusCardFormHeader />
      <NexusCardFormCost />
      <div
        id="card-content-container"
        className="
          flex
          flex-col
          justify-center
          items-center
          w-full
          h-full
          px-2
          border-x
        "
      >
        <NexusCardArt
          cardArtUrl={cardArtUrl}
          cardName={cardName}
          cardCreator={cardCreator}
        />
        {/* TODO: Turn into component. Keyword select + text input */}
        <div
          id="card-text-outer-container"
          className="
            flex
            flex-col
            justify-center
            items-center
            w-full
            h-full
            p-2
            pb-3
            -mt-4
          "
        >
          <div
            id="card-text-outer-container"
            className="
              flex
              flex-col
              justify-center
              items-center
              w-full
              h-full
              p-1
              bg-yellow-500
              border-2
              shadow-sm
              shadow-black/50
              rounded-sm
            "
          >
            <div
              id="card-text-inner-container"
              style={{ fontSize: "0.85rem" }}
              className="
                flex
                flex-col
                justify-start
                items-start
                w-full
                h-full
                p-2
                text-black
                bg-yellow-50
                border
              "
            >
              <span>Card text goes here</span>
              <span>Card lore text goes here</span>
            </div>
          </div>
        </div>
      </div>
    </NexusCardContainer>
  )
}