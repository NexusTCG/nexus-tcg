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
import { artPromptOptions } from "@/app/lib/data/components";
// Validation
import { 
  ArtPromptOptionsType, 
  ArtPromptOptionType 
} from "@/app/lib/types/components";
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
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
// Icons
import { X } from "lucide-react";

const MAX_PROMPT_LENGTH = 100;
const MAX_ART_GENERATIONS = 5;

export default function CardArtPopover() {
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: number | null }>({});  const [isGenerating, setIsGenerating] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const { showOverlay, hideOverlay } = useOverlay();
  const { watch, control, setValue } = useFormContext();
  const { mode } = useMode();

  const form = watch()
  const characterCount = form.initialMode.prompt_art ? form.initialMode.prompt_art.length : 0;
  const artOptions = form[`${mode}Mode`].art_options;
  const selectedArt = form[`${mode}Mode`].art_selected;

  function handleOptionClick(
    section: string, 
    optionId: number
  ) {
    setSelectedOptions(prev => ({
      ...prev,
      [section]: prev[section] === optionId ? null : optionId
    }));
  }

  function getSelectedOptionName(
    sectionKey: string, 
    optionId: number | null
  ): string | null {
    if (optionId === null) return null;
    const section = artPromptOptions[sectionKey];
    const option = section.options.find(opt => opt.id === optionId);
    return option ? option.option : null;
  }

  function handleBadgeClick(
    sectionKey: string
  ) {
    setSelectedOptions(prev => {
      const newOptions = { ...prev };
      delete newOptions[sectionKey];
      return newOptions;
    });
  }

  async function handleGenerateArt() {
    if (artOptions.length >= MAX_ART_GENERATIONS) {
      toast.error(`You've reached the maximum of ${MAX_ART_GENERATIONS} art generations for ${mode === "initial" ? "initial mode" : "anomaly mode"}.`)
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
            <span className="opacity-80 font-normal">art generations used for {mode === "initial" ? "initial mode" : "anomaly mode"}</span>
          </small>
          <div className="flex flex-wrap gap-1 mt-2">
            {Object.entries(selectedOptions).map(([sectionKey, optionId]) => {
              const optionName = getSelectedOptionName(sectionKey, optionId);
              if (optionName) {
                return (
                  <Badge
                    key={sectionKey}
                    variant="secondary"
                    onClick={() => handleBadgeClick(sectionKey)}
                    className="
                      hover:opacity-80
                      text-xs 
                      font-normal 
                      pr-1.5
                      cursor-pointer
                    "

                  >
                    {optionName}
                    <X className="inline-block ml-1 h-3 w-3" />
                  </Badge>
                );
              }
              return null;
            })}
          </div>
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
          {Object.entries(artPromptOptions).map(([sectionKey, section]) => {
            if (sectionKey === "framing" && (!selectedOptions["subject"] || selectedOptions["subject"] === 1)) {
              return null;
            }

            return (
              <div
                key={sectionKey}
                className="
                  flex 
                  flex-col 
                  gap-2 
                  w-full 
                  p-4 
                  border-b 
                  border-zinc-700
                "
              >
                <h4 className="text-md font-semibold">{section.title}</h4>
                <div className="flex flex-wrap gap-1 mb-2">
                {section.options.map((option: ArtPromptOptionType) => {
                    const isSelected = selectedOptions[sectionKey] === option.id;
                    const BadgeComponent = (
                      <Badge
                        key={option.id}
                        variant={isSelected ? "default" : "outline"}
                        className={clsx(
                          "font-normal cursor-pointer transition-colors duration-200",
                          isSelected ? "bg-primary text-primary-foreground" : "bg-background",
                          "hover:bg-primary/90 hover:text-primary-foreground"
                        )}
                        onClick={() => handleOptionClick(sectionKey, option.id)}
                      >
                        {option.option}
                      </Badge>
                    );

                    if (!option.image && !option.description) {
                      return BadgeComponent;
                    }

                    return (
                      <TooltipProvider key={option.id}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            {BadgeComponent}
                          </TooltipTrigger>
                          <TooltipContent
                            sideOffset={5}
                            className="w-[200px] border border-zinc-600 shadow-md shadow-black/60 z-[100] p-2"
                          >
                            {option.image && (
                              <div className="w-full h-[150px] relative mb-2">
                                <Image
                                  src={option.image}
                                  alt={option.option}
                                  fill
                                  style={{ objectFit: "cover" }}
                                />
                              </div>
                            )}
                            {option.description && (
                              <p className="text-sm">{option.description}</p>
                            )}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
}