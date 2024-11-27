"use client";

import React, { useEffect, useState } from "react";
// Utils
import clsx from "clsx";
// Types
import { KeywordsDTO } from "@/app/lib/types/dto";
import { RenderedKeywordType } from "@/app/lib/types/components";
// Components
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type CardRenderKeywordsProps = {
  keywords: RenderedKeywordType[];
};

export default function CardRenderKeywords({
  keywords,
}: CardRenderKeywordsProps) {
  const [keywordData, setKeywordData] = useState<KeywordsDTO[]>([]);

  useEffect(() => {
    async function fetchKeywordData() {
      try {
        const response = await fetch("/api/data/fetch-keywords");
        if (!response.ok) throw new Error("Failed to fetch keywords");
        const data = await response.json();
        setKeywordData(data);
      } catch (error) {
        console.error("Error fetching keywords:", error);
      }
    }
    fetchKeywordData();
  }, []);

  function renderKeyword(keyword: RenderedKeywordType) {
    const keywordInfo = keywordData.find((kw) => kw.name === keyword.name);
    if (!keywordInfo) return null;

    const hasInput =
      keywordInfo.reminder?.includes("[") ||
      /\bN\b/.test(keywordInfo.reminder || "");

    return (
      <TooltipProvider key={keyword.name}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="inline-flex items-baseline">
              <span
                className={clsx("font-bold", {
                  "mr-1": !hasInput,
                  "text-blue-700": keywordInfo.type === "persistent",
                  "text-green-700": keywordInfo.type === "reactive",
                  "text-yellow-700": keywordInfo.type === "active",
                })}
              >
                {keyword.name}
                {hasInput && <span className="text-black">:</span>}
              </span>
              {hasInput && (
                <span className="text-black font-semibold ml-1">
                  {keyword.input ||
                    (keywordInfo.reminder?.includes("[") ? "[...]" : "0")}
                </span>
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            className="max-w-[200px] text-wrap break-words"
          >
            <p className="text-xs italic">{keywordInfo.reminder}</p>
            {keywordInfo.tip && (
              <p className="text-xs mt-1 opacity-80">{keywordInfo.tip}</p>
            )}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  // Filter keywords into text input and standard keywords
  const textInputKeywords = keywords.filter((keyword) => {
    const keywordInfo = keywordData.find((kw) => kw.name === keyword.name);
    return keywordInfo?.reminder?.includes("[");
  });

  const standardKeywords = keywords.filter((keyword) => {
    const keywordInfo = keywordData.find((kw) => kw.name === keyword.name);
    return !keywordInfo?.reminder?.includes("[");
  });

  return (
    <div className="w-full flex flex-col gap-1">
      {standardKeywords.length > 0 && (
        <div className="flex flex-row flex-wrap gap-1">
          {standardKeywords.map((keyword, index) => (
            <React.Fragment key={keyword.name}>
              {renderKeyword(keyword)}
              {index < standardKeywords.length - 1 && (
                <span className="mr-1">,</span>
              )}
            </React.Fragment>
          ))}
        </div>
      )}
      {textInputKeywords.map((keyword) => (
        <div key={keyword.name} className="w-full">
          {renderKeyword(keyword)}
        </div>
      ))}
    </div>
  );
}
