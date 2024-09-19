import React from "react";
// Utils
import Image from "next/image";
// Types
import { CardDTO } from "@/app/lib/types/dto";
import { EnergyCost } from "@/app/lib/types/components"
// Custom components
import CardRenderContainer from "@/components/card-render/card-render-container";

type CardRenderProps = {
  card: CardDTO;
  mode: "initial" | "anomaly";
};

export default function CardRender({ 
  card,
  mode, 
}: CardRenderProps) {
  const cardData = mode === "initial" 
    ? card.initialMode 
    : card.anomalyMode;
  const cardName = mode === "initial" 
    ? card.initialMode.name 
    : card.anomalyMode.uncommon 
      ? card.anomalyMode.name 
      : "Common Anomaly";
  const cardArt = mode === "initial" 
    ? card.initialMode.art_options?.[card.initialMode.art_selected] 
    : card.anomalyMode.uncommon 
      ? card.anomalyMode.art_options?.[card.anomalyMode.art_selected] 
      : "/images/default-anomaly-art.webp";

  return (
    <CardRenderContainer 
      mode={mode} 
      username={card.username || ""} 
      grade={card.grade || ""} 
      isUncommon={card.anomalyMode.uncommon} 
      energyCost={card.initialMode.energy_cost as EnergyCost}
    >
      <div>
        <h1>{cardName}</h1>
        <Image 
          src={cardArt || (mode === "initial" ? "/images/default-art.jpg" : "/images/default-anomaly-art.webp")} 
          alt={cardData.name} 
          width={200} 
          height={200} 
        />
      </div>
    </CardRenderContainer>
  );
}