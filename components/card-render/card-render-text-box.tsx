"use client";

import React, { useState, useEffect, useMemo } from "react";
// Utils
import clsx from "clsx";
import { calculateBgColor } from "@/app/utils/actions/actions";
// Types
import { CardDTO } from "@/app/lib/types/dto";
import { EnergyCost } from "@/app/lib/types/components";
import { RenderedKeywordsType } from "@/app/lib/types/components";
// Validation
import { KeywordDTO, KeywordsDTO } from "@/app/lib/types/dto";
// Custom components
import CardRenderKeywords from "@/components/card-render/card-render-keywords";
import AbbreviationIcon from "@/components/card-render/abbreviation-icon";

const MAX_COMBINED_TEXT_LENGTH = 300;

type CardRenderTextBoxProps = {
  card: CardDTO;
  mode: "initial" | "anomaly";
};

export default function CardRenderTextBox({
  card,
  mode,
}: CardRenderTextBoxProps) {
  const [keywordData, setKeywordData] = useState<KeywordsDTO | null>(null);
  const [showLore, setShowLore] = useState<boolean>(true);

  const cardKeywords: RenderedKeywordsType =
    mode === "initial" ? card.initialMode.keywords : null;

  const cardText = (() => {
    // Replace ~ with card name
    if (mode === "initial") {
      return card.initialMode.text?.replace(/~/g, card.initialMode.name) ?? "";
    }
    if (card.anomalyMode.uncommon) {
      return card.anomalyMode.text?.replace(/~/g, card.anomalyMode.name) ?? "";
    }
    return "Destructed into any of the five common anomalies. Light, Storm, Dark, Chaos, or Growth.";
  })();

  const cardLoreText =
    mode === "initial"
      ? card.initialMode.lore
      : card.anomalyMode.uncommon
      ? card.anomalyMode.lore
      : null;

  const bgColorClass50 =
    mode === "anomaly"
      ? null
      : calculateBgColor(card.initialMode.energy_cost as EnergyCost, 50)[0];
  const bgColorClass200 =
    mode === "anomaly"
      ? null
      : calculateBgColor(card.initialMode.energy_cost as EnergyCost, 200)[0];

  // Split card text into paragraphs
  const paragraphs = cardText.split(/\n+/).filter(Boolean);

  // Render the keywords below the text if the card
  // is a "Software Modification" or "Hardware Gear"
  const renderBelowText =
    mode === "initial" &&
    ((card.initialMode.type === "software" &&
      card.initialMode.type_sub?.includes("Modification")) ||
      (card.initialMode.type === "hardware" &&
        card.initialMode.type_sub?.includes("Gear")));

  // Memoize the truncation logic
  const { truncateContent, shouldShowLore } = useMemo(() => {
    if (!cardKeywords || !keywordData) {
      return { truncateContent: false, shouldShowLore: true };
    }

    const keywordsReminderText = cardKeywords
      .map((keyword) => {
        const reminderText =
          keywordData?.find((kw: KeywordDTO) => kw.name === keyword.name)
            ?.reminder || "";
        return reminderText;
      })
      .join("");

    const keywordsNameText = cardKeywords
      .map((keyword) => {
        const nameText =
          keywordData?.find((kw: KeywordDTO) => kw.name === keyword.name)
            ?.name || "";
        return nameText;
      })
      .join("");

    const totalLengthWithNameReminders =
      cardText.length + keywordsNameText.length + keywordsReminderText.length;

    const totalLengthWithoutReminders =
      cardText.length + keywordsNameText.length;

    const shouldTruncate =
      totalLengthWithNameReminders > MAX_COMBINED_TEXT_LENGTH;
    const showLore =
      !shouldTruncate ||
      totalLengthWithoutReminders <= MAX_COMBINED_TEXT_LENGTH;

    return { truncateContent: shouldTruncate, shouldShowLore: showLore };
  }, [cardKeywords, keywordData, cardText]);

  // Update the showLore shouldShowLore changes
  useEffect(() => {
    setShowLore(shouldShowLore);
  }, [shouldShowLore]);

  // Fetch keyword data to get reminder text
  useEffect(() => {
    async function fetchKeywords() {
      if (keywordData) return;

      try {
        const response = await fetch("/api/data/fetch-keywords");

        if (!response.ok) {
          throw new Error("Failed to fetch keywords");
        }

        const data: KeywordsDTO = await response.json();
        setKeywordData(data);
      } catch (error) {
        console.error("Error fetching keywords:", error);
      }
    }
    fetchKeywords();
  }, []);

  return (
    <div
      id="card-form-text-container"
      style={{ fontSize: "0.85rem" }}
      className={clsx(
        "flex flex-col justify-between items-start",
        "w-full h-full px-2 pt-1.5 pb-2.5 gap-1",
        "border border-b-2 resize-none text-black",
        bgColorClass50 || "bg-neutral-50"
      )}
    >
      <div
        id="card-keywords-text-container"
        className={clsx(
          "flex flex-col justify-start items-start w-full",
          renderBelowText ? "gap-0" : "gap-1"
        )}
      >
        {/* If the card's subtype is not "Modification" or "Gear", render the keywords above the text */}
        {cardKeywords && !renderBelowText && (
          <div className="flex-shrink-0">
            <CardRenderKeywords
              card={card}
              mode={mode}
              keywords={cardKeywords}
              truncateKeywords={truncateContent}
            />
          </div>
        )}
        {/* Render the card text */}
        <div className="flex-grow w-full overflow-hidden font-medium">
          <div className="inline">
            {paragraphs.map((paragraph, paragraphIndex) => {
              const segments = paragraph
                .split(/("(?:[^"\\]|\\.)*")/g)
                .filter(Boolean);

              return (
                <div key={paragraphIndex} className="mb-1">
                  {segments.map((segment, segmentIndex) => {
                    // If this is a quoted segment (starts and ends with ")
                    if (segment.startsWith('"') && segment.endsWith('"')) {
                      // Process the quoted text as a single unit
                      return <span key={segmentIndex}>{segment}</span>;
                    }

                    // For non-quoted text, process for abbreviations and parentheticals
                    const subSegments = segment.split(/(\{[^}]+\}|\([^)]+\))/g);
                    return subSegments.map((subSegment, subIndex) => {
                      // If it is an icon abbreviation, render the icon
                      const iconMatch = subSegment.match(/^\{([^}]+)\}$/);
                      if (iconMatch) {
                        const iconKey = iconMatch[1];
                        return (
                          <AbbreviationIcon
                            key={`${segmentIndex}-${subIndex}`}
                            iconKey={iconKey}
                          />
                        );
                      }

                      // If it is parenthetical text, render the parenthetical text
                      const parentheticalMatch =
                        subSegment.match(/^\(([^)]+)\)$/);
                      if (parentheticalMatch) {
                        return (
                          <span
                            key={`${segmentIndex}-${subIndex}`}
                            className="italic font-normal"
                          >
                            ({parentheticalMatch[1]})
                          </span>
                        );
                      }

                      // Regular text segment
                      return (
                        <span key={`${segmentIndex}-${subIndex}`}>
                          {subSegment}
                        </span>
                      );
                    });
                  })}
                </div>
              );
            })}
          </div>
        </div>
        {/* If the card subtype is "Modification", render the keywords below the text */}
        {cardKeywords && renderBelowText && (
          <div className="flex-shrink-0">
            <CardRenderKeywords
              card={card}
              mode={mode}
              keywords={cardKeywords}
              truncateKeywords={truncateContent}
            />
          </div>
        )}
      </div>
      {/* Render the card lore text */}
      {cardLoreText && showLore && (
        <div
          className={clsx(
            "w-full text-black text-xs italic font-normal py-1 px-1.5",
            bgColorClass200 || "bg-neutral-200"
          )}
          style={{
            minHeight: "36px",
            borderRadius: "0.25rem",
          }}
        >
          <p>{cardLoreText}</p>
        </div>
      )}
    </div>
  );
}
