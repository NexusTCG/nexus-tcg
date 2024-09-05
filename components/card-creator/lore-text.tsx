"use client";

import React from "react";
import { useFormContext } from 'react-hook-form';
// Utils
import clsx from "clsx"
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
import { Textarea } from "@/components/ui/textarea";

type LoreTextProps = {
  activeMode: "initial" | "anomaly"
}

export default function LoreText({
  activeMode
}: LoreTextProps) {
  const { 
    control, 
    watch, 
    formState: { 
      isSubmitting
  }} = useFormContext();
  const cardEnergyCost: EnergyCost = watch('initialMode.energy_cost') || {
    light: 0,
    storm: 0,
    dark: 0,
    chaos: 0,
    growth: 0,
    void: 0,
  };

  const bgColorClass200 = activeMode === "anomaly" 
    ? null : calculateBgColor(cardEnergyCost, 200)[0];

  return (
    <FormField
      control={control}
      name={
        activeMode === "initial" 
          ? "initialMode.lore" 
          : "anomalyMode.lore"
      }
      render={({ field }) => (
        <FormItem className="w-full">
          <FormControl>
            <Textarea
              {...field}
              disabled={isSubmitting}
              maxLength={50}
              placeholder={`Enter ${activeMode} mode lore text...`}
              className={clsx(
                "w-full text-black text-xs italic font-normal card-text-input caret-black py-1 px-1.5",
                "rounded-sm outline-none border-none focus:ring-0 focus:outline-none resize-none overflow-hidden",
                bgColorClass200 || 'bg-neutral-200'
              )}
              style={{
                minHeight: '36px',
                maxHeight: '36px'
              }}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}