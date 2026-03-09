// Server Component — <details>/<summary> accordion needs no JS
import { useTranslations } from "next-intl";
import styles from "./FAQSection.module.css";

const FAQ_KEYS = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8"] as const;

export default function FAQSection() {
  const t = useTranslations("faq");

  return (
    <section
      id="faq"
      data-section="faq"
      data-nav-scheme="light"
      className={styles.section}
      aria-labelledby="faqHeading"
    >
      <div className={`${styles.inner} cp12-reveal`}>
        <div className={styles.label} aria-hidden="true">
          {t("label")}
        </div>
        <h2
          id="faqHeading"
          className={styles.heading}
          dangerouslySetInnerHTML={{ __html: t.raw("heading") }}
        />

        <div className={styles.grid}>
          {FAQ_KEYS.map((key) => (
            <details key={key} className={styles.item}>
              <summary className={styles.question}>
                {t(`${key}.question` as Parameters<typeof t>[0])}
              </summary>
              <p className={styles.answer}>
                {t(`${key}.answer` as Parameters<typeof t>[0])}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
