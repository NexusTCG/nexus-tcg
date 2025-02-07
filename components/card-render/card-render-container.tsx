import React from "react";
// Types
import { EnergyCost } from "@/app/lib/types/components";
// Components
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
// Custom components
import CardRenderFooter from "@/components/card-render/card-render-footer";
import CardRenderGrade from "@/components/card-render/card-render-grade";

type CardContainerProps = {
  children: React.ReactNode;
  mode: "initial" | "anomaly";
  username: string;
  grade: string;
  cardType: string;
  isUncommon?: boolean;
  energyCost?: EnergyCost;
  cardId: number;
};

export default function CardRenderContainer({
  children,
  mode,
  grade,
  username,
  cardType,
  isUncommon,
  energyCost,
  cardId,
}: CardContainerProps) {
  function getCardFrameImage() {
    // Handle texture
    let texture = "";
    if (cardType.includes("hardware")) {
      texture = "hardware";
    } else if (cardType.includes("software")) {
      texture = "software";
    }

    // Handle anomaly mode
    if (mode === "anomaly") {
      return `anomaly${texture ? `-${texture}` : ""}.jpg`;
    }

    // Handle initial mode
    let energyType = "default";
    if (energyCost) {
      const activeTypes = Object.entries(energyCost || {})
        .filter(([type, value]) => value > 0)
        .map(([type]) => type);

      const nonVoidTypes = activeTypes.filter((type) => type !== "void");

      if (nonVoidTypes.length === 0) {
        energyType = "void"; // Void card frame
      } else if (nonVoidTypes.length === 1) {
        energyType = nonVoidTypes[0]; // Mono-energy card frame
      } else if (nonVoidTypes.length === 2) {
        energyType = nonVoidTypes.sort().join("-"); // Dual-energy card frame
      } else if (
        nonVoidTypes.length >= 3 ||
        (nonVoidTypes.length === 2 && activeTypes.includes("void"))
      ) {
        energyType = "multi"; // Multi-energy card frame
      }
    }

    return `${energyType}${texture ? `-${texture}` : ""}.jpg`;
  }

  const cardFrame = getCardFrameImage();
  const cardFrameUrl = `/images/card-frames/${cardFrame}`;

  return (
    <div
      id={`card-render-container-${cardId}-${mode}`}
      style={{
        borderRadius: "16px",
        width: "400px",
        height: "560px",
        position: "relative",
        overflow: "hidden",
      }}
      className="
        flex
        flex-col
        items-center
        bg-black
        pt-3
        px-3
        shadow-lg
      "
    >
      <div
        id="-card-content-container"
        className="
          flex
          flex-col
          justify-start
          items-center
          h-full
          w-full
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
          <div
            className="
              absolute 
              bottom-0 
              right-0 
              z-50 
              p-2
              rounded-tl-2xl 
              bg-black 
              mb-2 mr-2 pl-2.5
            "
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <CardRenderGrade mode={mode} grade={grade} />
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>{grade.charAt(0).toUpperCase() + grade.slice(1)}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
        <CardRenderFooter
          username={username}
          mode={mode}
          isUncommon={isUncommon || false}
        />
      </div>
    </div>
  );
}
