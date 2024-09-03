"use client";

// Hooks
import React from "react";
import { useFormContext } from 'react-hook-form';
// Utils
import { cn } from "@/lib/utils";
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
  const { watch, control } = useFormContext();
  const cardType = watch("initialMode.type");

  return (
    <FormField
      control={control}
      name="initialMode.type_sub"
      render={({ field }) => (
        <FormItem className="flex-grow h-full relative">
          <Select
            onValueChange={field.onChange}
            value={field.value || undefined}
          >
            <FormControl>
              <SelectTrigger 
                className={cn(
                  "w-full h-full bg-transparent text-black border-none shadow-none",
                  "focus:ring-0 focus:ring-offset-0",
                  "text-sm font-medium py-0 px-1"
                )}
              >
                <SelectValue placeholder="Select subtype" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="default" style={{ height: "30px" }}></SelectItem>
              {cardType === "software" && (
                <SelectItem value="modification">
                  Modification
                </SelectItem>
              )}
              {cardType === "hardware" && (
                <SelectItem value="gear">
                  Gear
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
}