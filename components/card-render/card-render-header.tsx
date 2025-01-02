import React from "react";
// Utils
import clsx from "clsx";
import Image from "next/image";
// Actions
import { calculateBgColor } from "@/app/utils/actions/actions";
// Types
import { CardDTO } from "@/app/lib/types/dto";
import { EnergyCost } from "@/app/lib/types/components";
// Custom components
import CardRenderCost from "@/components/card-render/card-render-cost";
import CardRenderSpeed from "@/components/card-render/card-render-speed";
// Icons
import mythicIcon from "@/public/icons/mythic.svg";

type CardRenderHeaderProps = {
  card: CardDTO;
  activeMode: "initial" | "anomaly";
};

export default function CardRenderHeader({
  card,
  activeMode,
}: CardRenderHeaderProps) {
  const cardEnergyCost: EnergyCost = card.initialMode.energy_cost as EnergyCost;
  const cardSpeed = card.initialMode.speed;
  const isUncommonAnomaly = card.anomalyMode.uncommon;
  const isMythic =
    activeMode === "anomaly"
      ? card.anomalyMode.mythic && isUncommonAnomaly
      : card.initialMode.mythic;

  const bgColorClass50 =
    activeMode === "anomaly" ? null : calculateBgColor(cardEnergyCost, 50)[0];
  const bgColorClass100 =
    activeMode === "anomaly" ? null : calculateBgColor(cardEnergyCost, 100)[0];

  return (
    <div
      id="card-form-header-container"
      style={{ maxHeight: "60px" }}
      className={clsx(
        "flex flex-row justify-start items-start w-full",
        "gap-2 pl-0.5 pr-1 pt-0.5 pb-1 z-20 text-black font-medium",
        "border border-b-2 shadow shadow-black/50 relative",
        bgColorClass50 || "bg-neutral-50"
      )}
    >
      {activeMode === "initial" && (
        <div
          id="card-speed-cost-container"
          className="
            flex 
            flex-col 
            justify-start 
            items-start
            z-10
            h-[64px]
            w-[32px]
            left-0
          "
        >
          <div className="absolute">
            <CardRenderSpeed speed={cardSpeed} />
          </div>
          <div className="absolute top-[32px]">
            <CardRenderCost energyCost={cardEnergyCost} />
          </div>
        </div>
      )}
      <div
        id="card-mythic-name-type-container"
        className="
          flex 
          flex-col 
          justify-between 
          items-start 
          w-full
          h-full
        "
      >
        <div
          id="card-mythic-name-container"
          className="
            flex
            items-center
            w-full
            h-full
            gap-1
            min-h-[24px]
          "
        >
          {/* Mythic Toggle */}
          {isMythic && (
            <div className="flex justify-center items-center flex-shrink-0">
              <Image
                src={mythicIcon}
                alt="Mythic Icon"
                width={20}
                height={24}
              />
            </div>
          )}
          <div className="text-md flex-grow">
            {activeMode === "initial"
              ? card.initialMode.name
              : isUncommonAnomaly
              ? card.anomalyMode.name
              : "Common Anomaly"}
          </div>
        </div>
        <div
          id="card-type-container"
          className={clsx(
            "flex flex-row justify-start items-center",
            "w-full text-sm rounded-sm p-0.5",
            bgColorClass100 || "bg-neutral-100"
          )}
        >
          {activeMode === "initial"
            ? card.initialMode.type
                .split("_")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")
            : "Anomaly"}
          {activeMode === "initial" &&
            card.initialMode.type_sub &&
            Array.isArray(card.initialMode.type_sub) &&
            card.initialMode.type_sub.length > 0 && (
              <>
                <span className="opacity-80 text-xs font-normal mx-1">•</span>
                {card.initialMode.type_sub
                  .map(
                    (word) =>
                      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                  )
                  .join(" ")}
              </>
            )}
        </div>
      </div>
    </div>
  );
}
