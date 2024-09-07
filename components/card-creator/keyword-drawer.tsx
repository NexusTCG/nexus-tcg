// Remove component?

"use client";

// Hooks
import React, { useState, useEffect } from "react";
import { useFormContext, useFieldArray } from 'react-hook-form';
// Types
import { KeywordsDTO } from "@/app/lib/types/dto";
// Components 
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Badge } from "@/components/ui/badge";
// Custom components
import Keyword from "@/components/card-creator/keyword";

type KeywordDrawerProps = {
  cardGrade: "core" | "uncommon" | "epic" | "prime";
  truncateKeywords: boolean;
}

export default function KeywordDrawer({
  cardGrade,
  truncateKeywords,
}: KeywordDrawerProps) {
  const [keywords, setKeywords] = useState<KeywordsDTO[] | null>(null);
  const [open, setOpen] = useState(false);

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

  function handleKeywordToggle(keyword: string) {
    const index = selectedKeywords.findIndex((kw: { id: string }) => kw.id === keyword);
    if (index > -1) {
      remove(index);
    } else if (selectedKeywords.length < maxKeywords) {
      append({ id: keyword });
    }
  }

  function renderKeyword(keyword: string) {
    const keywordData = keywords?.find((kw: KeywordsDTO) => kw.name === keyword);
    if (!keywordData) return keyword;

    return (
      <Keyword
        keyword={keyword}
        reminder={keywordData.reminder}
        truncate={truncateKeywords}
        type={keywordData.type}
      />
    );
  }

  function renderSelectedKeywords() {
    if (truncateKeywords) {
      return selectedKeywords.map((keyword: { id: string }, index: number) => (
        <React.Fragment key={keyword.id}>
          {renderKeyword(keyword.id)}
          {index < selectedKeywords.length - 1 && <span className="mr-1">,</span>}
        </React.Fragment>
      ));
    } else {
      return selectedKeywords.map((keyword: { id: string }) => (
        <div key={keyword.id} className="w-full">
          {renderKeyword(keyword.id)}
        </div>
      ));
    }
  }

  useEffect(() => {
    async function fetchKeywords() {
      if (keywords) return;

      try {
        const response = await fetch('/api/data/fetch-keywords');
        if (!response.ok) {
          throw new Error('Failed to fetch keywords');
        }
        const data = await response.json();
        setKeywords(data);
      } catch (error) {
        console.error('Error fetching keywords:', error);
      }
    }
    fetchKeywords();
  }, []);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          className="w-full bg-transparent hover:bg-transparent text-black hover:text-black rounded-none p-0 min-h-[20px] h-auto"
        >
          {selectedKeywords.length > 0 ? (
            <div className={`w-full ${truncateKeywords ? "flex flex-row flex-wrap" : "space-y-1"}`}>
              {renderSelectedKeywords()}
            </div>
          ) : (
            <span className="h-[24px] flex justify-start items-center hover:bg-neutral-200 rounded-sm w-full p-1 hover:text-neutral-800">
              Select keywords...
            </span>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="p-4 max-h-[80vh] overflow-y-auto">
          <h3 className="text-lg font-semibold mb-4">Select Keywords</h3>
          {["persistent", "reactive", "active"].map((type) => (
            <div key={type} className="mb-6">
              <h4 className="text-md font-medium mb-2 capitalize">{type}</h4>
              <div className="flex flex-wrap gap-2">
                {keywords
                  ?.filter((keyword: KeywordsDTO) => keyword.type === type)
                  .map((keyword: KeywordsDTO) => {
                    const isSelected = selectedKeywords.some((kw: { id: string }) => kw.id === keyword.name);
                    return (
                      // TODO: Add tooltip to each badge
                      // TODO: Move cardform up when drawer is open to make it visible
                      <Badge
                        key={keyword.id}
                        variant={isSelected ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => handleKeywordToggle(keyword.name || '')}
                      >
                        {keyword.name}
                      </Badge>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
}