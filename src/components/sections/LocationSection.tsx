// Server Component
import { useTranslations } from "next-intl";
import styles from "./LocationSection.module.css";

const DISTANCES = [
  { key: "dalat", icon: "🏙️" },
  { key: "trail", icon: "🏃" },
  { key: "market", icon: "🛒" },
  { key: "lake", icon: "🌊" },
  { key: "bus", icon: "🚌" },
  { key: "airport", icon: "✈️" },
] as const;

const MAPS_URL =
  "https://maps.google.com/?q=228/6+Đường+Phú+Đồng+Thiên+Vương,+Phường+8,+Đà+Lạt,+Lâm+Đồng";

export default function LocationSection() {
  const t = useTranslations("location");

  return (
    <section
      id="location"
      data-section="location"
      data-nav-scheme="light"
      className={styles.section}
      aria-labelledby="locationHeading"
    >
      <div className={styles.inner}>
        <div className={styles.label} aria-hidden="true">
          {t("label")}
        </div>
        <h2
          id="locationHeading"
          className={styles.heading}
          dangerouslySetInnerHTML={{ __html: t.raw("heading") }}
        />
        <p className={`${styles.intro} cp12-reveal`}>{t("intro")}</p>

        <div className={`${styles.grid} cp12-reveal delay-1`}>
          {/* Distances */}
          <div className={styles.distances}>
            {DISTANCES.map(({ key, icon }) => (
              <div key={key} className={styles.distCard}>
                <span className={styles.distIcon} aria-hidden="true">
                  {icon}
                </span>
                <div className={styles.distInfo}>
                  <span className={styles.distName}>
                    {t(`${key}.name` as Parameters<typeof t>[0])}
                  </span>
                  <span className={styles.distValue}>
                    {t(`${key}.dist` as Parameters<typeof t>[0])}
                  </span>
                  <span className={styles.distTime}>
                    {t(`${key}.time` as Parameters<typeof t>[0])}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Map */}
          <div className={styles.mapBlock}>
            <a
              href={MAPS_URL}
              className={styles.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("mapLinkLabel")}
            >
              <div className={styles.mapPlaceholder} role="img" aria-hidden="true">
                <span className={styles.mapPin}>📍</span>
                <address className={styles.mapAddress}>
                  228/6 Đường Phú Đồng
                  <br />
                  Thiên Vương, Phường 8
                  <br />
                  Đà Lạt, Lâm Đồng
                </address>
              </div>
              <span className={styles.mapBtn}>{t("mapBtn")}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
