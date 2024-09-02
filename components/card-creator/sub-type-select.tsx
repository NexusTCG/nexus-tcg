"use client";

// Hooks
import React, { useState, useEffect } from "react";
import { useFormContext, Controller } from 'react-hook-form';
// Utils
import { cn } from "@/lib/utils";
// Data
import { agentTypes } from "@/app/lib/data/data";
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
  SelectValue 
} from "@/components/ui/select";

export default function SubTypeSelect() {
  const [previousType, setPreviousType] = useState<string | null>(null)

  const { watch, control, setValue } = useFormContext();
  const cardType = watch("initialMode.type");
  const subType = watch("initialMode.sub_type");

  useEffect(() => {
    if (
      cardType.toLowerCase() === 
      previousType?.toLowerCase()) {
      return
    }

    if (
      cardType.toLowerCase().includes("agent") === 
      previousType?.toLowerCase().includes("agent")
    ) {
      // if previousType === "agent" remove one selected subtype form the array (3 > 2 max)
    }

    if (
      cardType.toLowerCase() === "software" &&
      previousType?.toLowerCase() !== "software"
    ) {
      setValue("initialMode.sub_type", []) // Clear subtype if not software
    }

    if (
      cardType.toLowerCase() === "hardware" &&
      previousType?.toLowerCase() !== "hardware"
    ) {
      setValue("initialMode.sub_type", []) // Clear subtype if not hardware
    }

    if (
      cardType.toLowerCase() !== "event" && 
      previousType?.toLowerCase() === "event"
    ) {
      setValue("initialMode.sub_type", []) // Clear subtype if no event
    }

  }, [cardType, previousType]);

  return (
    cardType.toLowerCase() !== "event" ? (
      <Controller
        control={control}
        name="initialMode.type_sub"
        render={({ field }) => {

          return (
            <FormItem className="flex-grow h-full relative">
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value || "Agent"} // update defaultValue
              >
                <FormControl>
                  <SelectTrigger 
                    className={cn(
                      "w-full h-full bg-transparent text-black border-none shadow-none",
                      "focus:ring-0 focus:ring-offset-0",
                      "text-sm font-medium py-0 px-1"
                    )}
                  >
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {cardType && cardType.toLowerCase().includes("agent") && (
                    agentTypes.map((subtype) => (
                      <SelectItem key={subtype} value={subtype.toLowerCase()}>
                        {subtype}
                      </SelectItem>
                    ))
                  )}
                  {cardType && cardType.toLowerCase() === "software" && (
                    ["", "Modification"].map((subtype) => (
                      <SelectItem key={subtype} value={subtype.toLowerCase()}>
                        {subtype}
                      </SelectItem>
                    ))
                  )}
                  {cardType && cardType.toLowerCase() === "hardware" && (
                    ["", "Gear"].map((subtype) => (
                      <SelectItem key={subtype} value={subtype.toLowerCase()}>
                        {subtype}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </FormItem>
          )
        }}
      />
    ) : (
      null
    )
  )
}