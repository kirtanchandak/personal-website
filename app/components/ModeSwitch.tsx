"use client";

import { useMode } from "./ModeProvider";
import Terminal from "./Terminal";
import MacDesktop from "./MacDesktop";

export default function ModeSwitch({ children }: { children: React.ReactNode }) {
  const { mode } = useMode();
  if (mode === "nerd") return <Terminal />;
  if (mode === "mac") return <MacDesktop />;
  return children;
}
