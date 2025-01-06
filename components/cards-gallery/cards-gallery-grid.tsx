"use client";

import React, { useState, useEffect, useRef } from "react";
// Utils
import dynamic from "next/dynamic";
import { FixedSizeGrid as Grid } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import AutoSizer from "react-virtualized-auto-sizer";
// Types
import { CardsDTO } from "@/app/lib/types/dto";
// Custom components
const CardsGalleryCell = dynamic(
  () => import("@/components/cards-gallery/cards-gallery-cell"),
  { ssr: false }
);

type CardsGalleryGridProps = {
  cards: CardsDTO;
  loadMoreCards: (startIndex: number, stopIndex: number) => Promise<void>;
  hasNextPage: boolean;
};

export default function CardsGalleryGrid({
  cards,
  loadMoreCards,
  hasNextPage,
}: CardsGalleryGridProps) {
  const [thumbnailSize, setThumbnailSize] = useState<"sm" | "md">("md");
  const infiniteLoaderRef = useRef<InfiniteLoader>(null);

  const gap = 16;
  const columnWidth = thumbnailSize === "sm" ? 200 : 240;
  const rowHeight = thumbnailSize === "sm" ? 280 : 336;

  useEffect(() => {
    function handleResize() {
      setThumbnailSize(window.innerWidth < 768 ? "sm" : "md");
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const itemCount = hasNextPage ? cards.length + 1 : cards.length;

  const isItemLoaded = (index: number) => !hasNextPage || index < cards.length;

  function loadMoreItems(startIndex: number, stopIndex: number) {
    return loadMoreCards(startIndex, stopIndex);
  }

  return (
    <div
      id="cards-gallery-grid-container"
      className="
        w-full
        flex-1
        px-4
        z-10
        relative
      "
    >
      <div
        id="auto-sizer-container"
        className="absolute inset-0 overflow-hidden"
      >
        <AutoSizer>
          {({ height, width }) => {
            const adjustedWidth = width - 32;
            const columnCount = Math.max(
              1,
              Math.floor((adjustedWidth + gap) / (columnWidth + gap))
            );
            const rowCount = Math.ceil(itemCount / columnCount);

            const gridActualWidth = columnCount * (columnWidth + gap);

            return (
              <InfiniteLoader
                ref={infiniteLoaderRef}
                isItemLoaded={isItemLoaded}
                itemCount={itemCount}
                loadMoreItems={loadMoreItems}
              >
                {({ onItemsRendered, ref }) => (
                  <div
                    style={{
                      width: adjustedWidth,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Grid
                      columnCount={columnCount}
                      columnWidth={columnWidth + gap}
                      height={height}
                      rowCount={rowCount}
                      rowHeight={rowHeight + gap}
                      width={gridActualWidth}
                      onItemsRendered={({
                        visibleColumnStartIndex,
                        visibleColumnStopIndex,
                        visibleRowStartIndex,
                        visibleRowStopIndex,
                      }) => {
                        const startIndex =
                          visibleRowStartIndex * columnCount +
                          visibleColumnStartIndex;
                        const stopIndex =
                          visibleRowStopIndex * columnCount +
                          visibleColumnStopIndex;
                        onItemsRendered({
                          overscanStartIndex: startIndex,
                          overscanStopIndex: stopIndex,
                          visibleStartIndex: visibleColumnStartIndex,
                          visibleStopIndex: visibleColumnStopIndex,
                        });
                        loadMoreCards(startIndex, stopIndex);
                      }}
                      ref={ref}
                      itemData={{
                        cards,
                        columnCount,
                        columnWidth,
                        rowHeight,
                        gap,
                        thumbnailSize,
                      }}
                      // style={{
                      //   overflowX: "hidden",
                      // }}
                    >
                      {CardsGalleryCell}
                    </Grid>
                  </div>
                )}
              </InfiniteLoader>
            );
          }}
        </AutoSizer>
      </div>
    </div>
  );
}
