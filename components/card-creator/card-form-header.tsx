"use client"

// Hooks
import React from "react"
import { useFormContext } from 'react-hook-form';
// Utils
import clsx from "clsx"
// Actions
import { calculateBgColor } from "@/app/utils/actions/actions";
// Data
import { agentTypes, cardTypes } from "@/app/lib/data/data";
// Types
import { EnergyCost } from "@/app/lib/types/components"
import { EnergyType } from "@/app/lib/types/components";
// Custom components
import EnergyCostPopover from "@/components/card-creator/energy-cost-popover"
import SpeedCycler from "@/components/card-creator/speed-cycler";

export default function CardFormHeader() {
  const { 
    control, 
    watch,
  } = useFormContext();
  const energyCost: EnergyCost = watch('initialMode.energy_cost') || {
    light: 0,
    storm: 0,
    dark: 0,
    chaos: 0,
    growth: 0,
    void: 0,
  };
  const bgColorClass50 = calculateBgColor(energyCost, 50)[0];
  const bgColorClass100 = calculateBgColor(energyCost, 100)[0]; 

  return (
    <div
      id="card-form-header-container"
      className={clsx(
        "flex flex-row justify-start items-center w-full gap-2 p-1 border border-b-2 z-20 relative",
        bgColorClass50
      )}
    >
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
        "
      >
        <div className="absolute top-0 left-0">
          <SpeedCycler />
        </div>
        <div className="absolute top-[32px] left-0">
          <EnergyCostPopover />
        </div>
      </div>
      <div
        id="card-name-type-container"
        className="
          flex 
          flex-col 
          justify-start 
          items-start 
          w-full 
          gap-1
        "
      >
          {/* <input
            // TODO: Register value
            type="text"
            placeholder="Card name"
            className="w-full bg-transparent text-black"
          /> */}
          <small className="text-black">{bgColorClass50} + {bgColorClass100}</small>
        <div
          id="card-type-container"
          className={clsx(
            "flex flex-row justify-start items-center w-full gap-1 text-md px-1 py-0.5 rounded-sm",
            bgColorClass100
          )}
        >
          <select className="bg-transparent text-black">
            <option value="" disabled selected>Type</option>
            {cardTypes
              .filter((cardType) => cardType.toLowerCase() !== "anomaly")
              .map((cardType: string) => (
                <option key={cardType} value={cardType.toLowerCase()}>
                  {cardType}
                </option>
              ))}
          </select>
          <span className="text-xs opacity-60">•</span>
          <select className="bg-transparent text-black" defaultValue="Subtype">
            {agentTypes.map((agentType: string) => (
              <option
                key={agentType}
                value={agentType.toLowerCase()}
              >
                {agentType}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}