import React from "react";
// Utils
import clsx from "clsx";
// Actions
import { calculateBgColor } from "@/app/utils/actions/actions";
// Types
import { CardDTO } from "@/app/lib/types/dto";
import { EnergyCost } from "@/app/lib/types/components";
// Custom components
import CardRenderCost from "@/components/card-render/card-render-cost";
import CardRenderSpeed from "@/components/card-render/card-render-speed";

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
        id="card-name-type-container"
        className="
          flex 
          flex-col 
          justify-between 
          items-start 
          w-full
          h-full
        "
      >
        <div className="text-md">
          {activeMode === "initial"
            ? card.initialMode.name
            : isUncommonAnomaly
            ? card.anomalyMode.name
            : "Common Anomaly"}
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
                {card.initialMode.type_sub.join(", ")}
              </>
            )}
        </div>
      </div>
    </div>
  );
}
