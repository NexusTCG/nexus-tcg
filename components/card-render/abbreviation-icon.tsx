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
            className="inline-block align-middle transition-all duration-100"
            style={{ marginLeft: "1px", marginRight: "1px" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {isHovered ? (
              <span className="text-xs font-mono font-semibold">{`{${iconKey}}`}</span>
            ) : (
              <Image
                src={icon.path}
                alt={icon.name}
                width={18}
                height={18}
                loading="eager"
                className="inline-block"
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
