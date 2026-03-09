// Server Component
import { useTranslations } from "next-intl";
import styles from "./AboutSection.module.css";

export default function AboutSection() {
  const t = useTranslations("about");

  return (
    <section
      id="about"
      data-section="about"
      data-nav-scheme="light"
      className={styles.section}
      aria-labelledby="aboutHeading"
    >
      <div className={styles.inner}>
        {/* Visual */}
        <div className={`${styles.visual} cp12-reveal`}>
          <div
            className={styles.imgMain}
            role="img"
            aria-label={t("videoLabel")}
          />
          <div className={styles.imgAccent}>
            <span className={styles.bigNum}>1500m</span>
            <span className={styles.bigLabel}>{t("accentLabel")}</span>
          </div>
        </div>

        {/* Content */}
        <div className={`${styles.content} cp12-reveal delay-1`}>
          <div className={styles.label} aria-hidden="true">
            {t("label")}
          </div>
          <h2
            id="aboutHeading"
            className={styles.heading}
            dangerouslySetInnerHTML={{ __html: t.raw("heading") }}
          />
          <p className={styles.text}>{t("p1")}</p>
          <p className={styles.text}>{t("p2")}</p>

          <div className={styles.perks}>
            {(["perk1", "perk2", "perk3"] as const).map((p, i) => (
              <div key={p} className={styles.perk}>
                <span className={styles.perkIcon} aria-hidden="true">
                  {i === 0 ? "🗺" : i === 1 ? "🏃" : "🤝"}
                </span>
                <div>
                  <strong className={styles.perkTitle}>
                    {t(`${p}.title` as Parameters<typeof t>[0])}
                  </strong>
                  <p className={styles.perkDesc}>
                    {t(`${p}.desc` as Parameters<typeof t>[0])}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.checkinStrip} aria-label={t("checkinLabel")}>
            <span aria-hidden="true">🕑</span>
            <span>{t("checkin")}</span> <strong>14:00</strong>
            <span className={styles.divider} aria-hidden="true">·</span>
            <span>{t("checkout")}</span> <strong>12:00</strong>
          </div>

          <a href="#book" className={styles.bookBtn}>
            {t("bookBtn")}
          </a>
        </div>
      </div>
    </section>
  );
}
