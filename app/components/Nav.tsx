"use client";

import Link from "next/link";
import { useMode, type SiteMode } from "./ModeProvider";

const MODES: { id: SiteMode; label: string }[] = [
  { id: "calm", label: "Calm" },
  { id: "font", label: "My Font" },
  { id: "nerd", label: "Terminal" },
  { id: "mac", label: "Mac" },
];

export default function Nav() {
  const { mode, setMode } = useMode();
  const nerd = mode === "nerd";

  // Mac mode is immersive — the desktop has its own menu bar with an exit button.
  if (mode === "mac") return null;

  return (
    <header className={nerd ? "bg-[#0d1117]" : "bg-white"}>
      <div className="mx-auto flex max-w-[720px] items-center justify-between px-6 pb-2 pt-7 max-sm:px-5 max-sm:pt-5">
        <Link
          href="/#top"
          className={`text-[15px] font-semibold tracking-[-0.02em] no-underline ${
            nerd ? "text-neutral-400" : "text-neutral-900"
          }`}
        >
          Kirtan Chandak
        </Link>
        <div
          className={`flex rounded-md p-[2px] text-[11px] font-medium uppercase tracking-[0.06em] ${
            nerd ? "bg-[#2a2a2a]" : "bg-neutral-200"
          }`}
          role="tablist"
          aria-label="Site mode"
        >
          {MODES.map((m) => {
            const active = mode === m.id;
            return (
              <button
                key={m.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setMode(m.id)}
                className={`rounded-md px-2.5 py-1.5 sm:px-3 whitespace-nowrap transition-colors ${
                  active
                    ? nerd
                      ? "bg-[#3a3a3a] text-neutral-100 shadow-sm"
                      : "bg-white text-neutral-900 shadow-sm"
                    : nerd
                      ? "text-neutral-400"
                      : "text-neutral-500"
                }`}
              >
                {m.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
