"use client";

import Link from "next/link";
import { useMode } from "./ModeProvider";

export default function Nav() {
  const { mode, setMode } = useMode();
  const nerd = mode === "nerd";

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
          <button
            type="button"
            role="tab"
            aria-selected={!nerd}
            onClick={() => setMode("calm")}
            className={`rounded-md px-3 py-1.5 transition-colors ${
              !nerd
                ? "bg-white text-neutral-900 shadow-sm"
                : "text-neutral-500"
            }`}
          >
            Calm mode
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={nerd}
            onClick={() => setMode("nerd")}
            className={`rounded-md px-3 py-1.5 transition-colors ${
              nerd
                ? "bg-[#3a3a3a] text-neutral-100 shadow-sm"
                : "text-neutral-400"
            }`}
          >
            Nerd mode
          </button>
        </div>
      </div>
    </header>
  );
}
