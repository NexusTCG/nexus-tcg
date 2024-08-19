"use client"

// Hooks
import React from "react"
import { useFormContext } from 'react-hook-form';
// Utils
import clsx from 'clsx';
import { toast } from "sonner"
// Components
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
// Custom components
import StatAdjuster from "@/components/card-creator/stat-adjuster"
// Icons
import { FaBullseye } from "react-icons/fa6";
import { MdOutlineNat } from "react-icons/md";

export default function NexusCardFormStats() {
  const { setValue, watch } = useFormContext();

  const attack = watch('attack');
  const defense = watch('defense');
  const range = watch('range');

  function toggleRange() {
    toast(`Range set to ${range ? 'melee' : 'ranged'}!`);
    setValue('range', !range);
  }

  return (
    <div
      id="card-stats-container"
      className="
        flex
        flex-row
        justify-start
        items-center
        w-[100px]
        bg-black
        p-1.5
        mb-2
        ml-2
        gap-0.5
        rounded-tr-2xl
      "
    >
      <div
        id="range-icon-container"
        onClick={toggleRange}
        className="cursor-pointer"
      >
        {range ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <FaBullseye className="w-[20px] h-[20px] text-neutral-100" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Agent is ranged</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <MdOutlineNat className="w-[20px] h-[20px] text-neutral-100" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Agent is melee</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <div
        id="attack-defense-container"
        className={clsx("flex flex-row justify-center items-center w-full",
          {
            "gap-1": attack > 9 && defense > 9,
            "gap-1.5": attack < 10 && defense < 10,
          }
        )}
      >
        <Popover>
          <PopoverTrigger asChild>
            <p className="font-bold text-xl text-orange-400 cursor-pointer">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    {attack}
                  </TooltipTrigger>
                  <TooltipContent side="left">
                    <p className="font-normal">{attack} attack</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </p>
          </PopoverTrigger>
          <PopoverContent side="top" className="max-w-[180px]">
            <StatAdjuster stat="attack" />
          </PopoverContent>
        </Popover>
        <p className="text-neutral-300">/</p>
        <Popover>
          <PopoverTrigger asChild>
            <p className="font-bold text-xl text-emerald-400 cursor-pointer">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    {defense}
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p className="font-normal">{defense} defense</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </p>
          </PopoverTrigger>
          <PopoverContent side="top" className="max-w-[180px]">
            <StatAdjuster stat="defense" />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}