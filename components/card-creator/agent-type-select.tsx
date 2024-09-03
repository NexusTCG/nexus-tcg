"use client";

// Hooks
import React, { useState, useEffect } from "react";
import { useFormContext } from 'react-hook-form';
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

export default function AgentTypeSelect() {
  const [previousType, setPreviousType] = useState<string | null>(null)

  const { watch, control, setValue } = useFormContext();
  const cardType = watch("initialMode.type");
  const cardSubType = watch("initialMode.type_sub");

  // 
  useEffect(() => {
    if (cardType === previousType 
        && previousType !== null
    ) {
      return
    }

    if (cardType === "agent" 
        && previousType !== null 
        && previousType.includes("agent")
    ) {
      setPreviousType(cardType)
      return
    }

    if (cardType !== "agent" 
        && cardType.includes("agent")
        && previousType !== null 
        && previousType.includes("agent")
    ) {
      if (cardSubType.length > 2) {
        setValue(
          "initialMode.type_sub", 
          cardSubType.slice(0, 2)
        )
      }
      setPreviousType(cardType)
      return
    }

    setValue("initialMode.type_sub", [])
    setPreviousType(cardType)
  }, [
    cardType, 
    previousType
  ])

  return (
    <FormField
      control={control}
      name="initialMode.type_sub"
      render={({ field }) => (
        <FormItem className="flex-grow h-full relative">
          <Select
            onValueChange={(value) => {
              const currentValue = Array.isArray(field.value) 
                ? field.value 
                : [];
              const newValue = currentValue.includes(value)
                ? currentValue.filter((t) => t !== value)
                : currentValue.length < 3 
                  ? [...currentValue, value] 
                  : currentValue;
              field.onChange(newValue);
            }}
            value={
              Array.isArray(field.value) 
                && field.value.length > 0 
                  ? field.value[field.value.length - 1] 
                  : undefined
                }
          >
            <FormControl>
              <SelectTrigger 
                className={cn(
                  "w-full h-full bg-transparent text-black border-none shadow-none",
                  "focus:ring-0 focus:ring-offset-0",
                  "text-sm font-medium py-0 px-1"
                )}
              >
                <SelectValue placeholder="Select subtype">
                  {Array.isArray(field.value) && field.value.length > 0
                    ? field.value.join(' ')
                    : "Select agent types..."}
                </SelectValue>
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {agentTypes.map((type) => (
                <SelectItem 
                  key={type} 
                  value={type}
                  disabled={
                    field.value &&
                    ((cardType.toLowerCase().includes("ware") && field.value.length >= 2) ||
                    (!cardType.toLowerCase().includes("ware") && field.value.length >= 3)) &&
                    !field.value.includes(type)
                  }
                >
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
}