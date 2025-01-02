import React from "react";
// Utils
import clsx from "clsx";
import { calculateBgColor } from "@/app/utils/actions/actions";
// Types
import { CardDTO } from "@/app/lib/types/dto";
import { EnergyCost } from "@/app/lib/types/components";
import { RenderedKeywordsType } from "@/app/lib/types/components";
// Custom components
import CardRenderKeywords from "@/components/card-render/card-render-keywords";
import AbbreviationIcon from "@/components/card-render/abbreviation-icon";

type CardRenderTextBoxProps = {
  card: CardDTO;
  mode: "initial" | "anomaly";
};

export default function CardRenderTextBox({
  card,
  mode,
}: CardRenderTextBoxProps) {
  const cardKeywords: RenderedKeywordsType =
    mode === "initial" && !card.initialMode.type.includes("event")
      ? card.initialMode.keywords
      : null;
  const cardText = (() => {
    // Replace ~ with card name
    if (mode === "initial") {
      return card.initialMode.text?.replace(/~/g, card.initialMode.name) ?? "";
    }
    if (card.anomalyMode.uncommon) {
      return card.anomalyMode.text?.replace(/~/g, card.anomalyMode.name) ?? "";
    }

    return "Once during each of your turns, a common anomaly in your hand can be manifested into any of the five common anomalies. Light, Storm, Dark, Chaos, or Growth.";
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
      {cardKeywords && cardKeywords.length > 0 && (
        <div className="flex-shrink-0">
          <CardRenderKeywords card={card} mode={mode} keywords={cardKeywords} />
        </div>
      )}
      <div className="flex-grow w-full overflow-hidden">
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
                          className="italic font-light"
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
      {cardLoreText && (
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
