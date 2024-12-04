"use client";

import React from "react";
// Hooks
import { useSubscription } from "@/app/utils/hooks/hooks";
// Utils
import { toast } from "sonner";
import clsx from "clsx";
// Types
import { TIER_CONFIG } from "@/app/lib/types/components";
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
  const [isHovered, setIsHovered] = React.useState(false);

  if (error) {
    toast.error("Failed to load subscription status");
    return null;
  }

  if (isLoading) {
    return <Loader2 className="h-[1.2rem] w-[1.2rem] animate-spin" />;
  }

  const refreshText = daysUntilRefresh
    ? `Credits refreshing in ${daysUntilRefresh} days`
    : "Credits refreshed today";

  const planName = Object.values(TIER_CONFIG).find(
    (tier) => tier.name.toLowerCase() === plan
  )?.name;

  if (!credits) return null;

  const PlanButton = (
    <Button
      variant="ghost"
      size={isCollapsed ? "icon" : "lg"}
      className={clsx(
        "flex flex-col justtify center items-center w-full font-normal z-50",
        {
          "px-2 ph-auto justify-start min-h-[3rem]": !isCollapsed,
          "hover:bg-sky-500/20": planName === "Rare" && !isCollapsed,
          "hover:bg-violet-500/20": planName === "Epic" && !isCollapsed,
          "hover:bg-pink-500/20": planName === "Prime" && !isCollapsed,
        }
      )}
      onClick={() =>
        window.open(process.env.NEXT_PUBLIC_STRIPE_PRICING_PAGE!, "_blank")
      }
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
        <>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className="
                    flex
                    flex-col 
                    justify-center 
                    items-center 
                    w-full 
                    gap-0.5 
                    mt-1 
                    mb-0.5
                    text-left
                  "
                >
                  <span
                    className={clsx("text-sm w-full", {
                      "text-zinc-300": planName === "Core", // Tier 1 (free)
                      "text-sky-300": planName === "Rare", // Tier 2
                      "text-violet-300": planName === "Epic", // Tier 3
                      "text-pink-300": planName === "Prime", // Tier 4
                    })}
                  >
                    {planName} plan
                  </span>
                  <span className="text-xs text-muted-foreground w-full h-5 relative">
                    <span
                      className={clsx(
                        "absolute inset-0 transition-opacity duration-200",
                        isHovered ? "opacity-0" : "opacity-100"
                      )}
                    >
                      <span className="text-foreground">{credits}</span> credits
                      left
                    </span>
                    <span
                      className={clsx(
                        "absolute inset-0 transition-opacity duration-200",
                        isHovered ? "opacity-100" : "opacity-0"
                      )}
                    >
                      {refreshText}
                    </span>
                  </span>
                </div>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className="flex flex-col max-w-[200px]"
              >
                <p className="text-xs">Manage plan on Stripe</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </>
      )}
    </Button>
  );

  if (isCollapsed) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{PlanButton}</TooltipTrigger>
          <TooltipContent side="right">
            <p
              className={clsx("text-sm w-full", {
                "text-zinc-300": planName === "Core", // Tier 1 (free)
                "text-sky-300": planName === "Rare", // Tier 2
                "text-violet-300": planName === "Epic", // Tier 3
                "text-pink-300": planName === "Prime", // Tier 4
              })}
            >
              {planName} plan
            </p>
            <p className="text-xs text-muted-foreground">
              <span className="text-foreground">{credits}</span> credits left •{" "}
              {refreshText}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return PlanButton;
}
