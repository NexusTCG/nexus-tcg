"use client";

import React from "react";
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
import { Textarea } from "@/components/ui/textarea";

type CardFormHeaderProps = {
  activeMode: "initial" | "anomaly"
}

export default function LoreText({
  activeMode
}: CardFormHeaderProps) {
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

  const bgColorClass100 = activeMode === "anomaly" 
    ? null : calculateBgColor(cardEnergyCost, 100)[0];

  return (
    <div
      id="card-form-header-container"
      style={{ maxHeight: "44px" }}
      className={clsx(
        "flex flex-row justify-start items-start",
        "w-full px-2 py-1.5 rounded-sm",
        bgColorClass100 || 'bg-neutral-100'
      )}
    >
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
                maxLength={150}
                placeholder={`Enter ${activeMode} mode lore text...`}
                className="
                  w-full
                  h-full
                  bg-transparent
                  text-black
                  rounded-none
                  outline-none
                  border-none
                  focus:ring-0
                  focus:outline-none
                  caret-black
                  p-0
                  card-text-input
                  resize-none
                  italic
                  text-xs
                  font-normal
                "
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}