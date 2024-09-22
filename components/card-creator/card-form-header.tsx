"use client"

// Hooks
import React, { useMemo } from "react"
import { useFormContext } from 'react-hook-form';
// Utils
import clsx from "clsx"
import { cn } from "@/lib/utils";
// Actions
import { calculateBgColor } from "@/app/utils/actions/actions";
// Types
import { EnergyCost } from "@/app/lib/types/components"
// Components
import {
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// Custom components
import TypeSelect from "@/components/card-creator/type-select";
import SubTypeSelect from "@/components/card-creator/sub-type-select";
import AgentTypeSelect from "@/components/card-creator/agent-type-select";
import EnergyCostPopover from "@/components/card-creator/energy-cost-popover";
import SpeedCycler from "@/components/card-creator/speed-cycler";

const CARD_NAME_MAX_LENGTH = 30;
const cardNameDefaults = [
  "An amazing card name...", 
  "A glorious card name...", 
  "A fantabulous card name...",
  "A magnificent card name...",
  "A spectacular card name..."
]

type CardFormHeaderProps = {
  activeMode: "initial" | "anomaly"
}

export default function CardFormHeader({
  activeMode
}: CardFormHeaderProps) {
  const { 
    control, 
    watch, 
    formState: { 
      isSubmitting
  }} = useFormContext();

  const cardType = watch("initialMode.type")
  const cardIsUncommon = watch("anomalyMode.uncommon")
  const cardEnergyCost: EnergyCost = watch('initialMode.energy_cost') || {
    light: 0,
    storm: 0,
    dark: 0,
    chaos: 0,
    growth: 0,
    void: 0,
  };
  const randomCardNamePlaceholder = useMemo(() => {
    return cardNameDefaults[Math.floor(Math.random() * cardNameDefaults.length)];
  }, []);

  const bgColorClass50 = activeMode === "anomaly" 
    ? null : calculateBgColor(cardEnergyCost, 50)[0];
  const bgColorClass100 = activeMode === "anomaly" 
    ? null : calculateBgColor(cardEnergyCost, 100)[0]; 

  return (
    <div
      id="card-form-header-container"
      style={{ maxHeight: "60px" }}
      className={clsx(
        "flex flex-row justify-start items-start w-full gap-1 px-1 pt-0.5 pb-1 border border-b-2 z-20 relative shadow shadow-black/50",
        bgColorClass50 || 'bg-neutral-50'
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
            <SpeedCycler />
          </div>
          <div className="absolute top-[32px]">
            <EnergyCostPopover />
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
        {activeMode === "initial" || 
        (activeMode === "anomaly" && cardIsUncommon) ? (
          <FormField
            control={control}
            name={
              activeMode === "initial" 
                ? "initialMode.name" 
                : "anomalyMode.name"
            }
            render={({ field }) => (
              <FormItem className="w-full" >
                <FormControl>
                  <input
                    {...field}
                    type="text"
                    disabled={isSubmitting}
                    placeholder={
                      activeMode === "initial" 
                        ? randomCardNamePlaceholder 
                        : cardIsUncommon 
                          ? "Uncommon Anomaly" 
                          : "Common Anomaly"
                    }
                    autoComplete="off"
                    data-1p-ignore
                    data-lpignore="true"
                    data-form-type="other"
                    maxLength={CARD_NAME_MAX_LENGTH}
                    className="
                      w-full 
                      bg-transparent 
                      text-black
                      font-medium
                      text-md
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
        ) : (
          <p className="pl-1 text-md font-medium text-black">Common Anomaly</p>
        )}
        <div
          id="card-type-container"
          className={clsx(
            "flex flex-row justify-start items-center w-full text-md rounded-sm p-0.5",
            bgColorClass100 || 'bg-neutral-100'
          )}
        >
          {activeMode === "initial" ? (
            <TypeSelect />
          ) : (
            <FormField
              control={control}
              name="anomalyMode.uncommon"
              render={({ field }) => (
                <FormItem className="max-w-3/5 h-full">
                  <Select
                    onValueChange={(value) => field.onChange(value === "true")}
                    value={field.value === true ? "true" : "false"}
                    defaultValue="false"
                  >
                    <FormControl>
                      <SelectTrigger 
                        className={cn(
                          "w-full h-full bg-transparent text-black border-none shadow-none",
                          "focus:ring-0 focus:ring-offset-0",
                          "text-sm font-medium py-0 px-1"
                        )}
                      >
                        <SelectValue placeholder="Common Anomaly" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="false">Common Anomaly</SelectItem>
                      <SelectItem value="true">Uncommon Anomaly</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          )}
          {activeMode === "initial" &&
           cardType.toLowerCase().includes("agent") && (
            <AgentTypeSelect />
          )}
          {activeMode === "initial" && (
            cardType.toLowerCase() === "software" ||
            cardType.toLowerCase() === "hardware"
          ) && (
            <SubTypeSelect />
          )}
        </div>
      </div>
    </div>
  )
}