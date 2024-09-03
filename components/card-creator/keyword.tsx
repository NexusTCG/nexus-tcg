import React from 'react';
// Utils
import clsx from 'clsx';
// Components
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip"

type KeywordProps = {
  keyword: string;
  reminder: string | null;
  truncate: boolean;
  type: "persistent" | "reactive" | "active" | null;
}

export default function Keyword({ 
  keyword, 
  reminder,
  truncate,
  type 
}: KeywordProps) {

  return truncate ? (
    <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <p className={clsx("font-medium",
                  {
                    "text-blue-500": type === "persistent",
                    "text-green-500": type === "reactive",
                    "text-yellow-500": type === "active",
                  }
                )}>
                  {keyword}
                </p>
              </span>
            </TooltipTrigger>
            <TooltipContent side="top">
              <i className="text-sm font-light">
                {reminder}
              </i>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
    
  ) : (
    <span className="inline-block">
      <span className={clsx("font-medium",
        {
          "text-blue-500": type === "persistent",
          "text-green-500": type === "reactive",
          "text-yellow-500": type === "active",
        }
      )}>
        {keyword}
      </span>
      {reminder && (
        <span className="text-sm font-light ml-1">
          ({reminder})
        </span>
      )}
    </span>
  )
}