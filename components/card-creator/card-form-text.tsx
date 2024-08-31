"use client"

import React from "react";
import { useFormContext } from 'react-hook-form';
// Utils
import clsx from "clsx"
import { calculateBgColor } from "@/app/utils/actions/actions";
// Components
import { Separator } from "@radix-ui/react-separator";
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type CardFormHeaderProps = {
  activeMode: "initial" | "anomaly"
}

export default function CardFormText({
  activeMode
}: CardFormHeaderProps) {

  const { watch, setValue } = useFormContext();
  const energyCost = watch('initialMode.energy_cost');
  
  const bgColorClass50 = activeMode === "anomaly" ? null : calculateBgColor(energyCost, 50)[0];

  return (
    <div
      id="card-form-text-container"
      style={{ 
        fontSize: "0.85rem" 
      }}
      className={clsx(
        "flex flex-col justify-start items-star w-full h-full gap-2 p-2 text-black border border-b-2",
        bgColorClass50 || "bg-neutral-50",
      )}
    >
      {activeMode === "initial" ? (
        <Select>
          <SelectTrigger className="w-full rounded-sm text-white">
            <SelectValue placeholder="Card effect" />
          </SelectTrigger>
          <SelectContent
            className="flex flex-wrap justify-start w-full max-w-[312px]"
          >
            <SelectItem value="light">Short Text</SelectItem>
            <SelectItem value="dark">Medium Text</SelectItem>
            <SelectItem value="long-text">Long Text</SelectItem>
            <Separator orientation="horizontal" />
            <SelectItem value="evasion">Evasion <i>(Can only be defended by agents with evasion or intercept.)</i></SelectItem>
            <SelectItem value="threat">Threat</SelectItem>
            <Separator orientation="horizontal" />
            <SelectItem value="deploy">Deploy</SelectItem>
            <SelectItem value="despawn">despawn</SelectItem>
          </SelectContent>
        </Select>
      ) : (
        // TODO: Register in form
        <Textarea
          placeholder="Some card text..."
          className="
            w-full
            h-full 
            p-0 
            text-bd
            text-black 
            rounded-none
            bg-transparent 
            resize-none 
            border-none
            focus:bg-black/5
            focus:border-none
            focus-outline-none
            focus-visible:ring-0 
            focus-visible:ring-offset-0
          "
        />
      )}
    </div>
  )
}