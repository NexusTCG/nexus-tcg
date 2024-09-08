"use client"

import React from "react";
import { useFormContext } from 'react-hook-form';
// Utils
import clsx from "clsx"
import { calculateBgColor } from "@/app/utils/actions/actions";
// Custom components
import KeywordSelect from "@/components/card-creator/keyword-select";
import CardText from "@/components/card-creator/card-text";
import LoreText from "@/components/card-creator/lore-text";

type CardFormTextBoxProps = {
  activeMode: "initial" | "anomaly"
}

export default function CardFormTextBox({
  activeMode
}: CardFormTextBoxProps) {
  const { watch } = useFormContext();
  const cardGrade = watch("nexus_card_data.grade")
  const energyCost = watch('initialMode.energy_cost');
  const keywords = watch('initialMode.keywords');
  const cardText = watch(`${activeMode}Mode.text`)

  const bgColorClass50 = activeMode === "anomaly" ? null : calculateBgColor(energyCost, 50)[0];

  return (
    <div
      id="card-form-text-container"
      style={{ fontSize: "0.85rem" }}
      className={clsx(
        "flex flex-col justify-start items-start",
        "w-full h-full px-2 pt-1.5 pb-2.5 gap-1.5",
        "border border-b-2 resize-none",
        bgColorClass50 || "bg-neutral-50",
      )}
    >
      {activeMode === "initial" && (
        <div className="flex-shrink-0">
          <KeywordSelect
            cardGrade={
              cardGrade 
                ? cardGrade.toLowerCase() 
                : "core"
              } 
            truncateKeywords={
              (cardText > 150 ? true : false) || 
              (keywords.length > 2 ? true : false)
            } 
          />
        </div>
      )}
      {/* {activeMode === "initial" && (
        <div className="flex-shrink-0 w-full">
          <KeywordDrawer
            cardGrade={
              cardGrade 
                ? cardGrade.toLowerCase() 
                : "core"
              } 
            truncateKeywords={
              (cardText > 150 ? true : false) || 
              (keywords.length > 2 ? true : false)
            } 
          />
        </div>
      )} */}
      <div className="flex-grow w-full overflow-hidden">
        <CardText 
          activeMode={activeMode}
        />
      </div>
      {cardText.length < 150 && keywords.length <= 2 && (
        <div className="flex-shrink-0 w-full">
          <LoreText activeMode={activeMode} />
        </div>
      )}
    </div>
  );
}