"use client";

// Hooks
import React from "react"
import { useFormContext } from 'react-hook-form';
// Utils
import clsx from 'clsx';
import { toast } from "sonner"
// Components
import { Button } from "@/components/ui/button"
// Icons
import { MdAdd, MdRemove } from "react-icons/md";

type StatAdjusterProps = {
  stat: "attack" | "defense";
}

export default function StatAdjuster({ 
  stat,
}: StatAdjusterProps) {
  const { setValue, watch } = useFormContext();
  const currentValue = watch(`initialMode.${stat}`);

  function handleStatChange(
    stat: string, 
    change: number
  ) {
    const newValue = Math.max(0, currentValue + change);
    setValue(`initialMode.${stat}`, newValue);
    toast(`${stat.charAt(0).toUpperCase() + stat.slice(1)} set to ${newValue}!`);
  }

  return (
    <div
      id="stat-adjuster-container"
      className="
        flex 
        flex-col 
        justify-center
        items-center
        gap-2
        w-full
      "
    >
      <div>
        <p>Change {stat}</p>
      </div>
      <div
        id="stat-adjuster-buttons"
        className="
          flex
          flex-row
          justify-center
          items-center
          gap-4
        "
      >
        <Button
          onClick={() => handleStatChange(stat, -1)}
          size="icon"
          disabled={currentValue === 0}
          className={clsx("text-xl font-semibold",
            {
              "bg-orange-500": stat === "attack",
              "bg-emerald-500": stat === "defense",
            }
          )}
        >
          <MdRemove />
        </Button>
        <p className={clsx("text-4xl font-semibold",
          {
            "text-orange-200": stat === "attack",
            "text-emerald-200": stat === "defense",
          }
        )}>
          {currentValue}
        </p>
        <Button
          onClick={() => handleStatChange(stat, 1)}
          size="icon"
          disabled={currentValue === 20}
          className={clsx("text-xl font-semibold",
            {
              "bg-orange-500 hover:bg-orange-300": stat === "attack",
              "bg-emerald-500 hover:bg-emerald-300": stat === "defense",
            }
          )}
        >
          <MdAdd />
        </Button>
      </div>
    </div>
  )
}