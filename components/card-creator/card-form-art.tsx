"use client"

import React, { useState } from "react"
import { useFormContext } from 'react-hook-form';
import { useOverlay } from "@/app/utils/context/OverlayContext";
import { useMode } from "@/app/utils/context/CardFormModeContext";
// Utils
import Image from 'next/image';
import clsx from 'clsx';
import posthog from 'posthog-js';
// Data
import { artdirectionOptions } from "@/app/lib/data/data";
// Components
import { toast } from "sonner";
import {
  FormControl,
  FormField,
  FormItem,
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

const MAX_PROMPT_LENGTH = 100;
const MAX_ART_GENERATIONS = 5;

export default function CardArtPopover() {
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string | null }>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const { showOverlay, hideOverlay } = useOverlay();
  const { watch, control, setValue } = useFormContext();
  const { mode } = useMode();

  const form = watch()
  const characterCount = form.initialMode.prompt_art ? form.initialMode.prompt_art.length : 0;
  const artOptions = form[`${mode}Mode`].art_options;
  const selectedArt = form[`${mode}Mode`].art_selected;

  function handleOptionClick(
    category: string, 
    option: string
  ) {
    setSelectedOptions(prev => ({
      ...prev,
      [category]: prev[category] === option ? null : option
    }));
  };

  async function handleGenerateArt() {
    if (artOptions.length >= MAX_ART_GENERATIONS) {
      // Show error message
      return;
    }

    setIsGenerating(true);
    toast("Generating art...")

    const prompt = form[`${mode}Mode`].prompt_art;
    const artDirections = Object.values(selectedOptions).filter(Boolean).join(", ");
    const fullPrompt = `${prompt}. Art style: ${artDirections}`;

    try {
      const response = await fetch('/api/data/generate-art', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: fullPrompt }),
      });

      if (!response.ok) {
        toast.error('Art generation API call failed!')
        throw new Error('Art generation API call failed')
      };

      const { imageUrl } = await response.json();

      posthog.capture('art_generated', {
        imageUrl,
        artOptions,
        prompt,
        artDirections,
        fullPrompt,
      })
      toast.success('Art generated!')

      setValue(`${mode}Mode.art_options`, [...artOptions, imageUrl]);
      setValue(`${mode}Mode.art_selected`, artOptions.length);
    } catch (error) {
      console.error('Error generating art:', error);
      toast.error('Art generation failed!')
    } finally {
      setIsGenerating(false);
      setIsPopoverOpen(false);
      hideOverlay();
    }
  }

  return (
    <Popover 
      open={isPopoverOpen} 
      onOpenChange={(open) => {
        if (!isGenerating) {
          setIsPopoverOpen(open);
          open 
            ? showOverlay() 
            : hideOverlay();
        }
      }}
    >
      <PopoverTrigger disabled={isGenerating}>
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
              backdropFilter: "blur(1px)" 
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
              duration-300
              delay-75
              z-20
            "
          >
            <p className="text-white text-xl">
            {form.initialMode.art_options.length > 0 ? "Update art" : "Generate art"}
            </p>
          </div>
          <div className="w-full h-full overflow-hidden">
            <Image
              src={
                artOptions[selectedArt] || 
                "/images/default-art.jpg"
              }
              alt={`${form[`${mode}Mode`].name} by ${form.username}`}
              fill
              style={{ 
                objectFit: "cover",
              }}
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
          lg:w-[600px]
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
          transition-all
          duration-200
          ease-in-out
          opacity-100
          scale-100
          data-[state=closed]:opacity-0
          data-[state=closed]:scale-95
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
            gap-2
            p-4
          "
        >
          <FormField
            control={control}
            name={mode === "initial" ? "initialMode.prompt_art" : "anomalyMode.prompt_art"}
            disabled={isGenerating || artOptions.length >= MAX_ART_GENERATIONS}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="relative w-full">
                    <Textarea
                      placeholder="Write a prompt describing your card's art"
                      className="w-full h-[100px] pr-16 resize-none"
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
            className={clsx("w-full font-semibold",
              {
                "animate-pulse": isGenerating,
              }
            )}
            disabled={isGenerating || artOptions.length >= MAX_ART_GENERATIONS}
          >
            {isGenerating ? "Generating..." : "Generate art"}
          </Button>
          <small className="flex items-center space-x-0.5 font-medium">
            <span className={clsx(
                "font-bold",
              {
                "text-red-600": artOptions.length >= MAX_ART_GENERATIONS,
                "text-red-500": artOptions.length >= MAX_ART_GENERATIONS * 0.8,
                "text-red-400": artOptions.length >= MAX_ART_GENERATIONS * 0.6,
              }
            )}
            >
              {artOptions.length}
            </span>
            <span className="opacity-40">/</span>
            <span className="font-semibold">{MAX_ART_GENERATIONS}{" "}</span>
            <span className="opacity-80 font-normal">art generations left for {mode === "initial" ? "initial mode" : "anomaly mode"}</span>
          </small>
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
                          src={selectedArt ? artOptions[selectedArt] : "/images/default-art.jpg"} // Placeholder
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
  )
}