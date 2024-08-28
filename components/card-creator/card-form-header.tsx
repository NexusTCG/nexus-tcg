"use client"

// Hooks
import React from "react"
import { useFormContext } from 'react-hook-form';
// Utils
import clsx from "clsx"
import { cn } from "@/lib/utils";
// Actions
import { calculateBgColor } from "@/app/utils/actions/actions";
// Data
import { agentTypes, cardTypes } from "@/app/lib/data/data";
// Types
import { EnergyCost } from "@/app/lib/types/components"
// Components
import {
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

  const cardNameDefaults = [
    "An amazing card name...", 
    "A glorious card name...", 
    "A fantabulous card name...",
    "A magnificent card name...",
    "A spectacular card name..."
  ]

  return (
    <div
      id="card-form-header-container"
      style={{ maxHeight: "72px" }}
      className={clsx(
        "flex flex-row justify-start items-center w-full gap-1 px-1 py-2 border border-b-2 z-20 relative shadow shadow-black/50",
        bgColorClass50 || 'bg-neutral-50'
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
        <div className="absolute left-0">
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
        <FormField
          control={control}
          name="initialMode.name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <input
                  {...field}
                  type="text"
                  placeholder={
                    cardNameDefaults[
                      Math.floor(
                        Math.random() * cardNameDefaults.length
                      )
                    ]
                  }
                  autoComplete="off"
                  data-1p-ignore
                  data-lpignore="true"
                  data-form-type="other"
                  className="
                    w-full 
                    bg-transparent 
                    text-black
                    font-medium
                    text-lg
                    outline-none
                    border-none
                    focus:ring-0
                    focus:outline-none
                    caret-black
                    ml-1.5
                  "
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div
          id="card-type-container"
          className={clsx(
            "flex flex-row justify-start items-center w-full text-md rounded-sm p-0.5 max-h-[30px]",
            bgColorClass100 || 'bg-neutral-100'
          )}
        >
          {/* <select className="flex-grow bg-transparent text-black">
            <option value="" disabled selected>Type</option>
            {cardTypes
              .filter((cardType) => cardType.toLowerCase() !== "anomaly")
              .map((cardType: string) => (
                <option key={cardType} value={cardType.toLowerCase()}>
                  {cardType}
                </option>
              ))}
          </select> */}
          <FormField
            control={control}
            name="initialMode.type"
            render={({ field }) => (
              <FormItem className="w-full h-full">
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger 
                      className={cn(
                        "w-full h-full bg-transparent text-black border-none shadow-none",
                        "focus:ring-0 focus:ring-offset-0",
                        "text-md font-medium py-0 px-1"
                      )}
                    >
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {cardTypes
                      .filter((type) => type.toLowerCase() !== "anomaly")
                      .map((type) => (
                        <SelectItem key={type} value={type.toLowerCase()}>
                          {type}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <span className="text-xs opacity-60">•</span>
          <select className="w-full bg-transparent text-black" defaultValue="Subtype">
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