"use client";

import React, { useEffect, useState } from "react";
// Utils
import clsx from "clsx";
// Types
import { CardDTO, KeywordsDTO } from "@/app/lib/types/dto";
import { RenderedKeywordType } from "@/app/lib/types/components";
// Components
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
//Custom components
import AbbreviationIcon from "@/components/card-render/abbreviation-icon";

type CardRenderKeywordsProps = {
  keywords: RenderedKeywordType[];
  card: CardDTO;
  mode: "initial" | "anomaly";
};

export default function CardRenderKeywords({
  keywords,
  card,
  mode,
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

  function renderKeyword(keyword: RenderedKeywordType, showReminder: boolean) {
    const keywordInfo = keywordData.find((kw) => kw.name === keyword.name);
    if (!keywordInfo) return null;

    // Check if the keyword has text input or contains [N]
    const hasInput =
      Boolean(keyword.input) ||
      keywordInfo.syntax?.includes("[") ||
      /\bN\b/.test(keywordInfo.syntax || "");

    // Split the input text to find {abbreviations} or (parentheticals)
    // Replace ~ with card name in the input text
    const processedInput =
      keyword.input?.replace(
        /~/g,
        mode === "initial" ? card.initialMode.name : card.anomalyMode.name
      ) || "";
    const inputSegments = processedInput.split(/(\{[^}]+\}|\([^)]+\))/g);

    return (
      <TooltipProvider key={keyword.name}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="inline items-baseline">
              <span
                className={clsx("font-bold", {
                  "text-blue-700": keywordInfo.type === "persistent",
                  "text-amber-700": keywordInfo.type === "reactive",
                  "text-green-700": keywordInfo.type === "active",
                })}
              >
                {keyword.name}
                {hasInput && <span className="text-black font-medium">: </span>}
              </span>
              {hasInput && (
                <span className="text-black font-medium">
                  {inputSegments.map((segment, index) => {
                    // If it is an icon abbreviation, render the icon
                    const iconMatch = segment.match(/^\{([^}]+)\}$/);
                    if (iconMatch) {
                      const iconKey = iconMatch[1];
                      return <AbbreviationIcon key={index} iconKey={iconKey} />;
                    }

                    // If it is a parenthetical text, render the parenthetical text
                    const parentheticalMatch = segment.match(/^\(([^)]+)\)$/);
                    if (parentheticalMatch) {
                      return (
                        <span key={index} className="italic font-light">
                          ({parentheticalMatch[1]})
                        </span>
                      );
                    }

                    // Regular text segment
                    return <span key={index}>{segment}</span>;
                  })}
                </span>
              )}
              {keywordInfo.reminder && showReminder && (
                <span className="italic font-light">
                  {" "}
                  ({keywordInfo.reminder})
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
    return keywordInfo?.syntax?.includes("[");
  });

  const standardKeywords = keywords.filter((keyword) => {
    const keywordInfo = keywordData.find((kw) => kw.name === keyword.name);
    return !keywordInfo?.syntax?.includes("[");
  });

  return (
    <div className="w-full flex flex-col gap-1">
      {standardKeywords.length > 0 && (
        <div className="flex flex-row flex-wrap gap-1">
          {standardKeywords.length <= 2
            ? // Render with reminder text when 2 or fewer
              standardKeywords.map((keyword) => (
                <React.Fragment key={keyword.name}>
                  {renderKeyword(keyword, true)}
                </React.Fragment>
              ))
            : // Render as comma-separated list without reminder text when more than 2
              standardKeywords.map((keyword, index) => (
                <React.Fragment key={keyword.name}>
                  {renderKeyword(keyword, false)}
                  {index < standardKeywords.length - 1 && (
                    <span className="mr-1">,</span>
                  )}
                </React.Fragment>
              ))}
        </div>
      )}
      {textInputKeywords.map((keyword) => (
        <div key={keyword.name} className="w-full">
          {renderKeyword(keyword, true)}
        </div>
      ))}
    </div>
  );
}
