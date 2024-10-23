"use client";

import React, { useState, useEffect, useRef } from "react";
// Utils
import { FixedSizeGrid as Grid } from "react-window";
import dynamic from "next/dynamic";
// Types
import { CardsDTO } from "@/app/lib/types/dto";
// Custom components
const CardThumbnail = dynamic(
  () => import("@/components/cards-gallery/card-thumbnail"),
  {
    loading: () => (
      <div className="w-[240px] h-[336px] bg-gray-200 animate-pulse rounded-lg"></div>
    ),
  }
);

type CardsGalleryProps = {
  cards: CardsDTO;
};

type GridChildComponentProps = {
  columnIndex: number;
  rowIndex: number;
  style: React.CSSProperties;
};

export default function CardsGallery({ cards }: CardsGalleryProps) {
  const [thumbnailSize, setThumbnailSize] = useState<"sm" | "md">("md");
  const [dimensions, setDimensions] = useState({ width: 1000, height: 800 });
  const containerRef = useRef<HTMLDivElement>(null);

  const gap = 16;
  const columnWidth = thumbnailSize === "sm" ? 200 : 240;
  const rowHeight = thumbnailSize === "sm" ? 280 : 336;

  const columnCount = Math.max(
    1,
    Math.floor((dimensions.width + gap) / (columnWidth + gap))
  );
  const rowCount = Math.ceil(cards.length / columnCount);
  const totalHeight = rowCount * (rowHeight + gap);

  const Cell = ({ columnIndex, rowIndex, style }: GridChildComponentProps) => {
    const index = rowIndex * columnCount + columnIndex;
    const card = cards[index];
    if (!card) return null;
    return (
      <div
        style={{
          ...style,
          left: `${parseInt(style.left as string) + gap / 2}px`,
          top: `${parseInt(style.top as string) + gap / 2}px`,
          width: `${columnWidth}px`,
          height: `${rowHeight}px`,
        }}
      >
        <CardThumbnail
          cardRender={card.initialMode.render}
          cardName={card.initialMode.name}
          cardId={card.id}
          width={thumbnailSize}
        />
      </div>
    );
  };

  useEffect(() => {
    function handleResize() {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth - gap;
        setDimensions({
          width: containerWidth,
          height: window.innerHeight,
        });
      }
      setThumbnailSize(window.innerWidth < 768 ? "sm" : "md");
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      <Grid
        className="cards-gallery-container"
        columnCount={columnCount}
        columnWidth={columnWidth + gap}
        height={Math.min(totalHeight, dimensions.height)}
        rowCount={rowCount}
        rowHeight={rowHeight + gap}
        width={dimensions.width}
      >
        {Cell}
      </Grid>
    </div>
  );
}
