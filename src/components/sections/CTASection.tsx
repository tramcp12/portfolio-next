// Server Component
import { useTranslations } from "next-intl";
import styles from "./CTASection.module.css";

const FB_PATH =
  "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z";

export default function CTASection() {
  const t = useTranslations("cta");

  return (
    <section
      id="book"
      data-section="book"
      data-nav-scheme="dark"
      className={styles.section}
      aria-labelledby="ctaHeading"
    >
      <div className={`${styles.content} cp12-reveal`}>
        <div className={styles.label} aria-hidden="true">
          {t("label")}
        </div>
        <h2
          id="ctaHeading"
          className={styles.title}
          dangerouslySetInnerHTML={{ __html: t.raw("title") }}
        />
        <p className={styles.sub}>{t("sub")}</p>

        <div className={styles.steps} aria-label="How to book">
          {(["step1", "step2", "step3"] as const).map((step, i) => (
            <div key={step} className={styles.step}>
              <span className={styles.stepNum} aria-hidden="true">
                {i + 1}
              </span>
              <div>
                <strong className={styles.stepTitle}>
                  {t(`${step}.title` as Parameters<typeof t>[0])}
                </strong>
                <p className={styles.stepDesc}>
                  {t(`${step}.desc` as Parameters<typeof t>[0])}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.btns}>
          <a
            href="mailto:cp12tramdungchill@gmail.com"
            className={styles.btnPrimary}
          >
            {t("bookBtn")}
          </a>
          <a
            href="https://www.facebook.com/tramcp12"
            className={styles.btnGhost}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d={FB_PATH} />
            </svg>
            {t("facebookBtn")}
          </a>
          <a
            href="https://zalo.me/84765679228"
            className={styles.btnGhost}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("zaloBtn")}
          </a>
          <a href="tel:+84765679228" className={styles.btnGhost}>
            {t("callBtn")}
          </a>
        </div>
      </div>
    </section>
  );
}
