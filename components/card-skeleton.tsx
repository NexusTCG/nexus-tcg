import React from "react";
// Utils
import clsx from "clsx";
// Components
import { Skeleton } from "@/components/ui/skeleton";

type CardSkeletonProps = {
  height?: "full" | "half";
};

export default function CardSkeleton({ height }: CardSkeletonProps) {
  return (
    <Skeleton
      className={clsx("w-full h-full max-h-[400px]", {
        "h-1/2 max-h-[200px]": height === "half",
      })}
    />
  );
}
