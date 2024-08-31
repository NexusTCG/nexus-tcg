"use client"

// Hooks
import React, { useState, useMemo } from "react"
import { useFormContext, Controller } from 'react-hook-form';
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

const CARD_NAME_MAX_LENGTH = 20;
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
  const [isTypeSubOpen, setIsTypeSubOpen] = useState(false);
  const { 
    control, 
    watch, 
    formState: { 
      isSubmitting
  }} = useFormContext();

  const isUncommon = watch("anomalyMode.uncommon")
  const energyCost: EnergyCost = watch('initialMode.energy_cost') || {
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

  const bgColorClass50 = activeMode === "anomaly" ? null : calculateBgColor(energyCost, 50)[0];
  const bgColorClass100 = activeMode === "anomaly" ? null : calculateBgColor(energyCost, 100)[0]; 

  return (
    <div
      id="card-form-header-container"
      style={{ maxHeight: "72px" }}
      className={clsx(
        "flex flex-row justify-start items-center w-full gap-1 px-1 py-2 border border-b-2 z-20 relative shadow shadow-black/50",
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
          "
        >
          <div className="absolute left-0">
            <SpeedCycler />
          </div>
          <div className="absolute top-[32px] left-0">
            <EnergyCostPopover />
          </div>
        </div>
      )}
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
        {activeMode === "initial" || 
        (activeMode === "anomaly" && isUncommon) ? (
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
                        : isUncommon 
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
        ) : (
          <p className="pl-1 text-lg font-medium text-black">Common Anomaly</p>
        )}
        <div
          id="card-type-container"
          className={clsx(
            "flex flex-row justify-start items-center w-full text-md rounded-sm p-0.5 max-h-[30px]",
            bgColorClass100 || 'bg-neutral-100'
          )}
        >
          {activeMode === "initial" ? (
            <FormField
              control={control}
              name="initialMode.type"
              render={({ field }) => (
                <FormItem className="max-w-3/5 h-full">
                  <Select
                    onValueChange={field.onChange} 
                    defaultValue={field.value || "Agent"}
                  >
                    <FormControl>
                      <SelectTrigger 
                        className={cn(
                          "w-full h-full bg-transparent text-black border-none shadow-none",
                          "focus:ring-0 focus:ring-offset-0",
                          "text-md font-medium py-0 px-1"
                        )}
                      >
                        <SelectValue placeholder="Agent" />
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
                          "text-md font-medium py-0 px-1"
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
          {activeMode === "initial" && (
            <>
              <span className="text-xs opacity-60">•</span>
              <Controller
                control={control}
                name="initialMode.type_sub"
                render={({ field }) => {
                  const typeSub = Array.isArray(field.value) ? field.value : [];
                  return (
                    <FormItem className="flex-grow h-full relative">
                      <div
                        onClick={() => setIsTypeSubOpen(!isTypeSubOpen)}
                        className={cn(
                          "w-full h-full bg-transparent cursor-pointer text-black border-none shadow-none",
                          "focus:ring-0 focus:ring-offset-0",
                          "text-md font-medium py-0 px-1 text-left"
                        )}
                      >
                        {typeSub.length > 0 ? typeSub.join(' ') : "Select agent types"}
                      </div>
                      {isTypeSubOpen && (
                        <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md shadow-lg z-50 max-h-48 overflow-y-auto">
                          {agentTypes.map((agentType) => (
                            <div
                              key={agentType}
                              className="flex items-center p-2 hover:bg-gray-100 cursor-pointer text-black"
                              onClick={() => {
                                const newValue = typeSub.includes(agentType)
                                  ? typeSub.filter((v) => v !== agentType)
                                  : [...typeSub, agentType].slice(0, 3);
                                field.onChange(newValue);
                              }}
                            >
                              <input
                                type="checkbox"
                                checked={typeSub.includes(agentType)}
                                readOnly
                                className="mr-2"
                              />
                              {agentType}
                            </div>
                          ))}
                        </div>
                      )}
                    </FormItem>
                  );
                }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}