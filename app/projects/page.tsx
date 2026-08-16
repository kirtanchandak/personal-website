import type { Metadata } from "next";
import SideRail from "../components/SideRail";
import styles from "../page.module.css";

export const metadata: Metadata = {
  title: "Projects — Kirtan Chandak",
  description: "Selected software projects, AI agents, MCP servers, and developer tooling built by Kirtan Chandak.",
};

const projects = [
  {
    title: "Baton",
    link: "https://github.com/kirtanchandak",
    linkLabel: "github ↗",
    desc: "A Slack handoff & continuity agent built for the Slack Agent Hackathon. Keeps context seamless across team workflows and async agent handoffs.",
    tags: ["Python", "Bolt SDK", "Heroku", "Agents"],
  },
  {
    title: "rant",
    link: "https://github.com/kirtanchandak",
    linkLabel: "github ↗",
    desc: "A journaling application with semantic vector search over personal entries. Features pgvector RAG pipeline for instant retrieval of thoughts and logs.",
    tags: ["NextJS", "Supabase", "pgvector", "TypeScript"],
  },
  {
    title: "agent-dispatch",
    link: "#",
    linkLabel: "in progress",
    desc: "Multi-agent CLI dispatcher comparing raw outputs from Antigravity, Cursor, and Kiro — normalized into a unified event schema and rendered as an interactive timeline.",
    tags: ["TypeScript", "CLI", "Multi-Agent", "Node.js"],
  },
];

export default function ProjectsPage() {
  return (
    <>
      <main className={styles.wrap}>
        <div className={styles.eyebrow}>Portfolio — Field Notes</div>
        
        <h1 className={styles.heroH1}>
          Selected <em>Projects</em> &amp; Build Logs.
        </h1>
        <p className={styles.lede}>
          AI agents, developer tools, MCP servers, and open-source software built for real workflows.
        </p>

        <hr className={styles.divider} />

        <div className={styles.sectionHead}>Projects</div>
        <div className={styles.projGrid}>
          {projects.map((proj, idx) => (
            <div className={styles.proj} key={idx}>
              <div className={styles.projTop}>
                <h4>{proj.title}</h4>
                <a
                  className={styles.projLink}
                  href={proj.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${proj.title} link`}
                >
                  {proj.linkLabel}
                </a>
              </div>
              <p>{proj.desc}</p>
              <div className={styles.tagRow}>
                {proj.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <hr className={styles.divider} />

        {/* CTA */}
        <p className={styles.avail}>
          Have a project or FDE role in mind? —{" "}
          <a href="mailto:kirtanmchandak5@gmail.com">my DMs are open ↗</a>
        </p>
      </main>

      <SideRail />
    </>
  );
}
