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
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip"

import { Button } from "@/components/ui/button"
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
  const { fields, append, remove } = useFieldArray({
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

  function handleKeywordSelect(
    keyword: string
  ) {
    if (selectedKeywords.length < maxKeywords) {
      if (
        !selectedKeywords
          .some((
            kw: { id: string }
          ) => kw.id === keyword)
        ) {
        append({ id: keyword });
      }
    }
  }

  function handleRemoveKeyword(
    keyword: string
  ) {
    remove(
      selectedKeywords
        .findIndex((
          kw: { id: string }
        ) => kw.id === keyword)
      );
  }

  function renderKeyword(
    keyword: string
  ) {
    const keywordData = keywords?.find((
        kw: KeywordsDTO
      ) => kw.name === keyword
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

  // TODO: Prevent keywords to be fetched on every render

  // Fetch keywords from Supabase
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
          arian-expanded={open}
          className="
            flex
            flex-wrap 
            justify-start
            items-start
            w-full
            bg-transparent hover:bg-transparent text-black hover:text-black"
        >
          {selectedKeywords.length > 0 ? (
            <div className="flex flex-wrap w-full gap-2">
              {(
                selectedKeywords.length > 2 
                  ? selectedKeywords.slice(0, 2) 
                  : selectedKeywords).map((
                    keyword: { id: string }, 
                    index: number
                  ) => (
                <span key={index}>
                  {renderKeyword(keyword.id)}
                  </span>
              ))}
              {selectedKeywords.length > 2 && <span>...</span>}
            </div>
          ) : (
            <span className="flex justify-start items-center px-2 py-1 hover:bg-neutral-200 rounded-sm w-full">"Select keywords..."</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[312px] p-0">
        <Command>
          <CommandInput placeholder="Search keywords..." />
          <CommandList>
            <CommandEmpty>No keyword found.</CommandEmpty>
            {["persistent", "reactive", "active"].map((type) => (
              <CommandGroup
                key={type}
                heading={type.charAt(0).toUpperCase() + type.slice(1)}
              >
                {keywords
                  ?.filter((keyword: KeywordsDTO) => keyword.type === type)
                  .map((keyword: KeywordsDTO) => (
                  <CommandItem
                    key={keyword.id}
                    value={keyword.name || ''}
                    onSelect={() => handleKeywordSelect(keyword.name || '')}
                    disabled={selectedKeywords.length >= maxKeywords}
                  >
                    <div className={clsx(
                      "flex flex-row justify-start items-start gap-2 w-full",
                      {
                        "text-blue-500": type === "persistent",
                        "text-orange-500": type === "reactive",
                        "text-emerald-500": type === "active",
                      }
                    )}>
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
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
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}