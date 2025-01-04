import React from "react";
// Types
import { CardDTO } from "@/app/lib/types/dto";
import { InitialCardType, AnomalyCardType } from "@/app/lib/types/database";
// Components
import { Badge } from "@/components/ui/badge";

interface CardRenderArtDirectionProps {
  card: CardDTO;
  activeMode: "initial" | "anomaly";
}

export default function CardRenderArtDirection({
  card,
  activeMode,
}: CardRenderArtDirectionProps) {
  const artDirectionOptions = (
    card[`${activeMode.toLowerCase()}Mode` as keyof CardDTO] as
      | InitialCardType
      | AnomalyCardType
  )?.art_direction_options;
  if (!artDirectionOptions) return null;

  // Validate art_direction_options is a string[]
  if (
    !Array.isArray(artDirectionOptions) ||
    typeof artDirectionOptions[0] === "object"
  ) {
    console.warn("Unexpected art_direction_options type received");
    return null;
  }

  const options = artDirectionOptions as string[];
  if (!options.length) return null;

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
        {activeMode.toLowerCase() === "initial" ? "Initial" : "Anomaly"} mode
        art style options
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
        {options.map((option: string, index: number) => (
          <Badge key={index} variant="secondary">
            {option}
          </Badge>
        ))}
      </div>
    </div>
  );
}
