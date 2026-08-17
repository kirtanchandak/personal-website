import Image from "next/image";
import ModeSwitch from "./components/ModeSwitch";
import { getGitHubContributionsMultiYear } from "@/lib/github";
import GitHubGraph from "./components/GitHubGraph";

const experience = [
  {
    logo: "/kuration-logo.png",
    company: "Kuration AI",
    role: "Software Developer",
    year: "Nov 2024 - Present · 1 yr 10 mos",
  },
  {
    logo: "/Google_Summer_of_Code_sun_logo_2022.svg.webp",
    company: "Google Summer of Code",
    role: "Software Developer",
    year: "May 2025 - Sep 2025 · 5 mos",
  },
  {
    logo: "/vitess.png",
    company: "Linux Foundation",
    role: "LFX Intern, Vitess",
    year: "Jun 2024 - Aug 2024 · 3 mos",
  },
];

const workTones = {
  yellow: "bg-[#f6e7b8]",
  dark: "bg-[#0c1220]",
  blue: "bg-[#c9def5]",
} as const;

const work = [
  {
    title: "groundtruth",
    desc: "An autonomous AI data steward that continuously audits enterprise databases to detect contradictions and verify records.",
    tone: "dark" as const,
    word: "TRUTH",
    url: "https://github.com/kirtanchandak/groundtruth",
  },
  {
    title: "Baton, Slack handoff agent",
    desc: "Keeps context alive across async agent handoffs. Built for the Slack Agent Hackathon.",
    tone: "yellow" as const,
    word: null,
    url: "https://github.com/flex3-org/baton",
  },
];

const thumbTones = {
  mint: "bg-[radial-gradient(circle_at_30%_30%,#7ee0c6,transparent_50%),radial-gradient(circle_at_80%_70%,#4bb8d0,#1f6f63)]",
  peach: "bg-[linear-gradient(135deg,#ffb07a,#ff6b8a_60%,#c45cff)]",
  ink: "bg-neutral-950",
} as const;

const sideProjects = [
  {
    title: "llmbuys",
    desc: "An AI agent skill that audits your website by testing what AI says about your product to customers.",
    tone: "peach" as const,
    url: "https://github.com/kirtanchandak/llmbuys",
    emoji: "🧐",
  },
  {
    title: "rant",
    desc: "A brain dump and private journal with pgvector search so old notes come back when you need them.",
    tone: "ink" as const,
    url: "https://github.com/kirtanchandak/rant",
    emoji: "🧠",
  },
  {
    title: "weekend.warrior",
    desc: "A retro-themed GitHub analyzer that tracks your weekend commits with a CRT aesthetic.",
    tone: "mint" as const,
    url: "https://github.com/kirtanchandak/weekend.warrior",
    emoji: "🎮",
  },
];

const countries = [
  "🇮🇳", "🇭🇰", "🇫🇷", "🇸🇬", "🇯🇵", "🇦🇪", "🇺🇸", "🇬🇧",
  "🇩🇪", "🇳🇱", "🇨🇦", "🇦🇺", "🇮🇹", "🇪🇸", "🇰🇷", "🇧🇷",
  "🇵🇹", "🇨🇭", "🇸🇪", "🇳🇴", "🇩🇰", "🇵🇱", "🇻🇳", "🇹🇭",
];

const impact = [
  { value: "2.4k", label: "Contributions" },
  { value: "3", label: "Internships" },
  { value: "2", label: "Hackathon finals" },
  { value: "3", label: "Years shipping" },
];

const partners = [
  { name: "Vercel", src: null },
  { name: "Next.js", src: null },
  { name: "Linux Foundation", src: null },
  { name: "Google", src: null },
  { name: "Slack", src: null },
  { name: "Peerlist", src: null },
  { name: "OpenFoodFacts", src: null },
  { name: "Vitess", src: "/vitess.png" },
  { name: "Kuration", src: "/kuration-logo.png" },
  { name: "Heroku", src: null },
  { name: "Supabase", src: null },
  { name: "Docker", src: null },
];

const feedback = [
  "Ships faster than the standup can start.",
  "The MCP server actually stayed up.",
  "Asks the annoying question that saves the week.",
  "Writes the docs nobody else wants to write.",
  "Shows up at odd hours and still replies.",
];

const instagram = [
  {
    views: "12.4k",
    tone: "bg-[linear-gradient(180deg,transparent_40%,rgba(0,0,0,0.45)),linear-gradient(140deg,#f7c59f,#e07a5f_50%,#3d405b)]",
  },
  {
    views: "8.1k",
    tone: "bg-[linear-gradient(180deg,transparent_40%,rgba(0,0,0,0.45)),linear-gradient(160deg,#81b29a,#3d5a80_55%,#1d3557)]",
  },
];

const tweets = [
  {
    text: "Spent the night wiring two MCP servers that keep stepping on each other. The fix was one lock and a lot of humility.",
    date: "Mar 12",
  },
  {
    text: "GSoC taught me that a good getting-started page is worth more than another feature.",
    date: "Sep 4",
  },
];

const mecore = [
  "I like Daemon Targaryen.",
  "I love studying profit, loss, stock markets basically everthing finance.",
  "RCB and RBCs runs through my blood.",
  "I play badminton sometimes.",
  "My old 90s playlist and a good drink. Deadly combo.",
  "Always up for hackathons and building cool stuff.",
  "and finally suiiiiiiiiiiiiiii!!!",
];

const label = "mb-2.5 text-xs font-bold uppercase tracking-[0.12em] text-neutral-900";
const lede = "mb-7 max-w-[560px] text-[15px] leading-[1.65] text-neutral-700";
const section = "pb-20 max-[560px]:pb-14";

function SocialIcon({ name }: { name: "github" | "linkedin" | "twitter" }) {
  const className = "size-4";
  if (name === "github") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    );
  }
  if (name === "linkedin") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    );
  }
  if (name === "twitter") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  }
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function PhonePair() {
  return (
    <div className="flex items-end gap-5">
      <div className="flex h-[236px] w-[118px] flex-col gap-2 rounded-[22px] bg-white px-3 pb-3 pt-[18px] shadow-[0_10px_28px_rgba(0,0,0,0.08)] max-[720px]:h-[184px] max-[720px]:w-[92px]">
        <span className="mb-1.5 block h-1.5 w-9 self-center rounded-full bg-neutral-200" />
        <span className="block h-2 rounded-full bg-neutral-100" />
        <span className="block h-2 rounded-full bg-neutral-100" />
        <span className="block flex-1 rounded-[10px] bg-neutral-100" />
      </div>
      <div className="flex h-[236px] w-[118px] flex-col gap-2 rounded-[22px] bg-white px-3 pb-3 pt-[18px] shadow-[0_10px_28px_rgba(0,0,0,0.08)] max-[720px]:h-[184px] max-[720px]:w-[92px]">
        <span className="mb-1.5 block h-1.5 w-9 self-center rounded-full bg-neutral-200" />
        <span className="block h-2 rounded-full bg-neutral-100" />
        <span className="block flex-1 rounded-[10px] bg-neutral-100" />
        <span className="block h-2 rounded-full bg-neutral-100" />
      </div>
    </div>
  );
}

export default async function Home() {
  const githubData = await getGitHubContributionsMultiYear(3, "kirtanchandak");

  return (
    <ModeSwitch>
    <main
      id="top"
      className="mx-auto max-w-[720px] px-6 pb-20 pt-14 max-[720px]:px-5 max-[720px]:pb-16 max-[720px]:pt-7"
    >
      <section className="flex flex-col items-start pb-[72px] text-left max-[720px]:pb-14">
        <div className="group relative mb-7 size-[120px]">
          <Image
            src="/kirtan.webp"
            alt="Kirtan Chandak"
            width={120}
            height={120}
            priority
            className="absolute inset-0 size-full rounded-full object-cover group-hover:hidden"
          />
          <img
            src="/daemon-front.jpg"
            alt="Daemon"
            width={120}
            height={120}
            className="absolute inset-0 size-full rounded-full object-cover hidden group-hover:block"
          />
        </div>
        <h1 className="font-display text-[34px] font-bold leading-[1.1] tracking-[-0.04em] text-neutral-900 max-[720px]:text-[32px]">
          Software Developer.
        </h1>
        <p className="font-display mt-2.5 text-[22px] font-bold leading-snug tracking-[-0.03em] text-neutral-900">
          Building AI agents and why tooling matters.
        </p>
        <div id="about" className="mt-7 max-w-[560px] scroll-mt-8 space-y-4 text-base leading-[1.7] text-neutral-700">
          <p>
            I build AI agents and tools at{" "}
            <a
              href="https://kurationai.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-neutral-900 underline underline-offset-[3px]"
            >
              Kuration AI.
            </a>
          </p>
          <p>
            Most of my time goes into building AI agents, exploring new products and contributing to open source projects.
          </p>
          <p>
            I was a Google Summer of Code contributor with OpenFoodFacts and a LFX mentee with Vitess.
            I write code at odd hours and ship things that mostly work.
          </p>
          <p>
            Always up for good conversations{" "}
            <a
              href="mailto:kirtanmchandak5@gmail.com"
              className="font-medium text-neutral-900 underline underline-offset-[3px]"
            >
              Message me →
            </a>
          </p>
        </div>
      </section>

      <section className={section}>
        <h2 className="mb-2 text-xs font-medium uppercase tracking-[0.08em] text-[#8e8e8e]">
          Experience
        </h2>
        <ul>
          {experience.map((item) => (
            <li
              key={item.company}
              className="grid grid-cols-[minmax(160px,1fr)_minmax(140px,1.1fr)_auto] items-center gap-4 border-b border-[#eee] py-5 max-[560px]:grid-cols-[1fr_auto] max-[560px]:gap-x-4 max-[560px]:gap-y-2 max-[560px]:py-4"
            >
              <span className="flex items-center gap-3 text-[15px] font-semibold tracking-[-0.015em] text-[#1a1a1a]">
                <span className="flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-md bg-white">
                  <Image src={item.logo} alt="" width={28} height={28} className="size-7 object-contain" />
                </span>
                {item.company}
              </span>
              <span className="text-[15px] text-[#8e8e8e] max-[560px]:col-start-1 max-[560px]:pl-10">
                {item.role}
              </span>
              <span className="min-w-[3.2em] text-right text-[15px] text-[#8e8e8e] max-[560px]:col-start-2 max-[560px]:row-start-1">
                {item.year}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {githubData.length > 0 && (
        <section className={section}>
          <h2 className={label}>GiTHUB</h2>
          <GitHubGraph data={githubData} />
        </section>
      )}

      <section id="work" className={`flex scroll-mt-6 flex-col gap-14 ${section}`}>
        <h2 className={label}>Recent Work</h2>
        {work.map((item) => {
          const Wrapper = item.url ? "a" : "article";
          return (
            <Wrapper 
              key={item.title} 
              href={item.url}
              target={item.url ? "_blank" : undefined}
              rel={item.url ? "noopener noreferrer" : undefined}
              className="group block hover:bg-neutral-100 p-4 -m-4 rounded-[28px] transition-all duration-300"
            >
              <div
                className={`relative flex h-80 items-center justify-center overflow-hidden rounded-xl transition-transform duration-300 group-hover:-translate-y-0.5 max-[720px]:h-60 ${workTones[item.tone]}`}
              >
                {item.word ? (
                  <span className="text-4xl font-bold tracking-[0.18em] text-[#6ec8ff] [text-shadow:0_0_28px_rgba(80,180,255,0.7)] max-[720px]:text-4xl min-[721px]:text-[56px]">
                    {item.word}
                  </span>
                ) : (
                  <PhonePair />
                )}
              </div>
              <div className="px-1">
                <h3 className="mt-4 text-base font-semibold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-1 text-sm text-neutral-500">{item.desc}</p>
              </div>
            </Wrapper>
          );
        })}
      </section>

      <section className={section}>
        <h2 className={label}>Side projects</h2>
        <p className={lede}>Small things I build when I am avoiding the larger ones.</p>
        <ul className="flex flex-col gap-[18px]">
          {sideProjects.map((item) => (
            <li key={item.title}>
              <a 
                href={item.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex items-center gap-5 hover:bg-neutral-100 rounded-2xl p-4 -m-4 transition-all duration-300"
              >
                <span
                  className={`flex size-[72px] shrink-0 items-center justify-center rounded-[10px] text-[32px] ${thumbTones[item.tone]}`}
                >
                  {item.emoji}
                </span>
                <span className="flex-1">
                  <strong className="block text-[15px] font-semibold">{item.title}</strong>
                  <p className="mt-0.5 text-[13px] text-neutral-500">{item.desc}</p>
                </span>
                <span className="text-neutral-300 group-hover:text-neutral-800 dark:group-hover:text-neutral-200 transition-colors pr-2">
                  <SocialIcon name="github" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* <section className={section}>
        <h2 className={label}>Travel</h2>
        <p className={lede}>
          I grew up moving around India and still try to land in a new city when
          I can. Placeholder flags for now.
        </p>
        <div className="flex flex-wrap justify-center gap-2.5">
          {countries.map((flag, i) => (
            <span
              key={`${flag}-${i}`}
              className="flex size-11 items-center justify-center rounded-full bg-neutral-100 text-[22px] leading-none"
              aria-hidden="true"
            >
              {flag}
            </span>
          ))}
        </div>
      </section> */}

      {/* <section className={section}>
        <h2 className={label}>Impact</h2>
        <div className="grid grid-cols-4 gap-4 pt-2 text-center max-[720px]:grid-cols-2 max-[720px]:gap-x-3 max-[720px]:gap-y-6">
          {impact.map((item) => (
            <div key={item.label}>
              <strong className="block text-4xl font-bold tracking-[-0.04em] max-[560px]:text-[28px]">
                {item.value}
              </strong>
              <span className="mt-1 block text-[11px] font-semibold uppercase tracking-[0.1em] text-neutral-500">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </section> */}

      {/* <section className={section}>
        <h2 className={label}>Partnerships</h2>
        <p className={lede}>
          Teams and tools I have actually touched, plus a few names I am filling
          in until the real list is ready.
        </p>
        <div className="grid grid-cols-4 gap-x-4 gap-y-3 max-[560px]:grid-cols-1 max-[720px]:grid-cols-2">
          {partners.map((item) => (
            <div
              key={item.name}
              className="flex h-16 items-center justify-center text-[13px] font-semibold tracking-[-0.02em] text-neutral-600 opacity-70 grayscale"
            >
              {item.src ? (
                <Image src={item.src} alt={item.name} width={72} height={24} className="h-[22px] w-auto object-contain" />
              ) : (
                <span>{item.name}</span>
              )}
            </div>
          ))}
        </div>
      </section> */}

      {/* <section className={section}>
        <h2 className={label}>Feedback</h2>
        <ul className="list-disc pl-[18px]">
          {feedback.map((line) => (
            <li key={line} className="border-b border-neutral-200 py-2.5 text-[15px] text-neutral-800 last:border-b-0">
              {line}
            </li>
          ))}
        </ul>
      </section> */}

      {/* <section className={section}>
        <h2 className={label}>Instagram</h2>
        <div className="grid grid-cols-2 justify-items-center gap-5 max-[560px]:gap-3">
          {instagram.map((item) => (
            <div
              key={item.views}
              className={`relative aspect-[9/16] w-full max-w-[220px] overflow-hidden rounded-[22px] ${item.tone}`}
            >
              <span className="absolute bottom-3.5 left-3.5 text-xs font-medium text-white">
                {item.views} views
              </span>
            </div>
          ))}
        </div>
      </section> */}

      <section className={section}>
        <h2 className={label}>ME CORE</h2>
        <ul className="list-disc pl-[18px] space-y-3 marker:text-neutral-400">
          {mecore.map((line) => (
            <li key={line} className="text-[15px] text-neutral-700">
              {line}
            </li>
          ))}
        </ul>
      </section>

      {/* <section className={section}>
        <h2 className={label}>Twitter</h2>
        <div className="grid grid-cols-2 gap-4 max-[560px]:grid-cols-1">
          {tweets.map((item) => (
            <article key={item.date} className="rounded-xl border border-neutral-200 p-4">
              <div className="mb-2.5 flex items-center gap-2.5">
                <Image src="/kirtan.webp" alt="" width={36} height={36} className="rounded-full object-cover" />
                <div>
                  <strong className="block text-[13px]">Kirtan Chandak</strong>
                  <span className="text-xs text-neutral-400">@kirtanchandak · {item.date}</span>
                </div>
              </div>
              <p className="text-sm leading-[1.55] text-neutral-800">{item.text}</p>
              <div className="mt-3 flex gap-[18px] text-xs text-neutral-400" aria-hidden="true">
                <span>24</span>
                <span>11</span>
                <span>180</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={section}>
        <h2 className={label}>YouTube</h2>
        <div className="relative flex h-[280px] items-end overflow-hidden rounded-xl bg-[linear-gradient(180deg,transparent_50%,rgba(0,0,0,0.5)),linear-gradient(120deg,#2b2d42,#8d99ae_40%,#edf2f4)] p-5 max-[720px]:h-[200px]">
          <span
            className="absolute inset-0 m-auto flex size-14 items-center justify-center rounded-full bg-[#e11d2e] pl-0.5 text-base text-white"
            aria-hidden="true"
          >
            ▶
          </span>
          <p className="text-base font-semibold text-white">Reviewing agent CLIs at 1am</p>
        </div>
      </section> */}

      <footer
        id="contact"
        className="mt-4 flex scroll-mt-6 items-center justify-between gap-6 border-t border-neutral-200 py-8 text-sm text-neutral-500 max-sm:flex-col max-sm:items-start"
      >
        <p>28°C / 82°F · Pune, India</p>
        <nav className="flex flex-wrap gap-6">
          <a
            href="https://github.com/kirtanchandak"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-neutral-300 underline-offset-2 hover:text-neutral-800"
          >
            GitHub
          </a>
          <a
            href="https://x.com/kirtanchandak"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-neutral-300 underline-offset-2 hover:text-neutral-800"
          >
            Twitter (X)
          </a>
          <a
            href="https://linkedin.com/in/kirtanchandak"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-neutral-300 underline-offset-2 hover:text-neutral-800"
          >
            LinkedIn
          </a>
        </nav>
      </footer>
    </main>
    </ModeSwitch>
  );
}
