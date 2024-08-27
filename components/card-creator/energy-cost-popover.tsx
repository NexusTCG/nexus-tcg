"use client"

import React from 'react';
import { useFormContext } from 'react-hook-form';
import clsx from "clsx"
import { EnergyType } from '@/app/lib/types/components';
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
import EnergyIcon from "@/components/card-creator/energy-icon";

export default function EnergyCostPopover() {
  const { watch, setValue } = useFormContext();
  const energyCosts = watch('initialMode.energy_cost') || {};
  const energyTypes: EnergyType[] = ['light', 'storm', 'dark', 'chaos', 'growth', 'voidx'];

  function calculateTotalEnergy(costs: Record<EnergyType, number>): number {
    return Object.entries(costs).reduce((total, [type, cost]) => {
      if (type === 'voidx') return total;
      return total + cost;
    }, 0);
  }

  function getVoidEnergyType(cost: number): EnergyType {
    if (cost === -1) return 'voidx';
    return `void${cost}` as EnergyType;
  }

  function renderEnergyIcons(type: EnergyType, cost: number) {
    if (type === 'voidx') {
      if (cost === 0) return null;
      return <EnergyIcon type={getVoidEnergyType(cost)} />;
    }
    return Array(cost).fill(null).map((_, index) => (
      <EnergyIcon key={`${type}-${index}`} type={type} />
    ));
  }

  function renderOrderedEnergyIcons() {
    const orderedTypes: EnergyType[] = ['voidx', 'growth', 'chaos', 'dark', 'storm', 'light'];
    
    return orderedTypes.map(type => {
      const cost = energyCosts[type] || 0;
      if (cost > 0 || (type === 'voidx' && cost !== 0)) {
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
    
    let newValue: number;
    if (type === 'voidx') {
      if (currentValue === 0 && delta < 0) {
        newValue = -1; // Represents 'X'
      } else if (currentValue === -1 && delta > 0) {
        newValue = 0; // Transition from 'X' to 0
      } else {
        newValue = Math.max(-1, Math.min(15, currentValue + delta));
      }
    } else {
      newValue = Math.max(0, Math.min(5, currentValue + delta));
    }
    setValue(`initialMode.energy_cost.${type}`, newValue);
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
                    <EnergyIcon type="void0" />
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
            <h3 className="font-medium">Select energy cost</h3>
            <small className="text-neutral-400">
              Cost: <span className="text-neutral-300 font-semibold">{calculateTotalEnergy(energyCosts)}</span>
            </small>
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
                    'bg-slate-800/60 hover:bg-slate-800': type === 'voidx',
                  }
                )}
              >
                <EnergyIcon type={type} />
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
                    disabled={type === 'voidx' ? energyCosts[type] === -1 : energyCosts[type] === 0}
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
                    -
                  </Button>
                  <span className="mx-2 text-lg font-semibold">
                    {type === 'voidx' && energyCosts[type] === -1 ? 'X' : energyCosts[type] || 0}
                  </span>
                  <Button 
                    type="button"
                    size="icon" 
                    variant="ghost" 
                    onClick={(e) => updateEnergyCost(type, 1, e)}
                    disabled={type === 'voidx' ? energyCosts[type] === 15 : energyCosts[type] === 5}
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
                    +
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