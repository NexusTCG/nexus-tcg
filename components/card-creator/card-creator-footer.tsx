import React from "react";
// Utils
import Image from "next/image";
// Components
import {Button } from "@/components/ui/button";
import { 
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/md";

// TODO: Accept data from parent component
// TODO: Manage state for selected art

export default function CardCreatorFooter() {

  // TODO: Dynamically render each art option

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
        px-2
        py-2
        gap-2
      "
    >
      <div>
        <Button variant="ghost" size="icon">
            <MdChevronLeft
              className="
                h-[24px]
                w-[24px]
                text-neutral-500
                opacity-80
                hover:opacity-100
                animate-all
              "
            />
        </Button>
      </div>
      <div
        id="art-options-container"
        className="
          flex
          flex-row
          justify-center
          items-center
          w-full
          gap-2
        "
      >
        <div
          id="image-container"
          style={{ position: "relative", overflow: "hidden" }}
          className="w-[80px] h-[60px]"
        >
          <Image
            src="https://nxqwqvpgdaksxhkhkiem.supabase.co/storage/v1/object/public/card-art/card-art/1721896579240-flda1vy7c69.png"
            alt="Scrapraider Ratatazong by Schw4rtzee"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div
          id="image-container"
          style={{ position: "relative", overflow: "hidden" }}
          className="w-[80px] h-[60px]"
        >
          <Image
            src="https://nxqwqvpgdaksxhkhkiem.supabase.co/storage/v1/object/public/card-art/card-art/1721896579240-flda1vy7c69.png"
            alt="Scrapraider Ratatazong by Schw4rtzee"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div
          id={`image-container`} // TODO: Make dynamic
          style={{ 
            position: "relative", 
            overflow: "hidden" 
          }}
          className="
            w-[80px] 
            h-[60px]
          "
        >
          <Image
            src="https://nxqwqvpgdaksxhkhkiem.supabase.co/storage/v1/object/public/card-art/card-art/1721896579240-flda1vy7c69.png"
            alt="Scrapraider Ratatazong by Schw4rtzee"
            style={{ objectFit: "cover" }}
            fill
          />
        </div>
      </div>
      <div>
        <Button variant="ghost" size="icon">
          <MdChevronRight
            className="
              h-[24px]
              w-[24px]
              text-neutral-500
              opacity-80
              hover:opacity-100
              animate-all
            "
          />
        </Button>
      </div>
    </div>
  )
}