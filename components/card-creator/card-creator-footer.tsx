"use client";

// Hooks
import React from "react";
import { useFormContext } from 'react-hook-form';
import { useMode } from "@/app/utils/context/CardFormModeContext";
// Utils
import Image from "next/image";
// Components
import { Button } from "@/components/ui/button";
// Icons
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

export default function CardCreatorFooter() {
  const { watch, setValue } = useFormContext();
  const { mode } = useMode();

  const artOptions = watch(`${mode}Mode.art_options`);
  const selectedArt = watch(`${mode}Mode.art_selected`);

  function handleArtSelection(index: number) {
    setValue(`${mode}Mode.art_selected`, index);
  }

  return (
    artOptions.length > 0 ? (
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
            min-h-[72px]
          "
        >
          {artOptions.map((
            artUrl: string, 
            index: number
          ) => (
            <div
              key={index}
              id={`image-container-${index}`}
              style={{ position: "relative", overflow: "hidden" }}
              className={`w-[80px] h-[60px] cursor-pointer ${selectedArt === index ? 'border-2 border-teal-500' : ''}`}
              onClick={() => handleArtSelection(index)}
            >
              <Image
                src={artUrl}
                alt={`Generated art ${index + 1}`}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          ))}
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
    ) : (
      null
    )
  )
}