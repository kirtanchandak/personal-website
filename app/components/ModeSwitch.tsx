"use client";

import { useMode } from "./ModeProvider";
import Terminal from "./Terminal";

export default function ModeSwitch({ children }: { children: React.ReactNode }) {
  const { mode } = useMode();
  if (mode === "nerd") return <Terminal />;
  return children;
}
