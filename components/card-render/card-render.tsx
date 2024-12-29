import React from "react";
// Utils
import dynamic from "next/dynamic";
import clsx from "clsx";
// Types
import { CardDTO } from "@/app/lib/types/dto";
import { EnergyCost } from "@/app/lib/types/components";
// Actions
import { calculateBgColor } from "@/app/utils/actions/actions";
// Custom components
import CardRenderContainer from "@/components/card-render/card-render-container";
import CardRenderHeader from "@/components/card-render/card-render-header";
import CardAnimationWrapper from "@/components/card-render/card-animation-wrapper";
const CardRenderArt = dynamic(
  () => import("@/components/card-render/card-render-art")
);
const CardRenderTextBox = dynamic(
  () => import("@/components/card-render/card-render-text-box")
);
const CardRenderStats = dynamic(
  () => import("@/components/card-render/card-render-stats")
);

type CardRenderProps = {
  card: CardDTO;
  mode: "initial" | "anomaly";
  isActive: boolean;
};

function getCardArt(card: CardDTO, mode: "initial" | "anomaly") {
  if (mode === "initial") {
    return card.initialMode.art_options?.[card.initialMode.art_selected];
  } else {
    if (card.anomalyMode.uncommon) {
      return (
        card.anomalyMode.art_options?.[card.anomalyMode.art_selected] ||
        "/images/default-anomaly-art.webp"
      );
    } else {
      return "/images/default-anomaly-art.webp";
    }
  }
}

export default function CardRender({ card, mode, isActive }: CardRenderProps) {
  const cardData = mode === "initial" ? card.initialMode : card.anomalyMode;
  const cardName =
    mode === "initial"
      ? card.initialMode.name
      : card.anomalyMode.uncommon
      ? card.anomalyMode.name
      : "Common Anomaly";
  const cardType =
    mode === "initial"
      ? card.initialMode.type
      : card.anomalyMode.uncommon
      ? "Uncommon Anomaly"
      : "Common Anomaly";
  // const cardArt = mode === "initial"
  //   ? card.initialMode.art_options?.[card.initialMode.art_selected]
  //   : card.anomalyMode.uncommon
  //     ? card.anomalyMode.art_options?.[card.anomalyMode.art_selected] ||
  //       "/images/default-anomaly-art.webp"
  //     : "/images/default-anomaly-art.webp";
  const cardArt = getCardArt(card, mode);

  const bgColorClass500 =
    mode === "anomaly"
      ? null
      : calculateBgColor(card.initialMode.energy_cost as EnergyCost, 500)[0];

  return (
    <CardAnimationWrapper isActive={isActive}>
      <CardRenderContainer
        mode={mode}
        cardType={cardType.toLowerCase()}
        username={card.username || ""}
        grade={card.grade || ""}
        isUncommon={card.anomalyMode.uncommon}
        energyCost={card.initialMode.energy_cost as EnergyCost}
        cardId={card.id ?? 0}
      >
        <CardRenderHeader card={card} activeMode={mode} />
        <div
          id={`${mode}-card-content-container`}
          className="
            flex
            flex-col
            justify-center
            items-center
            w-full
            h-full
            px-2
            border-x
          "
        >
          {cardArt && cardArt !== undefined && (
            <CardRenderArt
              mode={mode}
              cardId={card.id ?? 0}
              cardArt={cardArt}
              cardName={cardName}
              username={card.username || ""}
            />
          )}
          <div
            id={`${mode}-card-text-container`}
            className="
              flex
              flex-col
              justify-center
              items-center
              w-full
              h-full
              p-2
              pb-3
              -mt-4
            "
          >
            <div
              id={`${mode}-card-text-outer-container`}
              className={clsx(
                "flex flex-col justify-center items-center w-full h-full p-1 border-2 shadow-md shadow-black/50 rounded-sm",
                bgColorClass500 || "bg-neutral-500"
              )}
            >
              <CardRenderTextBox card={card} mode={mode} />
            </div>
          </div>
        </div>
        {cardType.includes("agent") && (
          <div className="absolute bottom-0 left-0 z-10">
            <CardRenderStats
              attack={card.initialMode.attack || 0}
              defense={card.initialMode.defense || 0}
              reach={card.initialMode.reach || false}
            />
          </div>
        )}
      </CardRenderContainer>
    </CardAnimationWrapper>
  );
}
