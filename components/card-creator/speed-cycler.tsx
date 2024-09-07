"use client";

// Hooks
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useMode } from "@/app/utils/context/CardFormModeContext"
// Components
import { toast } from "sonner"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
// Custom components
import SpeedIcon from "@/components/card-creator/speed-icon";

export default function SpeedCycler() {
  const { mode } = useMode();
  const { watch, setValue } = useFormContext();
  const speed = watch('initialMode.speed');

  function cycleSpeed(
    e: React.MouseEvent
  ) {
    e.preventDefault();
    e.stopPropagation();
    const nextSpeed = speed % 3 + 1;
    setValue('initialMode.speed', nextSpeed);
    toast(`Speed changed to ${nextSpeed}!`);
  };
  return (
    <>
      {mode === "initial" ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              onClick={cycleSpeed}
            >
              <SpeedIcon type={speed} />
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Change to speed {speed === 3 ? 1 : speed + 1}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <SpeedIcon type={speed} />
      )}
    </>
  );
}