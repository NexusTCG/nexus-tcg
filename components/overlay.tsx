"use client";

import { useOverlay } from "@/app/utils/context/OverlayContext";

export default function Overlay() {
  const { isOverlayVisible } = useOverlay();

  if (!isOverlayVisible) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-40"
      style={{ pointerEvents: 'none' }}
    />
  );
}