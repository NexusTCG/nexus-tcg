"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { useOverlay } from "@/app/utils/context/OverlayContext";
import { useMode } from "@/app/utils/context/CardModeContext";
// Utils
import Image from "next/image";
import clsx from "clsx";
import posthog from "posthog-js";
// Data
import { artPromptOptions } from "@/app/lib/data/components";
// Validation
import { ArtPromptOptionType } from "@/app/lib/types/components";
// Components
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
// Icons
import { X, Loader2 } from "lucide-react";

const MAX_PROMPT_LENGTH = 100;
const MAX_ART_GENERATIONS = 5;

export default function CardArtSheet() {
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: number | null;
  }>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [tooltipContent, setTooltipContent] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const tooltipRef = useRef<HTMLDivElement>(null);

  const { showOverlay, hideOverlay } = useOverlay();
  const { watch, control, setValue } = useFormContext();
  const { mode } = useMode();

  const form = watch();
  const artOptions = form[`${mode}Mode`].art_options;
  const selectedArt = form[`${mode}Mode`].art_selected;
  const anomalyIsUncommon = form.anomalyMode.uncommon;
  const characterCount = form.initialMode.prompt_art
    ? form.initialMode.prompt_art.length
    : 0;

  function getSelectedOptionName(
    sectionKey: string,
    optionId: number | null
  ): string | null {
    if (optionId === null) return null;
    const section = artPromptOptions[sectionKey];
    const option = section.options.find((opt) => opt.id === optionId);
    return option ? option.option : null;
  }

  const handleOptionClick = useCallback((section: string, optionId: number) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [section]: prev[section] === optionId ? null : optionId,
    }));
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        setTooltipContent(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Update art direction options
  useEffect(() => {
    const updatedArtOptions = Object.entries(selectedOptions)
      .filter(([_, value]) => value !== null)
      .map(([key, value]) => ({
        section: key,
        option: value as ArtPromptOptionType["id"],
      }));

    setValue(`${mode}Mode.art_direction_options`, updatedArtOptions);
  }, [selectedOptions, setValue, mode]);

  // Remove selected option from art direction options
  function handleBadgeClick(sectionKey: string) {
    setSelectedOptions((prev) => {
      const newOptions = { ...prev };
      delete newOptions[sectionKey];

      const updatedArtOptions = Object.entries(newOptions)
        .filter(([_, value]) => value !== null)
        .map(([key, value]) => ({
          section: key,
          option: value as ArtPromptOptionType["id"],
        }));

      setValue(`${mode}Mode.art_direction_options`, updatedArtOptions);

      return newOptions;
    });
  }

  // Generate art
  async function handleGenerateArt() {
    if (artOptions.length >= MAX_ART_GENERATIONS) {
      toast.error(
        `You've reached the maximum of ${MAX_ART_GENERATIONS} art generations for ${
          mode === "initial" ? "initial mode" : "anomaly mode"
        }.`
      );
      return;
    }

    setIsGenerating(true);
    toast("Generating art...");

    const basePrompt =
      "Rule of thirds, dynamic pose, digital art, fantasy, sci-fi.";
    const userPrompt = form[`${mode}Mode`].prompt_art;
    const artDirections = Object.values(selectedOptions)
      .filter(Boolean)
      .join(", ");
    const fullPrompt = `Motif: ${userPrompt}. Art direction: ${basePrompt} ${artDirections}`;

    try {
      const response = await fetch("/api/data/generate-art", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: fullPrompt }),
      });

      if (!response.ok) {
        toast.error("Art generation API call failed!");
        throw new Error("Art generation API call failed");
      }

      const { imageUrl } = await response.json();

      posthog.capture("art_generated", {
        imageUrl,
        artOptions,
        prompt,
        artDirections,
        fullPrompt,
      });
      toast.success("Art generated!");

      setValue(`${mode}Mode.art_options`, [...artOptions, imageUrl]);
      setValue(`${mode}Mode.art_selected`, artOptions.length);

      // Close sheet and hide overlay on successful art generation
      setIsSheetOpen(false);
      hideOverlay();
    } catch (error) {
      console.error("Error generating art:", error);
      toast.error("Art generation failed!");
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <Sheet
      open={isSheetOpen}
      onOpenChange={(open) => {
        if (!isGenerating) {
          setIsSheetOpen(open);
          open ? showOverlay() : hideOverlay();
        } else if (!open) {
          toast.error("Please wait until art generation is complete");
        }
      }}
    >
      <SheetTrigger
        disabled={isGenerating || (mode === "anomaly" && !anomalyIsUncommon)}
      >
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
              backdropFilter: "blur(1px)",
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
              {form.initialMode.art_options.length > 0
                ? "Update art"
                : "Generate art"}
            </p>
          </div>
          <div className="w-full h-full overflow-hidden">
            <Image
              src={
                !anomalyIsUncommon && mode === "anomaly"
                  ? "/images/default-art.jpg"
                  : artOptions[selectedArt] || "/images/default-art.jpg"
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
          <SheetTitle>Generate art</SheetTitle>
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
              name={
                mode === "initial"
                  ? "initialMode.prompt_art"
                  : "anomalyMode.prompt_art"
              }
              disabled={
                isGenerating || artOptions.length >= MAX_ART_GENERATIONS
              }
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="relative w-full">
                      <Textarea
                        placeholder="Write a prompt describing your card's art"
                        className={clsx("w-full h-[100px] pr-16 resize-none", {
                          "opacity-50": isGenerating,
                        })}
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
                className="w-full font-semibold"
                disabled={
                  isGenerating || artOptions.length >= MAX_ART_GENERATIONS
                }
              >
                {isGenerating ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </div>
                ) : (
                  "Generate art"
                )}
              </Button>
              <small className="flex items-center space-x-0.5 font-medium">
                <span
                  className={clsx("font-bold", {
                    "text-red-600": artOptions.length >= MAX_ART_GENERATIONS,
                    "text-red-500":
                      artOptions.length >= MAX_ART_GENERATIONS * 0.8,
                    "text-red-400":
                      artOptions.length >= MAX_ART_GENERATIONS * 0.6,
                  })}
                >
                  {artOptions.length}
                </span>
                <span className="opacity-40">/</span>
                <span className="font-semibold">{MAX_ART_GENERATIONS} </span>
                <span className="opacity-80 font-normal">
                  art generations used for{" "}
                  {mode === "initial" ? "initial mode" : "anomaly mode"}
                </span>
              </small>
            </div>
            {Object.keys(selectedOptions).length > 0 && (
              <div className="flex flex-wrap gap-1">
                {Object.entries(selectedOptions).map(
                  ([sectionKey, optionId]) => {
                    const optionName = getSelectedOptionName(
                      sectionKey,
                      optionId
                    );
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
                  }
                )}
              </div>
            )}
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
          {Object.entries(artPromptOptions).map(
            ([sectionKey, section], index, array) => {
              if (
                sectionKey === "framing" &&
                (!selectedOptions["subject"] ||
                  selectedOptions["subject"] === 1)
              ) {
                return null;
              }

              return (
                <div
                  key={sectionKey}
                  className={clsx("flex flex-col gap-2 w-full p-4", {
                    "border-b border-zinc-700": index !== array.length - 1,
                  })}
                >
                  <h4>{section.title}</h4>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {section.options.map((option: ArtPromptOptionType) => {
                      const BadgeComponent = (
                        <Badge
                          key={option.id}
                          variant={
                            selectedOptions[sectionKey] === option.id
                              ? "default"
                              : "outline"
                          }
                          className={clsx(
                            "font-normal cursor-pointer transition-colors duration-200",
                            selectedOptions[sectionKey] === option.id
                              ? "bg-primary text-primary-foreground"
                              : "bg-background",
                            "hover:bg-primary/90 hover:text-primary-foreground"
                          )}
                          onClick={() =>
                            handleOptionClick(sectionKey, option.id)
                          }
                          onMouseEnter={(e) => {
                            if (option.image) {
                              const rect =
                                e.currentTarget.getBoundingClientRect();
                              setTooltipContent(option.image);
                              setTooltipPosition({
                                x: rect.left - 210, // 200px width + 10px gap
                                y: rect.top,
                              });
                            }
                          }}
                          onMouseLeave={() => setTooltipContent(null)}
                        >
                          {option.option}
                        </Badge>
                      );

                      return BadgeComponent;
                    })}
                  </div>

                  {/* Custom Tooltip cause shadcn/ui tooltip doesn't work inside SheetContent */}
                  {tooltipContent && (
                    <div
                      ref={tooltipRef}
                      style={{
                        position: "fixed",
                        top: `${tooltipPosition.y}px`,
                        left: `${tooltipPosition.x}px`,
                        zIndex: 9999,
                      }}
                      className="
                      w-[200px]
                      h-[150px]
                      overflow-hidden 
                      border 
                      border-zinc-600 
                      shadow-md 
                      shadow-black/60
                      rounded-md
                    "
                    >
                      <Image
                        src={tooltipContent}
                        alt="Option preview"
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  )}
                </div>
              );
            }
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
