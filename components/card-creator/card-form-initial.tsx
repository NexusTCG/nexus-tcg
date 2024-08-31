"use client"

// Hooks
import React from "react"
import { useFormContext } from 'react-hook-form';
// Utils
import clsx from "clsx"
// Actions
import { calculateBgColor } from "@/app/utils/actions/actions";
// Custom components
import CardContainer from "@/components/card-creator/card-container";
import CardFormArt from "@/components/card-creator/card-form-art"
import CardFormText from "@/components/card-creator/card-form-text"
import CardFormHeader from "@/components/card-creator/card-form-header";
import CardFormStats from "@/components/card-creator/card-form-stats";

export default function CardFormInitial() {
  const { watch } = useFormContext();

  const activeType = watch("initialMode.type");
  const energyCost = watch("form.initialMode.energy_cost");

  const bgColorClass500 = calculateBgColor(energyCost, 500)[0];

  return (
    <CardContainer>
      <CardFormHeader activeMode={"initial"} />
      <div
        id="card-content-container"
        className="
          flex
          flex-col
          justify-center
          items-center
          w-full
          h-full
          px-2
          border-x
        "
      >
        <CardFormArt />
        <div
          id="card-text-outer-container"
          className="
            flex
            flex-col
            justify-center
            items-center
            w-full
            h-full
            p-2
            pb-3
            -mt-4
          "
        >
          <div
            id="card-text-outer-container"
            className={clsx(
              "flex flex-col justify-center items-center w-full h-full p-1 border-2 shadow-md shadow-black/50 rounded-sm",
              bgColorClass500 || "bg-neutral-500"
            )}
          >
            <CardFormText activeMode="initial" />
          </div>
        </div>
      </div>
      {activeType === "agent" && (
        <div className="absolute bottom-0 left-0 z-10">
          <CardFormStats />
        </div>
      )}
    </CardContainer>
  )
}