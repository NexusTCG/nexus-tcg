"use client";

import React from "react";
// Hooks
import { useSubscription } from "@/app/utils/hooks/hooks";
// Utils
import { toast } from "sonner";
import clsx from "clsx";
// Components
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
type SidebarPlanStatusProps = {
  isCollapsed: boolean;
};

export default function SidebarPlanStatus({
  isCollapsed,
}: SidebarPlanStatusProps) {
  const { plan, credits, daysUntilRefresh, isLoading, error } =
    useSubscription();

  if (error) {
    toast.error("Failed to load subscription status");
    return null;
  }

  if (isLoading) {
    return <Loader2 className="h-[1.2rem] w-[1.2rem] animate-spin" />;
  }

  const refreshText = daysUntilRefresh
    ? `Credits refreshing in ${daysUntilRefresh} days`
    : "Credits refresh today";

  const PlanButton = (
    <Button
      variant="outline"
      size={isCollapsed ? "icon" : "lg"}
      className={clsx(
        "flex flex-col justtify center items-center w-full font-normal",
        {
          "px-2 ph-auto justify-start min-h-[3rem]": !isCollapsed,
        }
      )}
      onClick={() =>
        (window.location.href = process.env.NEXT_PUBLIC_STRIPE_PRICING_PAGE!)
      }
    >
      {isCollapsed ? (
        <div
          className="
            flex 
            items-center 
            justify-center
          "
        >
          <span className="text-xs">{credits}</span>
        </div>
      ) : (
        <div
          className="
            flex
            flex-col 
            justify-center 
            items-center 
            w-full 
            gap-0.5 
            mt-1 
            text-left
          "
        >
          <span className="text-sm w-full">
            {plan === "free" ? "Free plan" : "Pro plan"}
          </span>
          <span className="text-xs opacity-50 w-full">
            {credits} credits left • {refreshText}
          </span>
        </div>
      )}
    </Button>
  );

  if (isCollapsed) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{PlanButton}</TooltipTrigger>
          <TooltipContent side="right">
            <p>{plan === "free" ? "Free Plan" : "Pro Plan"}</p>
            <p className="text-xs opacity-50">
              {credits} generations remaining • {refreshText}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return PlanButton;
}
