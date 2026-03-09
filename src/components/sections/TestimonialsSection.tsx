// Server Component
import { useTranslations } from "next-intl";
import styles from "./TestimonialsSection.module.css";

const TESTIMONIALS = [
  { initial: "K", colorKey: "Pine" as const, name: "Khoa Vũ", badge: "Local Guide", stars: 5, textKey: "r1text" as const },
  { initial: "H", colorKey: "Terracotta" as const, name: "Hồng Luân Vi", badge: null, stars: 5, textKey: "r2text" as const },
];

const MAPS_PATH =
  "M12 0C7.802 0 4 3.403 4 7.602 4 11.8 7.469 16.812 12 24c4.531-7.188 8-12.2 8-16.398C20 3.403 16.199 0 12 0zm0 11a3 3 0 110-6 3 3 0 010 6z";

export default function TestimonialsSection() {
  const t = useTranslations("testimonials");

  return (
    <section
      id="testimonials"
      data-section="testimonials"
      data-nav-scheme="light"
      className={styles.section}
      aria-labelledby="testimonialsHeading"
    >
      <div className={`${styles.inner} cp12-reveal`}>
        <div className={styles.label} aria-hidden="true">
          {t("label")}
        </div>
        <h2
          id="testimonialsHeading"
          className={styles.heading}
          dangerouslySetInnerHTML={{ __html: t.raw("heading") }}
        />

        <div className={styles.grid}>
          {TESTIMONIALS.map(({ initial, colorKey, name, badge, stars, textKey }) => {
            const avatarClass =
              styles[`avatar${colorKey}` as keyof typeof styles] ?? styles.avatarPine;
            return (
              <article key={name} className={`${styles.card} cp12-reveal`}>
                <header className={styles.cardHeader}>
                  <div className={`${styles.avatar} ${avatarClass}`} aria-hidden="true">
                    {initial}
                  </div>
                  <div className={styles.meta}>
                    <span className={styles.name}>{name}</span>
                    {badge && <span className={styles.badge}>{badge}</span>}
                    <div className={styles.stars} aria-label={`${stars} out of 5 stars`}>
                      {"★".repeat(stars)}
                    </div>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-label={t("googleLabel")}
                    role="img"
                    className={styles.mapsIcon}
                  >
                    <path d={MAPS_PATH} />
                  </svg>
                </header>
                <blockquote className={styles.text}>
                  <p>{t(textKey)}</p>
                </blockquote>
              </article>
            );
          })}
        </div>

        <div className={styles.cta}>
          <a
            href="https://maps.app.goo.gl/J21hfLiN5raSABX87"
            className={styles.ctaBtn}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("seeAllBtn")}
          </a>
        </div>
      </div>
    </section>
  );
}
