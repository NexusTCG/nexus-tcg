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
import { Button } from "@/components/ui/button";
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

  const attack = watch('initialMode.attack');
  const defense = watch('initialMode.defense');
  const reach = watch('initialMode.reach');

  function toggleReach(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    toast(`Reach set to ${reach ? 'melee' : 'ranged'}!`);
    setValue('initialMode.reach', !reach);
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
        pl-2
        pr-1.5
        pb-2
        pt-1
        mb-2
        ml-2
        gap-0.5
        rounded-tr-2xl
      "
    >
      <div
        id="reach-icon-container"
        onClick={toggleReach}
        className="cursor-pointer"
      >
        {reach ? (
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
        className={clsx("flex flex-row justify-center items-center w-full pb-1",
          {
            "gap-0.5": attack > 9 && defense > 9,
            "gap-1": attack <= 9 || defense <= 9,
            "gap-1.5": attack <= 9 && defense <= 9,
          }
        )}
      >
        <Popover>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              className="
                p-0
                h-auto
                bg-transparent
                hover:bg-transparent
                active:bg-transparent
                focus:bg-transparent
              "
            >
              <p className="font-bold text-xl text-orange-400 cursor-pointer">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <>{attack}</>
                    </TooltipTrigger>
                    <TooltipContent side="left">
                      <p className="font-normal">{attack} attack</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </p>
            </Button>
          </PopoverTrigger>
          <PopoverContent side="top" className="max-w-[180px]">
            <StatAdjuster stat="attack" />
          </PopoverContent>
        </Popover>
        <p className="text-neutral-300">/</p>
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              type="button" 
              variant="ghost" 
              className="p-0 h-auto bg-transparent hover:bg-transparent active:bg-transparent focus:bg-transparent"
            >
              <p className="font-bold text-xl text-emerald-400 cursor-pointer">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <>{defense}</>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p className="font-normal">{defense} defense</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </p>
            </Button>
          </PopoverTrigger>
          <PopoverContent side="top" className="max-w-[180px]">
            <StatAdjuster stat="defense" />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}