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
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
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
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

const MAX_PROMPT_LENGTH = 280;

export default function CardArtPopover() {
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: any }>({});
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const { watch, control } = useFormContext();

  function handleOptionClick(category: string, option: string) {
    setSelectedOptions(prev => ({
      ...prev,
      [category]: prev[category] === option ? null : option
    }));
  };

  const cardCreator = watch('username');
  const cardName = watch('initialMode.name');
  const cardArtUrl = watch('initialMode.art_options');

  const promptArt = watch('initialMode.prompt_art');
  const characterCount = promptArt ? promptArt.length : 0;

  // TODO: Get
  // TODO: Close popover when button is pressed

  function handleGenerateArt() {
    // Call API to generate card art
  }

  return (
    <>
      {isPopoverOpen && (
        <div // Dark overlay
          className="fixed inset-0 bg-black bg-opacity-60 z-40"
          onClick={() => setIsPopoverOpen(false)}
        />
      )}
      <Popover onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger>
          <div
            id="card-art-container"
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
            <div
              style={{ 
                borderRadius: "0 0 20px 20px",
                backdropFilter: "blur(2px)" 
              }}
              className="
                absolute 
                inset-0 
                bg-black/80
                flex 
                items-center 
                justify-center
                opacity-0 
                group-hover:opacity-100 
                transition-opacity
                z-20
              "
            >
              <p className="text-white text-xl">Generate art</p>
            </div>
            <div className="w-full h-full overflow-hidden">
              <Image
                // src={cardArtUrl[0]}
                src="/images/default-art.jpg"
                alt={`${cardName} by ${cardCreator}`}
                fill
                style={{ objectFit: "cover" }}
                className="group-hover:scale-105 transition-all duration-300"
              />
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="
            PopoverContent 
            flex
            flex-col
            justify-start
            items-start
            rounded-xl
            border
            border-zinc-700
            shadow-lg
            shadow-black/60
            md:w-[480px]
            w-[360px]
            max-h-[480px]
            overflow-visible
            absolute
            left-1/2
            -translate-x-1/2
            bottom-full
            -mb-24
            p-0
            gap-2
          "
        >
          <div
            id="art-direction-form"
            className="
              flex
              flex-col
              justify-start
              items-start
              w-full
              gap-4
              p-4
            "
          >
            <h2 className="font-semibold">Generate card art</h2>
            <FormField
              control={control}
              name="initialMode.prompt_art"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="relative w-full">
                      <Textarea
                        placeholder="Write a prompt describing your card's art"
                        className="w-full max-h-[300px] pr-16 resize-none"
                        maxLength={MAX_PROMPT_LENGTH}
                        {...field}
                      />
                      <div className="absolute bottom-2 right-2 text-sm text-gray-400">
                        {characterCount}/{MAX_PROMPT_LENGTH}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="button"
              onClick={handleGenerateArt}
              size="sm"
              className="
                w-full
                font-semibold
              "
            >
              Generate art
            </Button>
          </div>
          <Separator />
          <div
            id="art-direction-options-container"
            className="
              flex
              flex-col
              justify-start
              items-start
              w-full
              overflow-y-auto
              scrollbar-hide
              max-h-[50vh]
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
                  w-full
                  p-4
                  border-b
                  border-zinc-700
                "
              >
                <h4 className="text-md font-semibold">{category}</h4>
                <div
                  id="category-options"
                  className="
                    flex
                    flex-wrap
                    justify-start
                    items-start
                    gap-1
                    w-full
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
                        <TooltipContent
                          sideOffset={5}
                          style={{ position: "relative", }}
                          className="
                            w-[200px]
                            h-[150px]
                            border
                            border-zinc-600
                            shadow-md
                            shadow-black/60
                            z-[100]
                            p-0
                          "
                        >
                          <Image
                            // src={`/path/to/${option.toLowerCase()}_reference.jpg`} 
                            src="/images/default-art.jpg" // Placeholder
                            alt={`${option} style`} 
                            fill
                            style={{ objectFit: "cover" }}
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
    </>
  )
}