import React from "react";
// Components
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";

type CardsGalleryApprovedCheckboxProps = {
  approvedOnly: string;
  updateSearchParams: (key: string, value: string) => void;
};

export default function CardsGalleryApprovedCheckbox({
  approvedOnly,
  updateSearchParams,
}: CardsGalleryApprovedCheckboxProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div
            id="approved-only-container"
            className="
              flex
              flex-row
              justify-start
              items-center
              gap-2
            "
          >
            <small className="text-muted-foreground text-xs whitespace-nowrap">
              Approved
            </small>
            <Checkbox
              id="approved"
              checked={approvedOnly === "true"}
              onCheckedChange={(checked) => {
                updateSearchParams("approvedOnly", checked ? "true" : "false");
              }}
            />
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Only show approved cards.</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
