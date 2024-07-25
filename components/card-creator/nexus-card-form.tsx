import React from "react"
import Image from 'next/image';
// Components
import { AspectRatio } from "@/components/ui/aspect-ratio"
// Custom components
import NexusCardContainer from "@/components/card-creator/nexus-card-container";
import NexusCardFormHeader from "@/components/card-creator/nexus-card-form-header"

export default function NexusCardForm() {
  return (
    <NexusCardContainer>
      <NexusCardFormHeader />
      <div
        id="card-content-container"
        className="
          flex
          flex-col
          justify-center
          items-center
          w-full
          h-full
          px-1.5
          border-x
        "
      >
        {/* Was w-[340px] */}
        <AspectRatio
          ratio={4 / 3}
          style={{borderRadius: "0 0 1rem 1rem" }}
          className="
            w-full
            border-2
            -mt-0.5
            overflow-hidden
            z-10
            shadow-sm
            shadow-black/50
          "
        >
          <Image
            src="https://nxqwqvpgdaksxhkhkiem.supabase.co/storage/v1/object/public/card-art/card-art/1721896579240-flda1vy7c69.png"
            alt="Scrapraider Ratatazong by Schw4rtzee"
            fill
          />
        </AspectRatio>
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
        {/* <div
          id="card-footer-container"
          className="
            flex
            flex-row
            justify-between
            items-center
            w-full
          "
        >
          <span>Attack</span>
          <span>Grade</span>
          <span>Defense</span>
        </div> */}
      </div>
    </NexusCardContainer>
  )
}