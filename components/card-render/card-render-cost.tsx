import React from "react";
// Types
import { EnergyCost, EnergyType } from "@/app/lib/types/components";
// Custom components
import EnergyIcon from "@/components/card-creator/energy-icon";

type CardRenderCostProps = {
  energyCost: EnergyCost;
};

export default function CardRenderCost({ energyCost }: CardRenderCostProps) {
  const energyTypes: EnergyType[] = [
    "void",
    "light",
    "storm",
    "dark",
    "chaos",
    "growth",
  ];

  function renderEnergyIcons(type: EnergyType, cost: number) {
    if (type === "void") {
      if (cost === 0) return null; // No void icon
      if (cost === -1) return <EnergyIcon type="void" value={-1} />; // Void X icon
      return <EnergyIcon type="void" value={cost} />; // Void icon
    }
    return Array(cost)
      .fill(null)
      .map((_, index) => (
        <div key={`${type}-${index}`} className={`z-${index * 10}`}>
          <EnergyIcon type={type} />
        </div>
      ));
  }

  function renderOrderedEnergyIcons() {
    return energyTypes.map((type) => {
      const cost = energyCost[type] || 0;
      if (cost > 0 || (type === "void" && cost !== 0)) {
        return (
          <React.Fragment key={type}>
            {renderEnergyIcons(type, cost)}
          </React.Fragment>
        );
      }
      return null;
    });
  }

  return (
    <div
      className="
        flex 
        flex-col 
        justify-start 
        items-center 
        absolute
        top-0
        left-0
        gap-0
      "
    >
      {renderOrderedEnergyIcons()}
    </div>
  );
}
