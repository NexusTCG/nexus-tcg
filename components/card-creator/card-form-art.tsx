"use client"

import React, { useState } from "react"
import { useFormContext } from 'react-hook-form';
// Utils
import Image from 'next/image';
import clsx from 'clsx';
// Data
import { artdirectionOptions } from "@/app/lib/data/data";
// Components
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function CardArtPopover() {
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: any }>({});
  const { watch, setValue } = useFormContext();

  function handleOptionClick(category: string, option: string) {
    setSelectedOptions(prev => ({
      ...prev,
      [category]: prev[category] === option ? null : option
    }));
  };

  const cardArtUrl = watch('art_options');
  const cardName = watch('name');
  const cardCreator = watch('username');

  // TODO: Get
  // TODO: Close popover when button is pressed

  return (
    <Popover>
      <PopoverTrigger>
        <div
          id="card-art-container"
          style={{ 
            borderRadius: "0 0 8px 8px",
            position: "relative",
            overflow: "hidden",
            aspectRatio: "4 / 3",
          }}
          className="
            w-[360px]
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
            // src={cardArtUrl[0]}
            src="/images/default-art.jpg"
            alt={`${cardName} by ${cardCreator}`}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="
          flex
          flex-col
          justify-start
          items-start
          gap-4
          md:w-[480px]
          w-[360px]
          -mt-32
        "
      >
        <div
          id="artdirection-form"
          className="
            flex
            flex-col
            justify-start
            items-start
            w-full
            gap-2
          "
        >
          {/* TODO: Make into a form */}
          <Textarea
            placeholder="Write a prompt describing your card's art"
            className="w-full"
          />
          <Button
            className="
              w-full
              font-semibold
            "
          >
            Generate art
          </Button>
        </div>
        <div
          id="artdirection-options"
          className="
            flex
            flex-col
            justify-start
            items-start
            gap-4
          "
        >
          {Object
            .entries(artdirectionOptions)
            .map(([category, options]) => (
            <div
              key={category}
              id="artdirection-options-category-container"
              className="
                flex
                flex-col
                justify-start
                items-start
                gap-2
              "
            >
              <h3>{category}</h3>
              <div
                id="artdirection-options"
                className="
                  flex
                  flex-wrap
                  justify-start
                  items-start
                  gap-1
                "
              >
                {options.map((option) => (
                  <TooltipProvider key={option}>
                    <Tooltip>
                      <TooltipTrigger>
                        <Button
                          onClick={() => handleOptionClick(category, option)}
                          variant={
                            selectedOptions[category] === option 
                            ? "default"
                            : "outline"}
                          size="sm"
                          className={clsx("text-xs",
                            {
                              "border": selectedOptions[category] === option,
                            }
                          )}
                        >
                          {option}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <Image
                          src={`/path/to/${option.toLowerCase()}_reference.jpg`} 
                          alt={`${option} style`} 
                          width={200} 
                          height={150} 
                        />
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}