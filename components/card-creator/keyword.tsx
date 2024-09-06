"use client"

import React, { useState, useEffect, useRef } from 'react';
import { useDebounce } from 'use-debounce';
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
  const [debouncedInputValue] = useDebounce(inputValue, 300);
  const [reminderWords, setReminderWords] = useState<string[]>([]);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const hasInput = reminder && (reminder.includes('[') || /\bN\b/.test(reminder))
  const inputType = reminder?.includes('[') ? 'text' : 'number'

  const [inputWidth, setInputWidth] = useState(0);
  const measureRef = useRef<HTMLSpanElement>(null);

  function adjustInputWidth() {
    if (measureRef.current) {
      const newWidth = Math.min(measureRef.current.offsetWidth + 5, 160);
      setInputWidth(newWidth);
    }
  }

  function handleInputClick(
    e: React.MouseEvent
  ) {
    e.stopPropagation();
  }

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const value = e.target.value;
    if (inputType === 'number') {
      if (value === '' || /^\d+$/.test(value)) {
        setInputValue(value);
      }
    } else {
      setInputValue(value);
    }
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
          <>
            <span 
              ref={measureRef} 
              className="invisible absolute whitespace-pre"
              style={{
                fontFamily: 'inherit',
                fontSize: 'inherit',
                fontWeight: inputType === 'number' ? 'bold' : 'normal',
              }}
            >
              {inputValue || (inputType === 'text' ? '[...]' : '0')}
            </span>
            <Input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onClick={handleInputClick}
              maxLength={inputType === 'text' ? 20 : 2}
              placeholder={inputType === 'text' ? "[...]" : '0'}
              style={{ width: `${inputWidth}px` }}
              className={clsx(
                "flex-inline text-black text-normal opacity-80 bg-transparent border-none rounded-none p-0 h-4 ml-1",
                "keyword-input",
                {
                  "max-w-[18px] mr-0.25 font-bold": inputType === 'number',
                  "max-w-[160px] font-semibold": inputType === 'text',
                },
              )}
            />
          </>
        )}
      </>
    )
  }

  useEffect(() => {
    if (reminder) {
      const words = reminder.split(' ');
      const updatedWords = words.map(word => {
        if (word === 'N' || word.startsWith('[')) {
          return debouncedInputValue || word;
        }
        return word;
      });
      setReminderWords(updatedWords);
    }
  }, [
    reminder, 
    debouncedInputValue
  ]);

  useEffect(() => {
    adjustInputWidth();
  }, [inputValue, inputType]);

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
                  {word === 'N' || word.startsWith('[') ? inputValue || word : word}
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