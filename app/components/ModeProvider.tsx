"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type SiteMode = "calm" | "nerd";

const ModeContext = createContext<{
  mode: SiteMode;
  setMode: (mode: SiteMode) => void;
} | null>(null);

export function ModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<SiteMode>("calm");

  useEffect(() => {
    document.documentElement.dataset.mode = mode;
  }, [mode]);

  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ModeContext.Provider>
  );
}

export function useMode() {
  const ctx = useContext(ModeContext);
  if (!ctx) {
    throw new Error("useMode must be used within ModeProvider");
  }
  return ctx;
}
