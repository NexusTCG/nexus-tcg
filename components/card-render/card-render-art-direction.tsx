import React from 'react';
// Utils
import { cn } from "@/lib/utils";
// Types
import { CardDTO } from "@/app/lib/types/dto";
import { InitialCardType, AnomalyCardType, ArtDirectionOption } from "@/app/lib/types/database";
import { ArtPromptOptionsType } from "@/app/lib/types/components";
// Data
import { artPromptOptions } from "@/app/lib/data/components";
// Components
import { Badge } from "@/components/ui/badge";

interface CardRenderArtDirectionProps {
  card: CardDTO;
  activeMode: "initial" | "anomaly";
}

export default function CardRenderArtDirection({ 
  card, 
  activeMode 
}: CardRenderArtDirectionProps) {
  const artDirectionOptions = (
    card[`${activeMode.toLowerCase()}Mode` as keyof CardDTO] as InitialCardType | AnomalyCardType
  )?.art_direction_options;
  
  console.log(`Art Direction Options (${activeMode} mode):`, artDirectionOptions);

  if (!artDirectionOptions) return null;

  let options: ArtDirectionOption[] = [];

  try {
    if (typeof artDirectionOptions === 'string') {
      options = JSON.parse(artDirectionOptions);
    } else if (Array.isArray(artDirectionOptions)) {
      options = artDirectionOptions;
    } else if (typeof artDirectionOptions === 'object') {
      options = Object
        .entries(artDirectionOptions)
        .map(([section, option]) => ({ 
          section, 
          option: Number(option) 
        }));
    }
  } catch (e) {
    console.error('Failed to parse art_direction_options:', e);
    return null;
  }

  console.log('Parsed options:', options);

  if (options.length === 0) return null;

  return (
    <div
      className="
        flex
        flex-col
        justify-start
        items-start
        w-full
        gap-2
      "
    >
      <p className="text-sm opacity-80">
        {
          activeMode.toLowerCase() === "initial" 
            ? "Initial" 
            : "Anomaly"
        } mode art style options
      </p>
      <div
        className="
          flex
          flex-row
          flex-wrap
          justify-start
          items-start
          gap-2
        "
      >
        {options.map((
          option: ArtDirectionOption, 
          index: number
        ) => {
          const sectionOptions = artPromptOptions[
              option.section as keyof ArtPromptOptionsType
            ]?.options;
          const optionName = sectionOptions?.find(
              opt => opt.id === option.option
            )?.option;
          return optionName ? (
            <Badge
              key={index}
              variant="secondary"
              className={cn(
                "font-light",
                "transition-none hover:bg-secondary hover:text-secondary-foreground"
              )}
            >
              {optionName}
            </Badge>
          ) : null;
        })}
      </div>
    </div>
  );
}