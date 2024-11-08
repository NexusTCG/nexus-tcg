import React from "react";
// Utils
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
// Components
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
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
    <div
      className={clsx(
        "relative aspect-[5/7]",
        width === "sm" && "w-[200px]",
        width === "md" && "w-[240px]"
      )}
    >
      {/* <TooltipProvider>
        <Tooltip>
          <TooltipTrigger> */}
      <Link
        href={`/cards/${cardId}`}
        className={clsx(
          "block w-full h-full rounded-lg overflow-hidden",
          "cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300 hover:border-foreground/20",
          "hover:border hover:border-teal-500"
        )}
      >
        <Image
          src={cardRender || "/images/nexus-tcg-card-back.png"}
          alt={cardName || "Card"}
          fill
          className="object-cover"
        />
      </Link>
      {/* </TooltipTrigger>
          <TooltipContent>{cardName}</TooltipContent>
        </Tooltip>
      </TooltipProvider> */}
    </div>
  );
}
