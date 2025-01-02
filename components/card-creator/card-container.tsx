"use client";

// Hooks
import React from "react";
import { useFormContext } from "react-hook-form";
import { useMode } from "@/app/utils/context/CardModeContext";
// Types
import { EnergyCost } from "@/app/lib/types/components";
// Custom components
import CardFormFooter from "@/components/card-creator/card-form-footer";
import GradeCycler from "@/components/card-creator/grade-cycler";

type CardContainerProps = {
  children: React.ReactNode;
};

export default function CardContainer({ children }: CardContainerProps) {
  const { mode } = useMode();
  const { watch } = useFormContext();

  const username = watch("nexus_card_data.username");
  const isUncommon: boolean = watch("anomalyMode.uncommon");
  const energyCost: EnergyCost = watch("initialMode.energy_cost");
  const cardType = watch("initialMode.type");

  function getCardFrameImage() {
    const isSoftware = cardType.includes("software");
    const isHardware = cardType.includes("hardware");

    if (mode === "anomaly") {
      return "anomaly.jpg";
    }

    const activeTypes = Object.entries(energyCost)
      .filter(([type, value]) => value > 0)
      .map(([type]) => type);

    if (activeTypes.length === 0) {
      if (isSoftware) {
        return "default-software.jpg";
      }
      if (isHardware) {
        return "default-hardware.jpg";
      }
      return "default.jpg";
    }

    const nonVoidTypes = activeTypes.filter((type) => type !== "void");

    if (nonVoidTypes.length === 0) {
      if (isSoftware) {
        return "void-software.jpg";
      }
      if (isHardware) {
        return "void-hardware.jpg";
      }
      return "void.jpg";
    }

    if (nonVoidTypes.length === 1) {
      if (isSoftware) {
        return `${nonVoidTypes[0]}-software.jpg`;
      }
      if (isHardware) {
        return `${nonVoidTypes[0]}-hardware.jpg`;
      }
      return `${nonVoidTypes[0]}.jpg`;
    }

    if (nonVoidTypes.length === 2) {
      if (isSoftware) {
        return `${nonVoidTypes.sort().join("-")}-software.jpg`;
      }
      if (isHardware) {
        return `${nonVoidTypes.sort().join("-")}-hardware.jpg`;
      }
      return `${nonVoidTypes.sort().join("-")}.jpg`;
    }

    if (
      nonVoidTypes.length >= 3 ||
      (nonVoidTypes.length === 2 && activeTypes.includes("void"))
    ) {
      if (isSoftware) {
        return "multi-software.jpg";
      }
      if (isHardware) {
        return "multi-hardware.jpg";
      }
      return "multi.jpg";
    }
    return "default.jpg";
  }

  const cardFrame = getCardFrameImage();
  const cardFrameUrl = `/images/card-frames/${cardFrame}`;

  return (
    <div
      id="nexus-card-container"
      style={{ borderRadius: "16px" }}
      className="
        relative
        flex
        flex-col
        items-center
        w-[400px]
        h-[560px]
        bg-black
        overflow-hidden
        pt-3
        px-3
        shadow-lg
      "
    >
      <div
        id="nexus-card-content-container"
        className="
          flex
          flex-col
          justify-start
          items-center
          h-full
          w-full
          min-w-full
          rounded-md
          overflow-hidden
        "
        style={{
          backgroundImage: `url(${cardFrameUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {children}
      </div>
      <div className="w-full z-10">
        {mode === "anomaly" && isUncommon === false ? null : (
          <div className="absolute bottom-0 right-0 z-50 p-2 rounded-tl-2xl bg-black mb-1 mr-1 pl-">
            <GradeCycler />
          </div>
        )}
        <CardFormFooter username={username} />
      </div>
    </div>
  );
}
