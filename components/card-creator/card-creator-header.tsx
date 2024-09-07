"use client";

// Hooks
import React from "react";
import { useFormContext } from 'react-hook-form';
import { useMode } from "@/app/utils/context/CardFormModeContext";
// Components
import { Button } from "@/components/ui/button";

export default function CardCreatorHeader() {
  const { mode } = useMode();
  const { 
    watch, 
    setValue,
    formState: { 
      isSubmitting, 
      isValid 
    } 
  } = useFormContext();
  const cardName = watch("initialMode.name");
  
  return (
    <div
      id="card-creator-header"
      className="
        flex
        flex-row
        justify-between
        items-center
        w-full
        px-4
        py-2
        bg-zinc-900
        border-b
        border-zinc-700
      "
    >
      <div
        id="card-creator-header-content"
        className="
          flex
          flex-col
          justify-start
          items-start
          gap-0.5
        "
      >
        <h2 className="font-medium">{cardName ? cardName : "Card name"}</h2>
        <small className="opacity-50 text-xs">{mode.toUpperCase()}</small>
      </div>
      {isValid.toString()}
      <Button
        type="submit"
        disabled={!isValid || isSubmitting}
        size="sm"
        className="font-semibold"
      >
        Finish
      </Button>
    </div>
  )
}