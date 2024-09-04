"use client"

import React from "react";
import { useFormContext } from 'react-hook-form';
// Utils
import clsx from "clsx"
import { calculateBgColor } from "@/app/utils/actions/actions";
// Custom components
import KeywordSelect from "@/components/card-creator/keyword-select";

type CardFormTextBoxProps = {
  activeMode: "initial" | "anomaly"
}

export default function CardFormTextBox({
  activeMode
}: CardFormTextBoxProps) {
  
  const { watch } = useFormContext();
  const cardGrade = watch("grade")
  const energyCost = watch('initialMode.energy_cost');

  const cardText = 150; // Placeholder

  const bgColorClass50 = activeMode === "anomaly" ? null : calculateBgColor(energyCost, 50)[0];

  return (
    <div
      id="card-form-text-container"
      style={{ fontSize: "0.85rem" }}
      className={clsx(
        "flex flex-col justify-start items-start w-full h-full px-2 pt-1.5 pb-2.5 gap-2 text-black border border-b-2",
        bgColorClass50 || "bg-neutral-50",
      )}
    >
      {activeMode === "initial" && (
        <KeywordSelect
          cardGrade={
            cardGrade 
              ? cardGrade.toLowerCase() 
              : "core"
            } 
          truncateKeywords={cardText > 150 ? true : false} 
        />
      )}
      {/* Text Component */}
      {/* Lore Text Component */}
    </div>
  );
}