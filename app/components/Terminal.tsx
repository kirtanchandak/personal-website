"use client";

import { useEffect, useRef, useState } from "react";

type ListLine = { cmd: string; desc: string };
type ListResult = { type: "list"; lines: ListLine[] };
type TextResult = { type: "text"; lines: string[]; boot?: boolean };
type TableResult = { type: "table"; header: string[]; rows: string[][] };
type EchoResult = { type: "echo"; text: string };
type HistoryItem = ListResult | TextResult | TableResult | EchoResult;

const COMMANDS: Record<string, () => ListResult | TextResult | TableResult> = {
  help: () => ({
    type: "list",
    lines: [
      { cmd: "/resume", desc: "download resume as PDF" },
      { cmd: "/exp", desc: "view work experience" },
      { cmd: "/projects", desc: "view recent work" },
      { cmd: "/sideprojects", desc: "view side projects" },
      { cmd: "/whoami", desc: "quick bio" },
      { cmd: "/mecore", desc: "things i like" },
      { cmd: "/contact", desc: "get in touch" },
      { cmd: "clear", desc: "clear the terminal" },
    ],
  }),
  whoami: () => ({
    type: "text",
    lines: [
      "Kirtan Chandak",
      "Software Developer",
      "Building AI agents and why tooling matters.",
    ],
  }),
  exp: () => ({
    type: "table",
    header: ["role", "company", "period"],
    rows: [
      ["Founding Engineer", "Kuration AI", "Nov 2024 - Present"],
      ["Software Developer", "Google Summer of Code", "May 2025 - Sep 2025"],
      ["LFX Intern, Vitess", "Linux Foundation", "Jun 2024 - Aug 2024"],
    ],
  }),
  projects: () => ({
    type: "list",
    lines: [
      { cmd: "groundtruth", desc: "An autonomous AI data steward that continuously audits enterprise databases." },
      { cmd: "baton", desc: "Keeps context alive across async agent handoffs. Built for Slack." },
    ],
  }),
  sideprojects: () => ({
    type: "list",
    lines: [
      { cmd: "llmbuys", desc: "An AI agent skill that audits your website." },
      { cmd: "rant", desc: "A private journal with pgvector search." },
      { cmd: "weekend.warrior", desc: "A retro-themed GitHub analyzer." },
    ],
  }),
  mecore: () => ({
    type: "text",
    lines: [
      "I like Daemon Targaryen.",
      "I love studying profit, loss, stock markets basically everthing finance.",
      "RCB and RBCs runs through my blood.",
      "I play badminton sometimes.",
      "My old 90s playlist and a good drink. Deadly combo.",
      "Always up for hackathons and building cool stuff.",
      "and finally suiiiiiiiiiiiiiii!!!",
    ],
  }),
  resume: () => ({
    type: "text",
    lines: ["-> downloading resume.pdf ...", "(wire this up to your actual file)"],
  }),
  contact: () => ({
    type: "text",
    lines: [
      "email: kirtanmchandak5@gmail.com",
      "github: github.com/kirtanchandak",
    ],
  }),
};

function playTick(freq = 720, vol = 0.04) {
  try {
    const ctx = new window.AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "square";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch {
    /* audio optional */
  }
}

const ASCII_LOGO = [
  " _    _      _              ",
  "| | _(_)_ __| |_ __ _ _ __  ",
  "| |/ / | '__| __/ _` | '_ \\ ",
  "|   <| | |  | || (_| | | | |",
  "|_|\\_\\_|_|   \\__\\__,_|_| |_|",
];

const BOOT_STEPS = [
  { text: "initializing shell...", delay: 120 },
  { text: "loading kirtan.dev v1.0.0", delay: 120 },
  { text: "resolving modules: resume, exp, projects, sideprojects, mecore", delay: 160 },
  { text: "connecting to github api... ok", delay: 140 },
  { text: "connecting to kuration.ai... ok", delay: 140 },
  { text: "", delay: 80 },
  { text: "ready. type 'help' to see available commands", delay: 60 },
];

function BootSequence({
  onLogoLine,
  onLine,
  onDone,
}: {
  onLogoLine: () => void;
  onLine: (text: string) => void;
  onDone: () => void;
}) {
  useEffect(() => {
    let cancelled = false;

    async function run() {
      for (let i = 0; i < ASCII_LOGO.length; i++) {
        if (cancelled) return;
        await new Promise((r) => setTimeout(r, 55));
        playTick(1200, 0.02);
        onLogoLine();
      }
      await new Promise((r) => setTimeout(r, 200));

      for (let i = 0; i < BOOT_STEPS.length; i++) {
        if (cancelled) return;
        await new Promise((r) => setTimeout(r, BOOT_STEPS[i].delay));
        if (BOOT_STEPS[i].text) playTick(500 + i * 30, 0.025);
        onLine(BOOT_STEPS[i].text);
      }
      await new Promise((r) => setTimeout(r, 300));
      if (!cancelled) onDone();
    }
    void run();
    return () => {
      cancelled = true;
    };
    // Boot once on mount. Parent setters are stable enough for this sequence.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

function HistoryLine({ item }: { item: HistoryItem }) {
  if (item.type === "echo") {
    return (
      <div className="mt-2.5 text-[#7dd3a0]">
        <span className="text-[#5b6472]">guest@kirtan.dev</span>
        <span className="text-[#3d4552]">:~$ </span>
        {item.text}
      </div>
    );
  }
  if (item.type === "text") {
    return (
      <div className="ml-0.5">
        {item.lines.map((line, j) => (
          <div
            key={`${line}-${j}`}
            className={
              item.boot
                ? line.startsWith("ready")
                  ? "text-[#7dd3a0]"
                  : "text-[#8b95a1]"
                : "text-[#c9d1d9]"
            }
          >
            {line}
          </div>
        ))}
      </div>
    );
  }
  if (item.type === "list") {
    return (
      <div className="ml-0.5">
        {item.lines.map((line) => (
          <div key={line.cmd} className="flex gap-3">
            <span className="min-w-[110px] text-[#e8a24a]">{line.cmd}</span>
            <span className="text-[#8b95a1]">{line.desc}</span>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="ml-0.5">
      <div className="mb-1 flex gap-4 border-b border-[#262b33] pb-1 text-[#5b6472]">
        {item.header.map((h, j) => (
          <span key={h} className={j === 0 ? "min-w-40" : "min-w-[140px]"}>
            {h}
          </span>
        ))}
      </div>
      {item.rows.map((row) => (
        <div key={row.join("-")} className="flex gap-4 text-[#c9d1d9]">
          {row.map((cell, k) => (
            <span key={`${cell}-${k}`} className={k === 0 ? "min-w-40" : "min-w-[140px]"}>
              {cell}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function Terminal() {
  const [booted, setBooted] = useState(false);
  const [logoLines, setLogoLines] = useState(0);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIndex, setHistIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!booted) return;
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, booted]);

  useEffect(() => {
    if (booted) inputRef.current?.focus();
  }, [booted]);

  const handleBootLine = (text: string) => {
    setHistory((h) => [...h, { type: "text", lines: [text], boot: true }]);
  };

  const runCommand = (raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return;
    const key = trimmed.replace(/^\//, "").toLowerCase();

    if (key === "clear") {
      setHistory([]);
      return;
    }

    const entry: EchoResult = { type: "echo", text: trimmed };
    const fn = COMMANDS[key];
    const result = fn
      ? fn()
      : {
          type: "text" as const,
          lines: [`command not found: ${trimmed}`, "type 'help' for a list of commands"],
        };
    setHistory((h) => [...h, entry, result]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    playTick();
    runCommand(input);
    setCmdHistory((h) => [...h, input]);
    setHistIndex(-1);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const next = histIndex === -1 ? cmdHistory.length - 1 : Math.max(0, histIndex - 1);
      setHistIndex(next);
      setInput(cmdHistory[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIndex === -1) return;
      const next = histIndex + 1;
      if (next >= cmdHistory.length) {
        setHistIndex(-1);
        setInput("");
      } else {
        setHistIndex(next);
        setInput(cmdHistory[next]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const partial = input.replace(/^\//, "").toLowerCase();
      const match = Object.keys(COMMANDS).find((k) => k.startsWith(partial));
      if (match) setInput("/" + match);
    }
  };

  return (
    <div
      className="flex min-h-[calc(100vh-72px)] justify-center bg-[#0d1117] px-5 py-10 font-mono"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="w-full max-w-[720px] overflow-hidden rounded-lg border border-[#262b33] bg-[#111318] shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-2 border-b border-[#262b33] bg-[#15181e] px-3.5 py-2.5">
          <span className="inline-block size-[11px] rounded-full bg-[#ff5f56]" />
          <span className="inline-block size-[11px] rounded-full bg-[#ffbd2e]" />
          <span className="inline-block size-[11px] rounded-full bg-[#27c93f]" />
          <span className="ml-2 text-xs text-[#5b6472]">guest@kirtan.dev - zsh</span>
        </div>

        <div className="max-h-[420px] min-h-80 overflow-y-auto px-[18px] py-4 text-[13.5px] leading-[1.7]">
          <pre
            className={`m-0 text-[12.5px] leading-[1.35] text-[#e8a24a] ${logoLines > 0 ? "mb-2.5" : ""}`}
          >
            {ASCII_LOGO.slice(0, logoLines).join("\n")}
          </pre>
          {!booted && (
            <BootSequence
              onLogoLine={() => setLogoLines((n) => n + 1)}
              onLine={handleBootLine}
              onDone={() => setBooted(true)}
            />
          )}
          {history.map((item, i) => (
            <HistoryLine key={i} item={item} />
          ))}
          <div ref={bottomRef} />
        </div>

        <form
          onSubmit={handleSubmit}
          className={`flex items-center gap-1.5 border-t border-[#262b33] px-[18px] py-2.5 ${booted ? "opacity-100" : "opacity-35"}`}
        >
          <span className="text-[13.5px] text-[#5b6472]">guest@kirtan.dev</span>
          <span className="text-[13.5px] text-[#3d4552]">:~$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={!booted}
            spellCheck={false}
            className="min-w-0 flex-1 bg-transparent font-mono text-[13.5px] text-[#e8e8e8] outline-none"
            placeholder={booted ? "try /projects, /sideprojects, /mecore, help" : ""}
          />
        </form>
      </div>
    </div>
  );
}
