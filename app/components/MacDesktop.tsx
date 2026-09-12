"use client";

import { useEffect, useRef, useState } from "react";
import { useMode } from "./ModeProvider";
import GitHubGraph from "./GitHubGraph";
import { TerminalCore } from "./Terminal";
import type { YearContributions } from "@/lib/github";

/* ---------------------------------- data --------------------------------- */

const experience = [
  {
    logo: "/kuration-logo.png",
    company: "Kuration AI",
    role: "Software Developer",
    year: "Nov 2024 - Present",
  },
  {
    logo: "/Google_Summer_of_Code_sun_logo_2022.svg.webp",
    company: "Google Summer of Code",
    role: "Software Developer",
    year: "May 2025 - Sep 2025",
  },
  {
    logo: "/vitess.png",
    company: "Linux Foundation",
    role: "LFX Intern, Vitess",
    year: "Jun 2024 - Aug 2024",
  },
];

const projects = [
  {
    title: "groundtruth",
    desc: "An autonomous AI data steward that audits enterprise databases to detect contradictions.",
    url: "https://github.com/kirtanchandak/groundtruth",
    emoji: "🕵️",
    tone: "bg-[#0c1220]",
    featured: true,
  },
  {
    title: "Baton",
    desc: "Slack handoff agent that keeps context alive across async agent handoffs.",
    url: "https://github.com/flex3-org/baton",
    emoji: "🏃",
    tone: "bg-[#f6e7b8]",
    featured: true,
  },
  {
    title: "llmbuys",
    desc: "An AI agent skill that audits your website by testing what AI says about your product.",
    url: "https://github.com/kirtanchandak/llmbuys",
    emoji: "🧐",
    tone: "bg-[linear-gradient(135deg,#ffb07a,#ff6b8a_60%,#c45cff)]",
    featured: false,
  },
  {
    title: "rant",
    desc: "A brain dump and private journal with pgvector search.",
    url: "https://github.com/kirtanchandak/rant",
    emoji: "🧠",
    tone: "bg-neutral-950",
    featured: false,
  },
  {
    title: "weekend.warrior",
    desc: "A retro-themed GitHub analyzer that tracks your weekend commits.",
    url: "https://github.com/kirtanchandak/weekend.warrior",
    emoji: "🎮",
    tone: "bg-[radial-gradient(circle_at_30%_30%,#7ee0c6,transparent_50%),radial-gradient(circle_at_80%_70%,#4bb8d0,#1f6f63)]",
    featured: false,
  },
];

const mecore = [
  "I like Daemon Targaryen.",
  "I love studying profit, loss, stock markets basically everything finance.",
  "RCB and RBCs runs through my blood.",
  "I play badminton sometimes.",
  "My old 90s playlist and a good drink. Deadly combo.",
  "Always up for hackathons and building cool stuff.",
  "and finally suiiiiiiiiiiiiiii!!!",
];

/* ------------------------------- app windows ------------------------------ */

function AboutApp() {
  return (
    <div className="flex flex-col items-center px-7 py-6 text-center">
      <img
        src="/kirtan.webp"
        alt="Kirtan Chandak"
        className="size-20 rounded-full object-cover shadow-md"
      />
      <h2 className="mt-3 text-[17px] font-bold tracking-[-0.02em] text-neutral-900">
        Kirtan Chandak
      </h2>
      <p className="text-[12px] text-neutral-500">
        Software Developer · Pune, India
      </p>
      <div className="mt-4 space-y-2.5 text-left text-[12.5px] leading-relaxed text-neutral-700">
        <p>
          I build AI agents and tools at{" "}
          <a
            href="https://kurationai.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-blue-600 hover:underline"
          >
            Kuration AI
          </a>
          . Most of my time goes into building AI agents, exploring new
          products and contributing to open source.
        </p>
        <p>
          Google Summer of Code contributor with OpenFoodFacts, LFX mentee
          with Vitess. I write code at odd hours and ship things that mostly
          work.
        </p>
      </div>
      <div className="mt-5 grid w-full grid-cols-3 gap-2 border-t border-neutral-200 pt-4 text-[11px]">
        <div>
          <div className="font-semibold text-neutral-900">Chip</div>
          <div className="text-neutral-500">Caffeine M3</div>
        </div>
        <div>
          <div className="font-semibold text-neutral-900">Memory</div>
          <div className="text-neutral-500">3 yrs shipping</div>
        </div>
        <div>
          <div className="font-semibold text-neutral-900">OS</div>
          <div className="text-neutral-500">kirtanOS 1.0</div>
        </div>
      </div>
    </div>
  );
}

function ExperienceApp() {
  return (
    <div className="px-5 py-4">
      <ul className="divide-y divide-neutral-100">
        {experience.map((item) => (
          <li key={item.company} className="flex items-center gap-3 py-3">
            <span className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-neutral-100 bg-white">
              <img src={item.logo} alt="" className="size-7 object-contain" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[13px] font-semibold text-neutral-900">
                {item.company}
              </div>
              <div className="text-[11.5px] text-neutral-500">{item.role}</div>
            </div>
            <span className="shrink-0 text-[10.5px] text-neutral-400">
              {item.year}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProjectsApp() {
  return (
    <div className="px-5 py-4">
      <h3 className="text-[16px] font-bold tracking-[-0.02em] text-neutral-900">
        App Store
      </h3>
      <p className="mb-3 text-[11.5px] text-neutral-500">
        Things I&apos;ve shipped.
      </p>
      <ul className="divide-y divide-neutral-100">
        {projects.map((item) => (
          <li key={item.title} className="flex items-center gap-3 py-3">
            <span
              className={`flex size-10 shrink-0 items-center justify-center rounded-[10px] text-lg ${item.tone}`}
            >
              {item.emoji}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="truncate text-[13px] font-semibold text-neutral-900">
                  {item.title}
                </span>
                {item.featured && (
                  <span className="rounded-full bg-orange-100 px-1.5 py-px text-[9px] font-semibold uppercase text-orange-600">
                    Featured
                  </span>
                )}
              </div>
              <p className="line-clamp-2 text-[11px] leading-snug text-neutral-500">
                {item.desc}
              </p>
            </div>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded-full bg-neutral-100 px-3.5 py-1 text-[11.5px] font-semibold text-blue-600 transition-colors hover:bg-neutral-200"
            >
              View
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function GitHubApp() {
  const [data, setData] = useState<YearContributions[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    fetch("/api/github")
      .then((r) => r.json())
      .then((d) => setData(d.yearlyContributions ?? []))
      .catch(() => setFailed(true));
  }, []);

  return (
    <div className="px-5 py-4">
      {failed || (data && data.length === 0) ? (
        <p className="py-6 text-center text-[12px] text-neutral-500">
          Couldn&apos;t load contributions.{" "}
          <a
            href="https://github.com/kirtanchandak"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-blue-600 hover:underline"
          >
            View on GitHub →
          </a>
        </p>
      ) : data ? (
        <div className="[&_h3]:text-[12px] [&_button]:text-[10px]">
          <GitHubGraph data={data} />
        </div>
      ) : (
        <p className="animate-pulse py-6 text-center text-[12px] text-neutral-400">
          Loading contributions…
        </p>
      )}
    </div>
  );
}

function TerminalApp() {
  return <TerminalCore compact />;
}

function NotesApp() {
  return (
    <div className="px-5 py-4">
      <h3 className="text-[15px] font-bold text-neutral-900">ME CORE</h3>
      <p className="mb-2 text-[10.5px] text-neutral-400">
        Edited just now · 7 lines
      </p>
      <ul className="list-disc space-y-1.5 pl-4 marker:text-amber-400">
        {mecore.map((line) => (
          <li key={line} className="text-[12px] leading-relaxed text-neutral-700">
            {line}
          </li>
        ))}
      </ul>
    </div>
  );
}

function MailApp() {
  const links = [
    {
      label: "Email",
      value: "kirtanmchandak5@gmail.com",
      href: "mailto:kirtanmchandak5@gmail.com",
    },
    {
      label: "GitHub",
      value: "github.com/kirtanchandak",
      href: "https://github.com/kirtanchandak",
    },
    {
      label: "Twitter (X)",
      value: "x.com/kirtanchandak",
      href: "https://x.com/kirtanchandak",
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/kirtanchandak",
      href: "https://linkedin.com/in/kirtanchandak",
    },
  ];
  return (
    <div className="px-5 py-4">
      <p className="mb-3 text-[12px] text-neutral-600">
        Always up for good conversations.
      </p>
      <ul className="divide-y divide-neutral-100">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between py-2.5"
            >
              <span className="text-[12px] font-semibold text-neutral-900">
                {l.label}
              </span>
              <span className="text-[11.5px] text-neutral-500 group-hover:text-blue-600">
                {l.value} →
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TrashApp() {
  return (
    <div className="flex flex-col items-center px-6 py-8 text-center">
      <span className="text-4xl">🗑️</span>
      <p className="mt-3 text-[13px] font-semibold text-neutral-800">
        Trash is empty
      </p>
      <p className="mt-1 text-[11.5px] text-neutral-500">
        Nothing here — I ship things before they rot.
      </p>
    </div>
  );
}

/* --------------------------------- chrome --------------------------------- */

function AppleLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 384 512" className={className} aria-hidden="true">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}

/**
 * macOS-accurate traffic lights: bordered color dots whose glyphs
 * appear when the group is hovered.
 */
function TrafficLights({
  onClose,
  onMinimize,
  onZoom,
}: {
  onClose: () => void;
  onMinimize: () => void;
  onZoom: () => void;
}) {
  const dot =
    "flex size-3 items-center justify-center rounded-full border-[0.5px]";
  const glyph =
    "size-2 opacity-0 transition-opacity duration-75 group-hover/tl:opacity-100";
  return (
    <span
      className="group/tl flex shrink-0 gap-2"
      onPointerDown={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className={`${dot} border-[#e0443e] bg-[#ff5f57] active:bg-[#bf4943]`}
      >
        <svg viewBox="0 0 12 12" className={glyph}>
          <path
            d="M3.4 3.4l5.2 5.2M8.6 3.4L3.4 8.6"
            stroke="#7e0508"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Minimize"
        onClick={onMinimize}
        className={`${dot} border-[#d89e24] bg-[#febc2e] active:bg-[#bf8e22]`}
      >
        <svg viewBox="0 0 12 12" className={glyph}>
          <path
            d="M2.8 6h6.4"
            stroke="#985712"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Zoom"
        onClick={onZoom}
        className={`${dot} border-[#1dad2b] bg-[#28c840] active:bg-[#1e9930]`}
      >
        <svg viewBox="0 0 12 12" className={glyph} fill="#006500">
          <path d="M3 6.8V3h3.8L3 6.8z" />
          <path d="M9 5.2V9H5.2L9 5.2z" />
        </svg>
      </button>
    </span>
  );
}

/* ------------------------------- dock icons ------------------------------- */

/** Rounded-square base every icon sits on. */

/** Finder: real Apple icon. Source art has ~20% transparent padding
 * baked in, so it's scaled up and clipped to fill the slot like the
 * other dock icons. */
function FinderIcon() {
  return (
    <span className="relative block size-full overflow-hidden rounded-[22%] drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]">
      <img
        src="/icon-finder.png"
        alt="Finder"
        className="absolute inset-0 size-full scale-125 object-cover"
      />
    </span>
  );
}

/** LinkedIn-style people icon for Experience */
function ExperienceIcon() {
  return (
    <svg viewBox="0 0 100 100" className="size-full drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]">
      <defs>
        <clipPath id="rrexp"><rect width="100" height="100" rx="22" ry="22" /></clipPath>
        <linearGradient id="gexp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5ac8fa" />
          <stop offset="100%" stopColor="#0b6dce" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" rx="22" ry="22" fill="url(#gexp)" />
      <g clipPath="url(#rrexp)" fill="#fff">
        {/* briefcase body */}
        <rect x="22" y="44" width="56" height="34" rx="5" fill="#fff" opacity="0.95" />
        {/* handle */}
        <path d="M37 44v-8a4 4 0 0 1 4-4h18a4 4 0 0 1 4 4v8" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
        {/* centre slot */}
        <rect x="46" y="54" width="8" height="14" rx="2" fill="#2a8fd4" />
        {/* clasp line */}
        <rect x="22" y="56" width="56" height="3" rx="1.5" fill="#d0e8fa" opacity="0.6" />
      </g>
    </svg>
  );
}

/** App Store: real Apple icon */
function AppStoreIcon() {
  return (
    <img
      src="/icon-appstore.webp"
      alt="App Store"
      className="size-full rounded-[22%] object-cover drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]"
    />
  );
}

/** GitHub: dark icon with the Octocat mark */
function GitHubIcon() {
  return (
    <svg viewBox="0 0 100 100" className="size-full drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]">
      <defs>
        <clipPath id="rrgh"><rect width="100" height="100" rx="22" ry="22" /></clipPath>
        <linearGradient id="ggh" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#30363d" />
          <stop offset="100%" stopColor="#161b22" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" rx="22" ry="22" fill="url(#ggh)" />
      <g clipPath="url(#rrgh)">
        <path
          transform="translate(17,14) scale(2.74)"
          fill="#fff"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"
        />
      </g>
    </svg>
  );
}

/** Terminal: real Apple icon. Source art has ~20% transparent padding
 * baked in, so it's scaled up and clipped to fill the slot like the
 * other dock icons. */
function TerminalIcon() {
  return (
    <span className="relative block size-full overflow-hidden rounded-[22%] drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]">
      <img
        src="/icon-terminal.png"
        alt="Terminal"
        className="absolute inset-0 size-full scale-125 object-cover"
      />
    </span>
  );
}

/** Notes: real Apple icon. Source art has ~20% transparent padding
 * baked in, so it's scaled up and clipped to fill the slot like the
 * other dock icons. */
function NotesIcon() {
  return (
    <span className="relative block size-full overflow-hidden rounded-[22%] drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]">
      <img
        src="/icon-notes.webp"
        alt="Notes"
        className="absolute inset-0 size-full scale-125 object-cover"
      />
    </span>
  );
}

/** Contact: real Apple Contacts icon */
function MailIcon() {
  return (
    <img
      src="/icon-contact.png"
      alt="Contact"
      className="size-full rounded-[22%] object-cover drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]"
    />
  );
}

/** Trash: proper macOS-style trash can */
function TrashIcon() {
  return (
    <svg viewBox="0 0 100 100" className="size-full drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]">
      <defs>
        <clipPath id="rrtrash"><rect width="100" height="100" rx="22" ry="22" /></clipPath>
        <linearGradient id="gtrash" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d1d5db" />
          <stop offset="100%" stopColor="#9ca3af" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" rx="22" ry="22" fill="url(#gtrash)" />
      <g clipPath="url(#rrtrash)">
        {/* lid */}
        <rect x="22" y="28" width="56" height="8" rx="4" fill="#6b7280" />
        <rect x="38" y="20" width="24" height="10" rx="3" fill="#6b7280" />
        {/* body */}
        <rect x="28" y="38" width="44" height="44" rx="5" fill="#9ca3af" />
        {/* vertical stripes */}
        {[38, 46, 54, 62].map((x) => (
          <rect key={x} x={x} y="44" width="4" height="30" rx="2" fill="#6b7280" opacity="0.6" />
        ))}
      </g>
    </svg>
  );
}

/* ------------------------------ app registry ------------------------------ */

type AppDef = {
  id: string;
  name: string;
  title: string;
  width: number;
  height?: number;
  icon: React.ReactNode;
  content: React.ReactNode;
  dark?: boolean;
  /** Render a dock separator before this app (like the one before Trash). */
  sep?: boolean;
};

const APPS: AppDef[] = [
  {
    id: "about",
    name: "About Me",
    title: "About This Human",
    width: 340,
    icon: <FinderIcon />,
    content: <AboutApp />,
  },
  {
    id: "experience",
    name: "Experience",
    title: "Experience — Finder",
    width: 400,
    icon: <ExperienceIcon />,
    content: <ExperienceApp />,
  },
  {
    id: "projects",
    name: "App Store",
    title: "App Store",
    width: 420,
    icon: <AppStoreIcon />,
    content: <ProjectsApp />,
  },
  {
    id: "github",
    name: "GitHub",
    title: "GitHub — Contributions",
    width: 560,
    icon: <GitHubIcon />,
    content: <GitHubApp />,
  },
  {
    id: "terminal",
    name: "Terminal",
    title: "kirtan — zsh — 80×24",
    width: 420,
    height: 340,
    dark: true,
    icon: <TerminalIcon />,
    content: <TerminalApp />,
  },
  {
    id: "notes",
    name: "Notes",
    title: "ME CORE — Notes",
    width: 360,
    icon: <NotesIcon />,
    content: <NotesApp />,
  },
  {
    id: "mail",
    name: "Contact",
    title: "Contact — Mail",
    width: 360,
    icon: <MailIcon />,
    content: <MailApp />,
  },
  {
    id: "trash",
    name: "Trash",
    title: "Trash",
    width: 300,
    sep: true,
    icon: <TrashIcon />,
    content: <TrashApp />,
  },
];

/* --------------------------------- desktop -------------------------------- */

type Pos = { x: number; y: number };

function MenuClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(t);
  }, []);
  if (!now) return <span className="hidden w-[110px] sm:inline-block" />;
  const day = now.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const time = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
  return (
    <span className="whitespace-nowrap tabular-nums">
      <span className="max-sm:hidden">{day} </span>
      {time}
    </span>
  );
}

export default function MacDesktop() {
  const { setMode } = useMode();
  const screenRef = useRef<HTMLDivElement>(null);
  // Order matters: last item renders on top.
  const [open, setOpen] = useState<string[]>(["about"]);
  const [positions, setPositions] = useState<Record<string, Pos>>({
    about: { x: 30, y: 14 },
  });
  const drag = useRef<{
    id: string;
    startX: number;
    startY: number;
    origX: number;
    origY: number;
  } | null>(null);

  const focusApp = (id: string) =>
    setOpen((o) => [...o.filter((a) => a !== id), id]);

  const openApp = (id: string) => {
    setOpen((o) => {
      if (o.includes(id)) return [...o.filter((a) => a !== id), id];
      return [...o, id];
    });
    setPositions((p) => {
      if (p[id]) return p;
      const n = Object.keys(p).length;
      return { ...p, [id]: { x: 8 + ((n * 7) % 40), y: 6 + ((n * 8) % 34) } };
    });
  };

  const closeApp = (id: string) => setOpen((o) => o.filter((a) => a !== id));

  const [zoomed, setZoomed] = useState<Record<string, boolean>>({});
  const toggleZoom = (id: string) => {
    setZoomed((z) => ({ ...z, [id]: !z[id] }));
    setPositions((p) => (zoomed[id] ? p : { ...p, [id]: { x: 2, y: 7 } }));
    focusApp(id);
  };

  const onTitlePointerDown = (e: React.PointerEvent, id: string) => {
    focusApp(id);
    const pos = positions[id] ?? { x: 10, y: 10 };
    drag.current = {
      id,
      startX: e.clientX,
      startY: e.clientY,
      origX: pos.x,
      origY: pos.y,
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onTitlePointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    const rect = screenRef.current?.getBoundingClientRect();
    if (!d || !rect) return;
    const dx = ((e.clientX - d.startX) / rect.width) * 100;
    const dy = ((e.clientY - d.startY) / rect.height) * 100;
    setPositions((p) => ({
      ...p,
      [d.id]: {
        x: Math.min(88, Math.max(-20, d.origX + dx)),
        y: Math.min(82, Math.max(0, d.origY + dy)),
      },
    }));
  };

  const onTitlePointerUp = () => {
    drag.current = null;
  };

  /* -------------------------------- 3D scene ------------------------------- */

  const laptopRef = useRef<HTMLDivElement>(null);
  // Manual rotation from dragging the backdrop.
  const spin = useRef({ x: 0, y: 0 });
  const spinDrag = useRef<{
    startX: number;
    startY: number;
    origX: number;
    origY: number;
  } | null>(null);
  const [lidOpen, setLidOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLidOpen(true), 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const clamp = (v: number, lo: number, hi: number) =>
      Math.min(hi, Math.max(lo, v));

    const apply = () => {
      const el = laptopRef.current;
      if (!el) return;
      el.style.transform = `rotateX(${spin.current.x}deg) rotateY(${spin.current.y}deg)`;
    };
    apply();

    // The laptop only rotates when the backdrop is deliberately dragged.
    const onMove = (e: PointerEvent) => {
      const d = spinDrag.current;
      if (!d) return;
      spin.current = {
        x: clamp(d.origX - (e.clientY - d.startY) * 0.15, -10, 24),
        // Full 360° — no horizontal clamp.
        y: d.origY + (e.clientX - d.startX) * 0.35,
      };
      apply();
    };
    const onUp = () => {
      spinDrag.current = null;
    };
    const onDblClick = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("[data-no-spin]")) return;
      spin.current = { x: 0, y: 0 };
      apply();
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("dblclick", onDblClick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("dblclick", onDblClick);
    };
  }, []);

  const onSpinStart = (e: React.PointerEvent) => {
    // Anything inside the screen (windows, dock, menu bar) should not spin the laptop.
    if ((e.target as HTMLElement).closest("[data-no-spin]")) return;
    // Touch/pen drags are reserved for normal page scrolling on mobile — only
    // a real mouse drag should spin the laptop. Without this, a swipe to
    // scroll gets hijacked as a rotation and can get stuck mid-rotation,
    // which then clips menu-bar content via the 3D perspective.
    if (e.pointerType !== "mouse") return;
    spinDrag.current = {
      startX: e.clientX,
      startY: e.clientY,
      origX: spin.current.x,
      origY: spin.current.y,
    };
  };

  return (
    <div
      onPointerDown={onSpinStart}
      className="flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#e8e8e6] px-2 py-6 sm:px-8 sm:py-10"
    >
      {/* 3D stage */}
      <div className="w-full max-w-[1080px] [perspective:1800px]">
        <div
          ref={laptopRef}
          className="relative transition-transform duration-100 ease-out will-change-transform [transform-style:preserve-3d]"
        >
          {/* lid (hinged at the bottom) */}
          <div
            className="relative origin-bottom [transform-style:preserve-3d] [transition:transform_1.4s_cubic-bezier(0.34,0.85,0.28,1)]"
            style={{ transform: `rotateX(${lidOpen ? 0 : -91}deg)` }}
          >
            {/* lid front: bezel + screen */}
            <div className="rounded-t-[14px] rounded-b-[4px] border border-[#2a3244] bg-[#0a0a0c] p-[10px] pb-[12px] [backface-visibility:hidden] sm:rounded-t-[20px] sm:p-[14px]">
              {/* screen */}
              <div
                ref={screenRef}
                data-no-spin
                className="relative h-[520px] select-none overflow-hidden rounded-[8px] bg-[radial-gradient(circle_at_15%_20%,#ff9a62_0%,transparent_45%),radial-gradient(circle_at_85%_15%,#c45cff_0%,transparent_50%),radial-gradient(circle_at_75%_85%,#2563eb_0%,transparent_55%),linear-gradient(160deg,#1b1035,#3b1d5e_50%,#12244d)] sm:h-auto sm:aspect-[16/10]"
              >
            {/* notch */}
            <div className="pointer-events-none absolute left-1/2 top-0 z-40 h-[14px] w-[110px] -translate-x-1/2 rounded-b-[8px] bg-[#0a0a0c] max-sm:hidden" />

            {/* menu bar */}
            <div className="relative z-30 flex h-7 shrink-0 items-center justify-between gap-2 overflow-hidden bg-white/60 px-2 text-[11px] font-medium text-neutral-800 backdrop-blur-md sm:px-3">
              <div className="flex min-w-0 items-center gap-2 sm:gap-3.5">
                <AppleLogo className="h-[13px] w-auto shrink-0 fill-neutral-800" />
                <span className="truncate font-bold">
                  <span className="sm:hidden">Kirtan</span>
                  <span className="max-sm:hidden">Kirtan Chandak</span>
                </span>
                <span className="max-sm:hidden">File</span>
                <span className="max-sm:hidden">Edit</span>
                <span className="max-sm:hidden">View</span>
                <span className="max-sm:hidden">Help</span>
              </div>
              <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => setMode("calm")}
                  className="rounded-[5px] bg-black/10 px-2 py-0.5 text-[10px] font-semibold whitespace-nowrap transition-colors hover:bg-black/20"
                >
                  <span className="sm:hidden">Exit</span>
                  <span className="max-sm:hidden">Exit Mac mode</span>
                </button>
                {/* wifi */}
                <svg
                  viewBox="0 0 24 24"
                  className="size-3.5 max-sm:hidden"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M5 12.5a10 10 0 0 1 14 0M8.5 15.5a5.5 5.5 0 0 1 7 0M12 19h.01" />
                </svg>
                {/* battery */}
                <span className="flex items-center gap-px max-sm:hidden">
                  <span className="flex h-[10px] w-[20px] items-center rounded-[3px] border border-neutral-700 p-px">
                    <span className="h-full w-[75%] rounded-[1.5px] bg-neutral-800" />
                  </span>
                  <span className="h-[4px] w-[2px] rounded-r-sm bg-neutral-700" />
                </span>
                <MenuClock />
              </div>
            </div>

            {/* hint */}
            {open.length === 0 && (
              <p className="pointer-events-none absolute inset-x-0 top-[42%] z-10 text-center text-[13px] font-medium text-white/70">
                Click an app in the dock ↓
              </p>
            )}

            {/* windows */}
            {open.map((id, i) => {
              const app = APPS.find((a) => a.id === id);
              if (!app) return null;
              const pos = positions[id] ?? { x: 10, y: 10 };
              return (
                <div
                  key={id}
                  onPointerDown={() => focusApp(id)}
                  className={`absolute flex flex-col overflow-hidden rounded-[10px] shadow-[0_18px_50px_rgba(0,0,0,0.4)] ring-1 ring-black/10 max-sm:!left-[3%] max-sm:!top-[9%] max-sm:!h-auto max-sm:!max-h-[72%] max-sm:!w-[94%] max-sm:!max-w-[94%] ${
                    app.dark ? "bg-[#111318]" : "bg-[#f6f6f6]"
                  }`}
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    width: zoomed[id] ? "96%" : app.width,
                    maxWidth: zoomed[id] ? "96%" : "92%",
                    height: zoomed[id] ? "84%" : app.height,
                    maxHeight: zoomed[id] ? "84%" : "80%",
                    zIndex: 10 + i,
                  }}
                >
                  {/* title bar */}
                  <div
                    onPointerDown={(e) => onTitlePointerDown(e, id)}
                    onPointerMove={onTitlePointerMove}
                    onPointerUp={onTitlePointerUp}
                    onDoubleClick={() => toggleZoom(id)}
                    className={`flex shrink-0 cursor-grab touch-none items-center gap-2 border-b px-3 py-2 active:cursor-grabbing ${
                      app.dark
                        ? "border-[#262b33] bg-[#15181e]"
                        : "border-neutral-200 bg-[#ececec]"
                    }`}
                  >
                    <TrafficLights
                      onClose={() => closeApp(id)}
                      onMinimize={() => closeApp(id)}
                      onZoom={() => toggleZoom(id)}
                    />
                    <span
                      className={`flex-1 truncate text-center text-[11px] font-semibold ${
                        app.dark ? "text-[#8b95a1]" : "text-neutral-600"
                      }`}
                    >
                      {app.title}
                    </span>
                    <span className="w-[54px]" />
                  </div>
                  {/* body */}
                  <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
                    {app.content}
                  </div>
                </div>
              );
            })}

            {/* dock */}
            <div className="absolute inset-x-0 bottom-2 z-30 flex justify-center px-1">
              <div className="flex items-end gap-1 rounded-2xl border border-white/20 bg-white/25 px-1.5 py-1.5 shadow-lg backdrop-blur-xl sm:gap-2 sm:px-2.5">
                {APPS.map((app) => (
                  <div key={app.id} className="flex items-end">
                    {app.sep && (
                      <span className="mx-0.5 mb-1.5 h-8 w-px self-end bg-black/20 sm:mx-1 sm:h-11" />
                    )}
                    <button
                      type="button"
                      onClick={() => openApp(app.id)}
                      className="group relative flex flex-col items-center"
                    >
                      <span className="pointer-events-none absolute -top-8 whitespace-nowrap rounded-md bg-[#f0f0f0]/90 px-2.5 py-0.5 text-[10px] font-medium text-neutral-800 shadow-md ring-1 ring-black/10 opacity-0 transition-opacity group-hover:opacity-100">
                        {app.name}
                      </span>
                      <span className="relative block size-8 transition-transform duration-150 group-hover:-translate-y-1.5 group-hover:scale-110 sm:size-11">
                        {app.icon}
                        {!["trash", "about", "notes", "terminal", "projects", "mail"].includes(app.id) && (
                          <span className="pointer-events-none absolute inset-0 rounded-[22%] bg-[linear-gradient(180deg,rgba(255,255,255,0.28),rgba(255,255,255,0.06)_40%,transparent_60%)] shadow-[inset_0_0_1px_rgba(255,255,255,0.5),0_3px_8px_rgba(0,0,0,0.28)]" />
                        )}
                      </span>
                      <span
                        className={`mt-0.5 size-1 rounded-full bg-neutral-800/70 ${
                          open.includes(app.id) ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
              </div>
            </div>

            {/* lid back: Midnight finish, visible while closed / from behind */}
            <div
              aria-hidden
              className="absolute inset-0 flex items-center justify-center rounded-t-[14px] rounded-b-[4px] border border-[#0c101a] bg-[radial-gradient(circle_at_30%_15%,#3b4560_0%,transparent_55%),linear-gradient(200deg,#2b3348,#1c2233_55%,#121722)] [backface-visibility:hidden] [transform:rotateY(180deg)] sm:rounded-t-[20px]"
            >
              <AppleLogo className="h-14 w-auto fill-[#525d78] drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] sm:h-20" />
            </div>
          </div>

          {/* base / deck — Midnight finish */}
          <div className="relative mx-auto h-[14px] w-[112%] max-w-[1180px] -translate-x-[5.4%] rounded-b-[14px] bg-[linear-gradient(180deg,#3a4358,#242b3d_70%,#151a27)] sm:h-[18px]">
            <div className="absolute left-1/2 top-0 h-[7px] w-[110px] -translate-x-1/2 rounded-b-[10px] bg-[#2a3143] sm:w-[150px]" />
          </div>
        </div>

        {/* floor shadow */}
        <div className="pointer-events-none mx-auto -mt-3 h-8 w-[78%] rounded-[50%] bg-black/25 blur-2xl" />
      </div>

      <p className="mt-6 px-4 text-center text-[12px] text-neutral-500 sm:mt-8">
        <span className="sm:hidden">kirtanOS · tap the dock</span>
        <span className="max-sm:hidden">
          kirtanOS · click the dock icons · drag the background to spin the
          MacBook · double-click to reset
        </span>
      </p>
    </div>
  );
}
