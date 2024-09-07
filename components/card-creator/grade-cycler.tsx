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
import GradeIcon from "@/components/card-creator/grade-icon";

const grades = ["core", "uncommon", "rare", "prime"] as const;
type Grade = typeof grades[number];

function getNextGrade(
  currentGrade: Grade,
): Grade {
  const currentIndex = grades.indexOf(currentGrade);
  return grades[(currentIndex + 1) % grades.length];
}

export default function GradeCycler() {
  const { 
    watch, 
    setValue, 
    formState: { 
      isSubmitting 
    } 
  } = useFormContext();
  
  const grade = watch('nexus_card_data.grade') as Grade;

  function cycleGrade(
    e: React.MouseEvent 
  ) {
    e.preventDefault();
    e.stopPropagation();
    const nextGrade = getNextGrade(grade);
    setValue('nexus_card_data.grade', nextGrade);
    toast(`Grade changed to ${nextGrade}!`);
  }

  return (
    <div
      className="
        w-[32px] 
        h-[32px] 
        hover:cursor-pointer 
        hover:brightness-125 
        hover:saturate-125
      "
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            onClick={cycleGrade}
            disabled={isSubmitting}
          >
            <GradeIcon
              type={grade} 
            />
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Change to {getNextGrade(grade)}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}