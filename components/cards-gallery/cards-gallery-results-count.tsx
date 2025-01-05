import React from "react";
// Components
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type CardsGalleryResultsCountProps = {
  totalResults: number;
};

export default function CardsGalleryResultsCount({
  totalResults,
}: CardsGalleryResultsCountProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <small className="text-xs whitespace-nowrap">
            <span className="text-muted-foreground">Cards:</span> {totalResults}
          </small>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Showing {totalResults} cards.</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
