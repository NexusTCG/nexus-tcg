"use client";

import React, { createContext, useState, useContext } from 'react';

type ModeContextType = {
  mode: 'initial' | 'anomaly';
  setMode: (mode: 'initial' | 'anomaly') => void;
};

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export function ModeProvider({ 
  children 
}: { 
  children: React.ReactNode }
) {
  const [mode, setMode] = useState<'initial' | 'anomaly'>('initial');

  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ModeContext.Provider>
  );
}

export function useMode() {
  const context = useContext(ModeContext);
  if (context === undefined) {
    throw new Error('useMode must be used within a ModeProvider');
  }
  return context;
}