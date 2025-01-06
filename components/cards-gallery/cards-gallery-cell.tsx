import React from "react";
// Utils
import dynamic from "next/dynamic";
// Types
import { CardDTO, CardsDTO } from "@/app/lib/types/dto";
// Custom components
const CardThumbnail = dynamic(
  () => import("@/components/cards-gallery/card-thumbnail"),
  { ssr: false }
);

type CardsGalleryCellProps = {
  columnIndex: number;
  rowIndex: number;
  style: React.CSSProperties;
  data: {
    cards: CardsDTO;
    columnCount: number;
    columnWidth: number;
    rowHeight: number;
    gap: number;
    thumbnailSize: "sm" | "md";
  };
};

export default function CardsGalleryCell({
  columnIndex,
  rowIndex,
  style,
  data,
}: CardsGalleryCellProps) {
  const { cards, columnCount, columnWidth, rowHeight, gap, thumbnailSize } =
    data;

  const index = rowIndex * columnCount + columnIndex;
  const card: CardDTO | undefined = cards[index];

  if (!card) return null;

  const cardRender = card.card_render;
  const cardName = card.initialMode?.name;

  return (
    <div
      style={{
        ...style,
        left: `${parseInt(style.left as string) + gap / 2}px`,
        top: `${parseInt(style.top as string) + gap / 2}px`,
        width: `${columnWidth}px`,
        height: `${rowHeight}px`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CardThumbnail
        cardRender={cardRender}
        cardName={cardName}
        cardId={card.id}
        width={thumbnailSize}
      />
    </div>
  );
}
