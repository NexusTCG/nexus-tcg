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

  const reminderWords = reminder ? reminder.split(' ') : [];

  return truncate ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span>
            <p className={clsx(
              "font-semibold",
                {
                  "text-blue-700 hover:text-blue-500": type === "persistent",
                  "text-green-700 hover:text-green-500": type === "reactive",
                  "text-yellow-700 hover:text-yellow-500": type === "active",
                }
              )}
            >
              {keyword}
            </p>
          </span>
        </TooltipTrigger>
        <TooltipContent 
          side="top" 
          align="center"
          className="max-w-[160px] text-wrap break-words text-left"
        >
          <i className={clsx(
              "text-xs",
                {
                  "text-blue-500": type === "persistent",
                  "text-green-500": type === "reactive",
                  "text-yellow-500": type === "active",
                }
              )}
          >
            {reminder}
          </i>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="w-full inline-flex flex-wrap items-baseline space-y-0">
            <span className={clsx(
              "font-bold mr-1",
              {
                "text-blue-700": type === "persistent",
                "text-green-700": type === "reactive",
                "text-yellow-700": type === "active",
              }
            )}>
              {keyword}
            </span>
            {reminder && (
              <>
                <span className="font-normal text-black italic opacity-80">(</span>
                {reminderWords.map((word, index) => (
                  <React.Fragment key={index}>
                    <span className="font-normal text-black italic opacity-80">{word}</span>
                    {index < reminderWords.length - 1 && (
                      <span className="font-normal text-black italic mr-1 opacity-80">{" "}</span>
                    )}
                  </React.Fragment>
                ))}
                <span className="font-normal text-black italic  opacity-80">).</span>
              </>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent side="top">
          Click to change keywords
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
    
  )
}