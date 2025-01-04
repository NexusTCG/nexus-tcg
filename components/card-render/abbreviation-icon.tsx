import React from "react";
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
          >
            <Image
              src={icon.path}
              alt={icon.name}
              fill
              loading="eager"
              data-testid={`abbreviation-icon-${iconKey}`}
              style={{
                objectFit: "contain",
              }}
            />
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p>{icon.name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
