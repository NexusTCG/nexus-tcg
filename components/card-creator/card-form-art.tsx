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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
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

export default function CardArtSheet() {
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: number | null }>({});  const [isGenerating, setIsGenerating] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const { showOverlay, hideOverlay } = useOverlay();
  const { watch, control, setValue } = useFormContext();
  const { mode } = useMode();

  const form = watch()
  const characterCount = form.initialMode.prompt_art ? form.initialMode.prompt_art.length : 0;
  const artDirectionOptions = form[`${mode}Mode`].art_direction_options;
  const artOptions = form[`${mode}Mode`].art_options;
  const selectedArt = form[`${mode}Mode`].art_selected;

  function getSelectedOptionName(
    sectionKey: string, 
    optionId: number | null
  ): string | null {
    if (optionId === null) return null;
    const section = artPromptOptions[sectionKey];
    const option = section.options.find(opt => opt.id === optionId);
    return option ? option.option : null;
  }

  function handleOptionClick(
    section: string, 
    optionId: number
  ) {
    setSelectedOptions(prev => {
      const newOptions = {
        ...prev,
        [section]: prev[section] === optionId ? null : optionId
      };

      const updatedArtOptions = Object.entries(newOptions)
        .filter(([_, value]) => value !== null)
        .map(([key, value]) => ({
          section: key,
          option: value as ArtPromptOptionType["id"]
        }));

      setValue(`${mode}Mode.art_direction_options`, updatedArtOptions);

      return newOptions;
    });
  }

  function handleBadgeClick(
    sectionKey: string
  ) {
    setSelectedOptions(prev => {
      const newOptions = { ...prev };
      delete newOptions[sectionKey];

      const updatedArtOptions = Object.entries(newOptions)
        .filter(([_, value]) => value !== null)
        .map(([key, value]) => ({
          section: key,
          option: value as ArtPromptOptionType["id"]
        }));

      setValue(`${mode}Mode.art_direction_options`, updatedArtOptions);

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
      setIsSheetOpen(false);
      hideOverlay();
    }
  }

  return (
    <Sheet 
      open={isSheetOpen} 
      onOpenChange={(open) => {
        if (!isGenerating) {
          setIsSheetOpen(open);
          open 
            ? showOverlay() 
            : hideOverlay();
        }
      }}
    >
      <SheetTrigger disabled={isGenerating}>
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
      </SheetTrigger>
      <SheetContent
        side="right"
        className="
          flex
          flex-col
          justify-start
          items-start
          border-l
          border-zinc-700
          p-0
          gap-0
        "
      >
        <SheetHeader
          className="
            flex 
            flex-col 
            justify-start
            items-start
            w-full 
            p-4 
            gap-2
          "
        >
          <h2>Generate art</h2>
          {JSON.stringify(artDirectionOptions)}
          <div
            className="
              flex
              flex-col
              justify-start
              items-start
              w-full
              gap-4
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
            <div className="flex flex-col gap-2 w-full">
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
                <span className="opacity-80 font-normal">
                  art generations used for {
                    mode === "initial" 
                    ? "initial mode" 
                    : "anomaly mode"
                  }
                </span>
              </small>
            </div>
            {Object.keys(selectedOptions).length > 0 && (
              <div className="flex flex-wrap gap-1">
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
            </div>)}
          </div>
        </SheetHeader>
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
            h-full
          "
        >
          {Object.entries(artPromptOptions).map(([sectionKey, section], index, array) => {
            if (sectionKey === "framing" && (!selectedOptions["subject"] || selectedOptions["subject"] === 1)) {
              return null;
            }

            return (
              <div
                key={sectionKey}
                className={clsx(
                  "flex flex-col gap-2 w-full p-4",
                  {
                    "border-b border-zinc-700": index !== array.length - 1,
                  }
                )}
              >
                <h4>{section.title}</h4>
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
      </SheetContent>
    </Sheet>
  )
}