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

const energyTypes: EnergyType[] = ['light', 'storm', 'dark', 'chaos', 'growth', 'voidx'];

export default function EnergyCostPopover() {
  const { watch, setValue } = useFormContext();
  const energyCosts = watch('initialMode.energy_cost') || {};

  function calculateTotalEnergy(costs: Record<EnergyType, number>): number {
    return Object.values(costs).reduce((total, cost) => total + cost, 0);
  }

  function updateEnergyCost(type: EnergyType, delta: number, e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const newValue = Math.max(0, Math.min(5, (energyCosts[type] || 0) + delta));
    setValue(`initialMode.energy_cost.${type}`, newValue);
  }

  function renderEnergyIcons(type: EnergyType, count: number) {
    if (type === 'voidx') {
      return count > 0 ? <EnergyIcon type={`void${count}`} /> : null;
    }
    return Array(count).fill(null).map((_, index) => (
      <EnergyIcon key={`${type}-${index}`} type={type} />
    ));
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          className="
            p-0
            h-auto
            bg-transparent
            hover:bg-transparent
            active:bg-transparent
            focus:bg-transparent
          "
        >
          {Object
            .values(energyCosts)
            .every(cost => cost === 0) ? (
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
              "
            >
              {energyTypes.map(type => 
                energyCosts[type] > 0 && (
                  <React.Fragment key={type}>
                    {renderEnergyIcons(type, energyCosts[type])}
                  </React.Fragment>
                )
              )}
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
                    'bg-slate-800/60 hover:bg-slate-800': type.includes('void'),
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
                    disabled={energyCosts[type] === 0}
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
                  <span className="
                      mx-2
                      text-lg 
                      font-semibold 
                    "
                  >
                    {energyCosts[type] || 0}
                  </span>
                  <Button 
                    type="button"
                    size="icon" 
                    variant="ghost" 
                    onClick={(e) => updateEnergyCost(type, 1, e)}
                    disabled={energyCosts[type] === 5}
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