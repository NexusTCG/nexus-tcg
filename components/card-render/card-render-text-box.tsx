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

type CardRenderTextBoxProps = {
  card: CardDTO;
  mode: "initial" | "anomaly";
};

export default function CardRenderTextBox({
  card,
  mode,
}: CardRenderTextBoxProps) {
  const cardKeywords: RenderedKeywordsType =
    mode === "initial" && card.initialMode.type.includes("agent")
      ? card.initialMode.keywords
      : null;
  const cardText =
    mode === "initial"
      ? card.initialMode.text
      : card.anomalyMode.uncommon
      ? card.anomalyMode.text
      : "Once during each of your turns, a common anomaly in your hand can be manifested into any of the five common anomalies. Light, Storm, Dark, Chaos, or Growth.";
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

  return (
    <div
      id="card-form-text-container"
      style={{ fontSize: "0.85rem" }}
      className={clsx(
        "flex flex-col justify-start items-start",
        "w-full h-full px-2 pt-1.5 pb-2.5 gap-1.5",
        "border border-b-2 resize-none text-black",
        bgColorClass50 || "bg-neutral-50"
      )}
    >
      {cardKeywords && (
        <div className="flex-shrink-0">
          <CardRenderKeywords keywords={cardKeywords} />
        </div>
      )}
      <div className="flex-grow w-full overflow-hidden">
        <p>{cardText}</p>
      </div>
      {cardLoreText && (
        <div
          className={clsx(
            "w-full text-black text-xs italic font-normal py-1 px-1.5",
            bgColorClass200 || "bg-neutral-200"
          )}
          style={{
            minHeight: "36px",
            maxHeight: "36px",
          }}
        >
          <p>{cardLoreText}</p>
        </div>
      )}
    </div>
  );
}
