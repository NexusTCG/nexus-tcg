"use client";

// Hooks
import React from 'react';
import { useFormContext } from 'react-hook-form';
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
  const { watch, setValue } = useFormContext();
  const speed = watch('speed');

  function cycleSpeed() {
    const nextSpeed = speed % 3 + 1;
    setValue('anomalyMode.speed', nextSpeed);
    toast(`Speed changed to ${nextSpeed}!`);
  };

  console.log('speed', speed);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger onClick={cycleSpeed}>
          <SpeedIcon type={speed} />
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Change to speed {speed === 3 ? 1 : speed + 1}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}