"use client";

import React, { useEffect, useState } from "react";
// Utils
import clsx from "clsx";
// Types
import { CardDTO, KeywordDTO, KeywordsDTO } from "@/app/lib/types/dto";
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
  truncateKeywords: boolean;
};

export default function CardRenderKeywords({
  keywords,
  card,
  mode,
  truncateKeywords,
}: CardRenderKeywordsProps) {
  const [keywordData, setKeywordData] = useState<KeywordsDTO>([]);

  function renderTextSegment(text: string) {
    // Split for abbreviations and process them
    return text.split(/(\{[^}]+\})/g).map((part, index) => {
      const iconMatch = part.match(/^\{([^}]+)\}$/);
      if (iconMatch) {
        return <AbbreviationIcon key={index} iconKey={iconMatch[1]} />;
      }
      return <span key={index}>{part}</span>;
    });
  }

  function renderKeyword(
    keyword: RenderedKeywordType,
    showReminder: boolean,
    index?: number
  ) {
    const keywordInfo = keywordData.find(
      (kw: KeywordDTO) => kw.name === keyword.name
    );
    if (!keywordInfo) return null;

    // Check if the keyword has text input or contains [N]
    const hasInput =
      Boolean(keyword.input) ||
      keywordInfo.syntax?.includes("[") ||
      /\bN\b/.test(keywordInfo.syntax || "");

    // Replace ~ with card name in the input text
    const processedInput =
      keyword.input?.replace(
        /~/g,
        mode === "initial" ? card.initialMode.name : card.anomalyMode.name
      ) || "";

    let renderKeywordsWithLowerCase = false;
    if (index && index > 0 && !showReminder) {
      renderKeywordsWithLowerCase = true;
    }

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
                {renderKeywordsWithLowerCase
                  ? keyword.name.toLowerCase()
                  : keyword.name}
                {hasInput && <span className="text-black font-medium">: </span>}
              </span>
              {hasInput && (
                <span className="text-black font-medium">
                  {processedInput
                    .split(/("(?:[^"\\]|\\.)*")/g)
                    .filter(Boolean)
                    .map((segment, segmentIndex) => {
                      // If this is a quoted segment
                      if (segment.startsWith('"') && segment.endsWith('"')) {
                        return <span key={segmentIndex}>{segment}</span>;
                      }

                      // For non-quoted text, process for parentheticals first
                      return segment
                        .split(/(\([^)]+\))/g)
                        .map((subSegment, subIndex) => {
                          // If it's a parenthetical
                          const parentheticalMatch =
                            subSegment.match(/^\(([^)]+)\)$/);
                          if (parentheticalMatch) {
                            return (
                              <span
                                key={`${segmentIndex}-${subIndex}`}
                                className="italic font-normal"
                              >
                                ({renderTextSegment(parentheticalMatch[1])})
                              </span>
                            );
                          }

                          // Regular text (may still contain abbreviations)
                          return (
                            <span key={`${segmentIndex}-${subIndex}`}>
                              {renderTextSegment(subSegment)}
                            </span>
                          );
                        });
                    })}
                </span>
              )}
              {keywordInfo.reminder && showReminder && (
                <span className="italic font-normal">
                  {" "}
                  ({keywordInfo.reminder}).
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

  // Fetch keyword data to get reminder text
  useEffect(() => {
    if (keywordData.length > 0) return;
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

  return (
    <div className="w-full flex flex-col gap-1">
      {standardKeywords.length > 0 && (
        <div
          className={clsx("flex flex-row flex-wrap", {
            "gap-1": !truncateKeywords,
          })}
        >
          {standardKeywords.map((keyword, index) => (
            <React.Fragment key={keyword.name}>
              {renderKeyword(keyword, !truncateKeywords, index)}
              {truncateKeywords && index < standardKeywords.length - 1 && (
                <span>, </span>
              )}
            </React.Fragment>
          ))}
        </div>
      )}
      {textInputKeywords.map((keyword) => (
        <div key={keyword.name} className="w-full">
          {renderKeyword(keyword, !truncateKeywords)}
        </div>
      ))}
    </div>
  );
}
