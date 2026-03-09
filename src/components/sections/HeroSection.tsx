// Server Component — pure static content
import Image from "next/image";
import { useTranslations } from "next-intl";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section
      id="home"
      data-section="home"
      data-nav-scheme="dark"
      className={styles.hero}
      aria-labelledby="heroHeading"
    >
      {/* ── Left: text content ── */}
      <div className={styles.left}>
        <p className={`${styles.tag} cp12-reveal`}>{t("tag")}</p>
        <h1
          id="heroHeading"
          className={`${styles.title} cp12-reveal delay-1`}
          dangerouslySetInnerHTML={{ __html: t.raw("title") }}
        />
        <p className={`${styles.subtitle} cp12-reveal delay-2`}>
          {t("subtitle")}
        </p>
        <div className={`${styles.btns} cp12-reveal delay-3`}>
          <a href="#rooms" className={styles.btnPrimary}>
            {t("exploreRooms")}
          </a>
        </div>
      </div>

      {/* ── Right: image + play + stats ── */}
      <div className={styles.right}>
        <Image
          src="/static/img/hero-cover.jpg"
          alt=""
          fill
          priority
          sizes="(max-width: 900px) 100vw, 50vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
          className={styles.rightBg}
        />
        <div className={styles.rightOverlay} aria-hidden="true" />
        <div className={styles.rightContent}>
          {/* Play button — triggers the video modal (IIFE 3 equivalent handled by VideoSection) */}
          <div className={styles.playWrap}>
            <button
              type="button"
              id="heroPlayBtn"
              className={styles.playBtn}
              aria-label={t("watchVideo")}
              onClick={undefined}
            >
              ▶
            </button>
            <span className={styles.playLabel} aria-hidden="true">
              {t("watchVideo")}
            </span>
          </div>

          {/* Stats */}
          <section className={styles.stats} aria-label={t("statsLabel")}>
            <div className={styles.statBox}>
              <span className={styles.statNum} aria-hidden="true">7</span>
              <span className={styles.statLabel} aria-hidden="true">
                {t("stat.roomTypes")}
              </span>
              <span className="sr-only">7 {t("stat.roomTypes")}</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statNum} aria-hidden="true">450K</span>
              <span className={styles.statLabel} aria-hidden="true">
                {t("stat.priceFrom")}
              </span>
              <span className="sr-only">From 450K {t("stat.priceFrom")}</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statNum} aria-hidden="true">1500m</span>
              <span className={styles.statLabel} aria-hidden="true">
                {t("stat.altitude")}
              </span>
              <span className="sr-only">1500m {t("stat.altitude")}</span>
            </div>
          </section>
        </div>
      </div>

      {/* Scroll hint */}
      <div className={styles.scrollHint} aria-hidden="true">
        <div className={styles.scrollLine} />
        <span>{t("scroll")}</span>
      </div>
    </section>
  );
}
