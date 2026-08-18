import type { Metadata } from "next";
import SideRail from "../components/SideRail";
import styles from "../page.module.css";

export const metadata: Metadata = {
  title: "Hackathons & Community — Kirtan Chandak",
  description: "Hackathon wins, talks, and community achievements by Kirtan Chandak.",
};

const accomplishments = [
  {
    icon: "🏆",
    title: "Smart India Hackathon 2022",
    date: "2022",
    sub: "Second Runner Up · National Level",
    desc: "Achieved Second Runner Up in Smart India Hackathon 2022, building solutions for high-stakes problem statements.",
  },
  {
    icon: "🚀",
    title: "Peerlist Top-3 Projects",
    date: "2023",
    sub: "@HackThisFall",
    desc: "Recognized among the Top-3 Projects listed on Peerlist during HackThisFall.",
  },
  {
    icon: "◆",
    title: "MCP Dev Summit",
    date: "2026",
    sub: "Toronto — Accepted Speaker",
    desc: "Dual-client MCP server architecture in production: auth unification, concurrency isolation, and interrupted tool-call recovery.",
  },
  {
    icon: "◆",
    title: "Slack Agent Hackathon",
    date: "2026",
    sub: "Participant · Hackathon Project",
    desc: "Built and shipped Baton, a Slack handoff & continuity agent, in Python with the Bolt SDK.",
  },
  {
    icon: "◆",
    title: "Google Summer of Code",
    date: "2024 / 2025",
    sub: "Open Food Facts & OpenHands",
    desc: "Open-source contributions across global organizations under the Google Summer of Code program.",
  },
];

export default function HackathonsPage() {
  return (
    <>
      <main className={styles.wrap}>
        <div className={styles.eyebrow}>Competitions &amp; Talks</div>

        <h1 className={styles.heroH1}>
          Hackathons &amp; <em>Community</em> Notes.
        </h1>
        <p className={styles.lede}>
          High-intensity hackathons, technical talks, and open-source milestones.
        </p>

        <hr className={styles.divider} />

        <div className={styles.sectionHead}>Accomplishments &amp; Talks</div>
        <div>
          {accomplishments.map((item, idx) => (
            <div className={styles.role} key={idx}>
              <div className={styles.roleIcon}>{item.icon}</div>
              <div className={styles.roleBody}>
                <div className={styles.roleTop}>
                  <h4>{item.title}</h4>
                  <span className={styles.roleDates}>{item.date}</span>
                </div>
                <div className={styles.roleSub}>{item.sub}</div>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <hr className={styles.divider} />

        {/* CTA */}
        <p className={styles.avail}>
          Interested in collaborating for upcoming hackathons or talks? —{" "}
          <a href="mailto:kirtanmchandak5@gmail.com">get in touch ↗</a>
        </p>
      </main>

      <SideRail />
    </>
  );
}
