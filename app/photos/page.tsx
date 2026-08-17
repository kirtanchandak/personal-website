import type { Metadata } from "next";
import Image from "next/image";
import SideRail from "../components/SideRail";
import styles from "../page.module.css";

export const metadata: Metadata = {
  title: "Photos — Kirtan Chandak",
  description: "Behind the scenes photos, late night builds, and moments from the field.",
};

export default function PhotosPage() {
  return (
    <>
      <main className={styles.wrap}>
        <div className={styles.eyebrow}>Gallery — Field Notes</div>

        <h1 className={styles.heroH1}>
          In the <em>Field</em> &amp; Late Night Builds.
        </h1>
        <p className={styles.lede}>
          Snapshots of building, hacking, and working on software.
        </p>

        <hr className={styles.divider} />

        <div className={styles.sectionHead}>Featured Photo</div>
        <div className={styles.photoBlock}>
          <div className={styles.ph}>
            <Image
              src="/kirtan.webp"
              alt="Kirtan Chandak"
              fill
              sizes="(max-width: 720px) 100vw, 720px"
              className={styles.phImgDefault}
            />
            <Image
              src="/daemon-front.tiff"
              alt="Daemon"
              fill
              sizes="(max-width: 720px) 100vw, 720px"
              className={styles.phImgHover}
            />
          </div>
          <div className={styles.caption}>Hover to activate Daemon mode.</div>
        </div>

        <hr className={styles.divider} />

        {/* CTA */}
        <p className={styles.avail}>
          Want to catch up over coffee or code? —{" "}
          <a href="mailto:kirtanmchandak5@gmail.com">reach out ↗</a>
        </p>
      </main>

      <SideRail />
    </>
  );
}
