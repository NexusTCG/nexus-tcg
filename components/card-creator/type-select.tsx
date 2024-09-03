"use client";

// Hooks
import React, { useState, useEffect } from "react";
import { useFormContext } from 'react-hook-form';
// Utils
import { cn } from "@/lib/utils";
// Validation
import { cardTypes } from "@/app/lib/data/data";
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

export default function TypeSelect() {
  const [previousType, setPreviousType] = useState<string | null>("agent")

  const { watch, control, setValue } = useFormContext();
  const cardType = watch("initialMode.type");
  const cardSubType = watch("initialMode.type_sub");

  useEffect(() => {
    // If new type is same as old, return
    if (cardType === previousType && previousType !== null) {
      return;
    }
  
    if (cardType === "event") {
      setValue("initialMode.type_sub", []);
      setPreviousType(cardType);
      return;
    }
  
    // If new type is "agent" and previous type includes "agent"
    if (cardType === "agent" && previousType !== null && previousType.includes("agent")) {
      setPreviousType(cardType);
      return;
    }
  
    // If new type is "agent" and previous type does not include "agent"
    if (cardType === "agent" && (previousType === null || !previousType.includes("agent"))) {
      setValue("initialMode.type_sub", []);
      setPreviousType(cardType);
      return;
    }
  
    // If new type is not "agent" but includes "agent" and previous type includes "agent"
    if (cardType !== "agent" && cardType.includes("agent") && previousType !== null && previousType.includes("agent")) {
      if (Array.isArray(cardSubType) && cardSubType.length > 2) {
        setValue("initialMode.type_sub", cardSubType.slice(0, 2));
      }
      setPreviousType(cardType);
      return;
    }
  
    // If new type is "software" or "hardware"
    if (cardType === "software" || cardType === "hardware") {
      setValue("initialMode.type_sub", "default");
    } else {
      setValue("initialMode.type_sub", []);
    }
  
    setPreviousType(cardType);
  }, [cardType, previousType, cardSubType, setValue]);

  return (
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
                  "text-sm font-medium py-0 px-1"
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
  )
}