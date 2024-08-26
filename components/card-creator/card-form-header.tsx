"use client"

// Hooks
import React from "react"
import { useFormContext } from 'react-hook-form';
// Utils
import clsx from "clsx"
// Data
import { agentTypes, cardTypes } from "@/app/lib/data/data";
// Validation
import { EnergyType } from "@/app/lib/types/components";
// Custom components
import EnergyCostPopover from "@/components/card-creator/energy-cost-popover"
import SpeedCycler from "@/components/card-creator/speed-cycler";

type CardFormHeaderProps = {
  energy: EnergyType
}

export default function CardFormHeader({ 
  energy 
}: CardFormHeaderProps) {
  const { watch, setValue } = useFormContext();

  return (
    <div
      id="card-form-header-container"
      className={clsx("flex flex-row justify-start items-center w-full gap-2 p-1 border border-b-2 z-20",
        {
          "bg-yellow-50": energy === "light",
          "bg-sky-50": energy === "storm",
          "bg-violet-50": energy === "dark",
          "bg-red-50": energy === "chaos",
          "bg-lime-50": energy === "growth",
          "bg-slate-50": energy.includes("void"),
        }
      )}
    >
      <div
        id="card-speed-cost-container"
        className="
          flex 
          flex-col 
          justify-start 
          items-start
        "
      >
        <SpeedCycler />
        <EnergyCostPopover />
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
        <div
          id="card-name"
          className="font-medium"
        >
          <input
            // TODO: Register value
            type="text"
            placeholder="Card name"
            className="bg-transparent text-black"
          />
        </div>
        <div
          id="card-type-container"
          className={clsx("flex flex-row justify-start items-center w-full gap-1 text-md px-1 py-0.5 rounded-sm",
            {
              "bg-yellow-100": energy === "light",
              "bg-sky-100": energy === "storm",
              "bg-violet-100": energy === "dark",
              "bg-red-100": energy === "chaos",
              "bg-lime-100": energy === "growth",
              "bg-slate-100": energy.includes("void"),
            }
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