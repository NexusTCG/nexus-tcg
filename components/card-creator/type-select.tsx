"use client";

// Hooks
import React from "react";
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
  const { control } = useFormContext();

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