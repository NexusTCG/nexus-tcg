"use client";

// Hooks
import React from "react";
import { useFormContext } from 'react-hook-form';
// Utils
import clsx from "clsx"
// Components
import { Button } from "@/components/ui/button";

type CardCreatorHeaderProps = {
  activeMode: "initial" | "anomaly";
}

export default function CardCreatorHeader({
  activeMode
}: CardCreatorHeaderProps) {
  const { 
    watch, 
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
        <small className="opacity-50 text-xs">{activeMode.toUpperCase()}</small>
      </div>
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