"use client"

import React from 'react';
import { useFormContext } from 'react-hook-form';
import clsx from "clsx"
// Types
import { EnergyType } from '@/app/lib/types/components';
// Components
import { toast } from "sonner"
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
// Icons
import EnergyIcon from "@/components/card-creator/energy-icon";

export default function EnergyCostPopover() {
  const { watch, setValue, trigger } = useFormContext();
  const energyCosts = watch('initialMode.energy_cost') || {};
  const energyTypes: EnergyType[] = [
    'light', 
    'storm', 
    'dark', 
    'chaos', 
    'growth', 
    'void'
  ];

  function calculateTotalEnergy(
    costs: Record<EnergyType, number>
  ): number {
    return Object.entries(costs).reduce((total, [type, cost]) => {
      if (type === 'void') return total;
      return total + (cost || 0);
    }, 0);
  }

  function calculateTotalVoidEnergy(
    costs: Record<EnergyType, number>
  ): number {
    return costs['void'] || 0;
  }

  function calculateTotalCost(
    costs: Record<EnergyType, number>
  ): number {
    const total = Object.values(costs).reduce((total, cost) => total + (cost || 0), 0);
    return total === -1 ? 0 : total;
  }

  function renderEnergyIcons(
    type: EnergyType, 
    cost: number
  ) {
    if (type === 'void') {
      if (cost === 0) return null;
      return <EnergyIcon type="void" value={cost} />;
    }
    return Array(cost).fill(null).map((_, index) => (
      <EnergyIcon key={`${type}-${index}`} type={type} />
    ));
  }

  function renderOrderedEnergyIcons() {
    const orderedTypes: EnergyType[] = [
      'void', 
      'light',
      'storm',
      'dark',
      'chaos',
      'growth',
    ];
    
    return orderedTypes.map(type => {
      const cost = energyCosts[type] || 0;
      if (cost > 0 || (type === 'void' && cost !== 0)) {
        return (
          <React.Fragment key={type}>
            {renderEnergyIcons(type, cost)}
          </React.Fragment>
        );
      }
      return null;
    });
  }

  function updateEnergyCost(
    type: EnergyType, 
    delta: number, 
    e: React.MouseEvent
  ) {
    e.preventDefault();
    e.stopPropagation();
    const currentValue = energyCosts[type] || 0;
    const totalNonVoidEnergy = calculateTotalEnergy(energyCosts);
    const totalVoidEnergy = calculateTotalVoidEnergy(energyCosts);
    
    let newValue: number;
    if (type === 'void') {
      if (currentValue === 0 && delta < 0) {
        newValue = -1;
      } else if (currentValue === -1 && delta > 0) {
        newValue = 0;
      } else {
        newValue = Math.max(-1, Math.min(15 - totalNonVoidEnergy, currentValue + delta));
      }
    } else {
      if (totalNonVoidEnergy >= 5 && delta > 0) {
        return;
      }
      newValue = Math.max(0, Math.min(5, currentValue + delta));
    }
    
    if (totalNonVoidEnergy + totalVoidEnergy + delta <= 15) {
      toast(`
        ${type.charAt(0).toUpperCase() + type.slice(1)} energy changed to ${(
          type === "void" && newValue === -1) 
            ? "X" 
            : newValue}!`
          );
      
      setValue(`initialMode.energy_cost.${type}`, newValue);
      trigger("initialMode.energy_cost") // Remove?
      console.log("New energy cost: ", energyCosts)
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          className="
            p-0
            h-[32px]
            w-[32px]
            bg-transparent
            hover:bg-transparent
            active:bg-transparent
            focus:bg-transparent
            relative
          "
        >
          {Object.values(energyCosts).every(cost => cost === 0) ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <EnergyIcon type="void" value={0} />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>Change card cost</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <div
              className="
                flex 
                flex-col 
                justify-start 
                items-center 
                cursor-pointer
                absolute
                top-0
                left-0
              "
            >
              {renderOrderedEnergyIcons()}
            </div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[480px]">
        <div
          id="cost-popover-container"
          className="
            flex
            flex-col
            justify-start
            items-center
            gap-4
            w-full
          "
        >
          <div
            id="cost-popover-header"
            className="
              flex
              flex-row
              justify-between
              items-center
              w-full
              align-baseline
            "
          >
            <h3 className="font-semibold">Select energy cost</h3>
            <p>
              <span className="font-bold">
                {calculateTotalCost(energyCosts)}
              </span>{" "}
              <span className="opacity-80">
                total cost
              </span>
            </p>
          </div>
          <div className="w-full grid grid-cols-3 gap-2">
            {energyTypes.map(type => (
              <div
                key={type} 
                id={`${type}-cost-select-container`}
                className={clsx("flex flex-col items-center gap-1 px-1 py-2 rounded-sm",
                  {
                    'bg-yellow-950/60 hover:bg-yellow-950': type === 'light',
                    'bg-sky-950/60 hover:bg-sky-950': type === 'storm',
                    'bg-violet-950/60 hover:bg-violet-950': type === 'dark',
                    'bg-red-950/60 hover:bg-red-950': type === 'chaos',
                    'bg-lime-950/60 hover:bg-lime-950': type === 'growth',
                    'bg-slate-800/60 hover:bg-slate-800': type === 'void',
                  }
                )}
              >
                <EnergyIcon type={type} value={type === 'void' ? (energyCosts[type] || 0) : undefined} />
                <div
                  className="
                    flex
                    flex-row
                    items-center
                    justify-center
                    gap-1
                  "
                >
                  <Button 
                    type="button"
                    size="icon" 
                    variant="ghost" 
                    onClick={(e) => updateEnergyCost(type, -1, e)}
                    disabled={type === 'void' ? energyCosts[type] === -1 : energyCosts[type] === 0}
                    className="
                      text-xl 
                      font-semibold 
                      opacity-40 
                      hover:opacity-100 
                      transition-opacity
                      hover:border
                      hover:border-white/20
                    "
                  >
                    {type === "void" && energyCosts[type] === 0
                      ? "X"
                      : (energyCosts[type] === 0 || type === "void" && energyCosts[type] === -1)
                      ? ""
                      : "-"}
                  </Button>
                  <span className="mx-2 text-lg font-semibold">
                    {type === 'void' && energyCosts[type] === -1 ? 'X' : energyCosts[type] || 0}
                  </span>
                  <Button 
                    type="button"
                    size="icon" 
                    variant="ghost" 
                    onClick={(e) => updateEnergyCost(type, 1, e)}
                    disabled={
                      (type === 'void' && (
                        energyCosts[type] === 15 || 
                        calculateTotalEnergy(energyCosts) + 
                        calculateTotalVoidEnergy(energyCosts) >= 15)
                      ) ||
                      (type !== 'void' && (
                        energyCosts[type] === 5 || 
                        calculateTotalEnergy(energyCosts) >= 5
                      ))
                    }
                    className="
                      text-xl 
                      font-semibold 
                      opacity-40 
                      hover:opacity-100 
                      transition-opacity
                      hover:border
                      hover:border-white/20
                    "
                  >
                    {calculateTotalCost(energyCosts) >= 15
                      ? ""
                      : type !== "void" && (
                          energyCosts[type] === 5 || 
                          calculateTotalEnergy(energyCosts) >= 5
                        )
                      ? ""
                      : type === "void" && (
                          calculateTotalEnergy(energyCosts) + 
                          calculateTotalVoidEnergy(energyCosts) >= 15
                        )
                      ? ""
                      : "+"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}