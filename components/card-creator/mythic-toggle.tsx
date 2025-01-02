"use client";

// Hooks
import React from "react";
import { useFormContext } from "react-hook-form";
import { useMode } from "@/app/utils/context/CardModeContext";
// Utils
import Image from "next/image";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
// Components
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
// Icons
import { mythicIcon } from "@/app/lib/data/icons";

type MythicToggleProps = {
  activeMode: "initial" | "anomaly";
};

export default function MythicToggle({ activeMode }: MythicToggleProps) {
  const { mode } = useMode();
  const { watch, setValue } = useFormContext();

  const isMythic = watch(`${activeMode}Mode.mythic`);
  const isUncommon = watch("anomalyMode.uncommon");

  if (activeMode === "anomaly" && !isUncommon) {
    return null;
  }

  // Check if the form is active
  const isActiveForm = mode === activeMode;

  function handleMythicToggle() {
    if (!isActiveForm) return;

    setValue(`${activeMode}Mode.mythic`, !isMythic);
    toast(
      `${activeMode.charAt(0).toUpperCase() + activeMode.slice(1)} mode ${
        !isMythic ? "is now" : "is no longer"
      } mythic!`
    );
  }

  return (
    <button
      type="button"
      onClick={handleMythicToggle}
      disabled={!isActiveForm}
      className={cn(
        "flex justify-center items-center",
        "transition-all duration-300",
        "pl-1 pr-0.5",
        !isActiveForm && "cursor-default"
      )}
    >
      <>
        {isActiveForm ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Image
                  src={mythicIcon}
                  alt="Mythic Icon"
                  width={20}
                  height={24}
                  className={cn(
                    isMythic && "hover:opacity-80",
                    !isMythic && "hover:opacity-40",
                    !isMythic && "opacity-40"
                  )}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {isMythic
                    ? `This card's ${activeMode} mode is mythic. Click to remove mythic.`
                    : `This card's ${activeMode} mode is not mythic. Click to make mythic.`}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <Image
            src={mythicIcon}
            alt="Mythic Icon"
            width={20}
            height={24}
            className={cn(!isMythic && "opacity-40")}
          />
        )}
      </>
    </button>
  );
}
