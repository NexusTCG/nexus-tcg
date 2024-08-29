"use client";

import React, { createContext, useState, useContext } from 'react';

type OverlayContextType = {
  isOverlayVisible: boolean;
  showOverlay: () => void;
  hideOverlay: () => void;
};

const OverlayContext = createContext<OverlayContextType | undefined>(undefined);

export function OverlayProvider({ children }: { children: React.ReactNode }) {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const showOverlay = () => setIsOverlayVisible(true);
  const hideOverlay = () => setIsOverlayVisible(false);

  return (
    <OverlayContext.Provider value={{ isOverlayVisible, showOverlay, hideOverlay }}>
      {children}
    </OverlayContext.Provider>
  );
}

export function useOverlay() {
  const context = useContext(OverlayContext);
  if (context === undefined) {
    throw new Error('useOverlay must be used within an OverlayProvider');
  }
  return context;
}