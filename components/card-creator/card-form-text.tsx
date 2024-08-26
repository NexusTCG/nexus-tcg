"use client"

import React from "react";
import { useFormContext } from 'react-hook-form';
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

export default function CardFormText() {
  const { watch, setValue } = useFormContext();

  return (
    <div
      id="card-form-text-container"
      style={{ fontSize: "0.85rem" }}
      className="
        flex
        flex-col
        justify-start
        items-start
        w-full
        h-full
        gap-2
        p-2
        bg-yellow-50
        text-black
        border
        border-b-2
      "
    >
      <Select>
        <SelectTrigger className="w-full rounded-sm text-white">
          <SelectValue placeholder="Effect" />
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
    </div>
  )
}