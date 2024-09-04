"use client"

import React, { useState } from 'react';
// Utils
import clsx from 'clsx';
// Components
import { Input } from "@/components/ui/input"
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
  const [inputValue, setInputValue] = useState('')
  const hasInput = reminder && (reminder.includes('[') || /\bN\b/.test(reminder))
  const inputType = reminder?.includes('[') ? 'text' : 'number'

  const reminderWords = reminder ? reminder.split(' ') : [];

  function handleInputClick(
    e: React.MouseEvent
  ) {
    e.stopPropagation();
  }

  function renderKeywordContent() {
    return (
      <>
        <span className={clsx(
          "font-bold",
          {
            "mr-1": !hasInput,
            "text-blue-700": type === "persistent",
            "text-green-700": type === "reactive",
            "text-yellow-700": type === "active",
          }
        )}>
          {keyword}{hasInput && (<span className="text-black">:</span>)}
        </span>
        {hasInput && (
          <Input
            type={inputType}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onClick={handleInputClick}
            maxLength={inputType === 'text' ? 20 : 2}
            placeholder={inputType === 'text' ? '...' : '0'}
            className={clsx(
              "flex flex-grow text-black bg-transparent border-none rounded-none p-0 h-4 mx-1 active:border-none active:outline-none",
              {
                "max-w-10": inputType === 'number',
                "max-w-40": inputType === 'text',
              }
            )}
          />
        )}
      </>
    )
  }

  return truncate ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span>
            {renderKeywordContent()}
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
            {renderKeywordContent()}
            <span className="font-normal text-black italic opacity-80">(</span>
              {reminderWords.map((word, index) => (
                <span 
                  key={index} 
                  className={`font-normal text-black italic opacity-80 ${index < reminderWords.length - 1 ? 'mr-1' : ''}`}
                >
                  {word}
                </span>
              ))}
            <span className="font-normal text-black italic opacity-80">).</span>
          </div>
        </TooltipTrigger>
        <TooltipContent side="top">
          Click to change keywords
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
    
  )
}