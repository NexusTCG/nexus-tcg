"use client";

import React, { useState } from "react";
// Utils
import Image from "next/image";
// Components
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
// Data
import { abbreviationIcons } from "@/app/lib/data/icons";

export default function AbbreviationIcon({ iconKey }: { iconKey: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const icon = abbreviationIcons[iconKey as keyof typeof abbreviationIcons];
  if (!icon) {
    return <span>{`{${iconKey}}`}</span>;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            style={{
              position: "relative",
              width: "18px",
              height: "18px",
              display: "inline-block",
              margin: "0 1px",
              verticalAlign: "middle",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {isHovered ? (
              <span className="text-xs font-mono font-semibold">{`{${iconKey}}`}</span>
            ) : (
              <Image
                src={icon.icon}
                alt={icon.name}
                fill
                loading="eager"
                data-testid={`abbreviation-icon-${iconKey}`}
                style={{
                  objectFit: "contain",
                  visibility: "visible",
                }}
              />
            )}
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p>{icon.name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
