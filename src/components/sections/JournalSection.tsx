// Server Component
import { useTranslations } from "next-intl";
import styles from "./JournalSection.module.css";

const CARDS = [
  { key: "card1", bgKey: "bi1", large: true },
  { key: "card2", bgKey: "bi2", large: false },
  { key: "card3", bgKey: "bi3", large: false },
] as const;

export default function JournalSection() {
  const t = useTranslations("journal");

  return (
    <section
      id="journal"
      data-section="journal"
      data-nav-scheme="dark"
      className={styles.section}
      aria-labelledby="journalHeading"
    >
      <div className={styles.inner}>
        <div className={`${styles.header} cp12-reveal`}>
          <div className={styles.label} aria-hidden="true">
            {t("label")}
          </div>
          <h2
            id="journalHeading"
            className={styles.heading}
            dangerouslySetInnerHTML={{ __html: t.raw("heading") }}
          />
          <p className={styles.subtext}>{t("subtext")}</p>
        </div>

        <div className={styles.grid}>
          {CARDS.map(({ key, bgKey, large }) => (
            <article
              key={key}
              className={[
                styles.card,
                styles[bgKey],
                large ? styles.cardLarge : "",
                "cp12-reveal",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <div className={styles.cardImg} role="img" aria-hidden="true">
                <div className={styles.cardImgBg} />
              </div>
              <div className={styles.cardBody}>
                <p className={styles.cat}>
                  {t(`${key}.cat` as Parameters<typeof t>[0])}
                </p>
                <h3 className={styles.title}>
                  {t(`${key}.title` as Parameters<typeof t>[0])}
                </h3>
                <p className={styles.excerpt}>
                  {t(`${key}.excerpt` as Parameters<typeof t>[0])}
                </p>
                <a href="#book" className={styles.link}>
                  {t("readMore")} →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
