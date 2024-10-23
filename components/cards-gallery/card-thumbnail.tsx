import React from "react";
// Utils
import clsx from "clsx";
import dynamic from "next/dynamic";
import Link from "next/link";
const Image = dynamic(() => import("next/image"), {
  loading: () => (
    <div className="w-full h-full bg-gray-200 animate-pulse rounded-lg"></div>
  ),
});
// Components
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

type CardThumbnailProps = {
  cardRender: string | undefined | null;
  cardName: string | undefined | null;
  cardId: number | undefined | null;
  width: "sm" | "md";
};

export default function CardThumbnail({
  cardRender,
  cardName,
  cardId,
  width,
}: CardThumbnailProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={clsx(
              "relative aspect-[5/7]",
              width === "sm" && "w-[200px]",
              width === "md" && "w-[240px]"
            )}
          >
            <Link
              href={`/cards/${cardId}`}
              className={clsx(
                "block w-full h-full rounded-lg overflow-hidden",
                "cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300 hover:border-foreground/20"
              )}
            >
              <Image
                src={cardRender || "/images/card-placeholder.png"}
                alt={cardName || "Card"}
                fill
                className="object-cover"
              />
            </Link>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{cardName ? cardName : "Card Name"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
