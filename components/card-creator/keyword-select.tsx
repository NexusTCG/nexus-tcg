"use client";

// Hooks
import React, { useState, useEffect} from "react";
import { useFormContext, useFieldArray } from 'react-hook-form';
// Utils
import { cn } from "@/lib/utils"
import clsx from "clsx"
// Validation
import { KeywordsDTO } from "@/app/lib/types/dto";
// Components
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip"
// Custom components
import Keyword from "@/components/card-creator/keyword"
// Icons
import { Check } from "lucide-react"

type KeywordSelectProps = {
  cardGrade: "core" | "uncommon" | "epic" | "prime";
  truncateKeywords: boolean;
}

export default function KeywordSelect({
  cardGrade,
  truncateKeywords,
}: KeywordSelectProps) {
  const [open, setOpen] = useState(false)
  const [keywords, setKeywords] = useState<KeywordsDTO[] | null>(null);

  const { control, watch } = useFormContext();
  const { append, remove } = useFieldArray({
    control,
    name: "initialMode.keywords"
  });

  const selectedKeywords = watch("initialMode.keywords");

  const maxKeywords = {
    core: 2,
    uncommon: 3,
    epic: 4,
    prime: 4
  }[cardGrade];

  function handleKeywordToggle(
    keyword: string
  ) {
    const index = selectedKeywords
      .findIndex(
        (kw: { id: string }) => kw.id === keyword
      );
    if (index > -1) {
      // Remove if: Keyword is already selected
      remove(index);
    } else if (selectedKeywords.length < maxKeywords) {
      // Add if: Keyword not selected, and max not reached
      append({ id: keyword });
    }
  }

  function renderKeyword(
    keyword: string
  ) {
    const keywordData = keywords?.find(
      (kw: KeywordsDTO) => kw.name === keyword
    );
    if (!keywordData) return keyword;

    return (
      <Keyword
        keyword={keyword}
        reminder={keywordData.reminder}
        truncate={truncateKeywords}
        type={keywordData.type}
      />
    )
  }

  function renderKeywords() {
    if (truncateKeywords) {
      return selectedKeywords.map((
        keyword: { id: string }, 
        index: number
      ) => (
        <React.Fragment key={keyword.id}>
          {renderKeyword(keyword.id)}
          {index < selectedKeywords.length - 1 && <span className="mr-1">,</span>}
        </React.Fragment>
      ));
    } else {
      return selectedKeywords.map((
        keyword: { id: string }
      ) => (
        <div key={keyword.id} className="w-full">
          {renderKeyword(keyword.id)}
        </div>
      ));
    }
  }

  // TODO: Prevent keywords to be fetched on every render
  useEffect(() => {
    if (keywords) return;

    async function fetchKeywords() {
      try {
        const response = await fetch('/api/data/fetch-keywords');

        if (!response.ok) {
          throw new Error('Failed to fetch keywords');
        }

        const data = await response.json();
        setKeywords(data);

      } catch (error) {
        console.error(
          'Error fetching keywords:', 
          error
        );
      }
    }
    fetchKeywords();
  }, []);

  // TODO: Implement keyword deselect functionality
  // TODO: Fix keywords expanding past container bounds
  // TODO: Render selectedKeywords based on keyword name instead of id
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="
            flex
            flex-col 
            justify-start
            items-start
            w-full
            bg-transparent 
            hover:bg-transparent 
            text-black 
            hover:text-black
            rounded-none
            overflow-hidden
            p-0
            min-h-[20px]
            h-auto
          "
        >
          {selectedKeywords.length > 0 ? (
            <div className={clsx(
              "w-full",
              truncateKeywords ? "flex flex-row flex-wrap" : "space-y-1"
            )}>
              {renderKeywords()}
            </div>
          ) : (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="flex justify-start items-center hover:bg-neutral-200 rounded-sm w-full p-1 hover:text-neutral-800">
                    Select keywords...
                  </span>
                </TooltipTrigger>
                <TooltipContent side="top">
                  Click to add keywords
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[312px] h-[260px] p-0">
        <Command>
          <CommandInput placeholder="Search keywords..." />
          <CommandList>
            <CommandEmpty>No keyword found.</CommandEmpty>
            {["persistent", "reactive", "active"].map((type) => (
              <CommandGroup
                key={type}
                heading={type.charAt(0).toUpperCase() + type.slice(1)}
              >
                <>
                <Separator />
                {keywords
                  ?.filter((keyword: KeywordsDTO) => keyword.type === type)
                  .map((keyword: KeywordsDTO) => {
                    const isSelected = selectedKeywords.some(
                      (kw: { id: string }) => kw.id === keyword.name
                    );
                    return (
                  <CommandItem
                    key={keyword.id}
                    value={keyword.name || ''}
                    onSelect={
                      () => handleKeywordToggle(keyword.name || '')
                    }
                    disabled={
                      !isSelected && 
                      selectedKeywords.length >= maxKeywords
                    }
                  >
                    <div className={clsx(
                      "flex flex-row justify-start items-start gap-2 w-full cursor-pointer",
                      {
                        "text-blue-500": type === "persistent",
                        "text-orange-500": type === "reactive",
                        "text-emerald-500": type === "active",
                      }
                    )}>
                      <Check
                        className={cn(
                          "mr-2 h-[20px] w-[20px]",
                          selectedKeywords.some((
                            kw: { id: string }
                          ) => kw.id === keyword.name) 
                            ? "opacity-100" 
                            : "opacity-0"
                        )}
                      />
                      <div className="flex flex-col justify-start items-start w-full gap-0">
                        <p className="font-semibold">
                          {keyword.name}
                        </p>
                        <p className="italic text-xs opacity-80 text-white">
                          {keyword.reminder}
                        </p>
                      </div>
                    </div>
                    </CommandItem>
                    );
                  })}
                </>
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}