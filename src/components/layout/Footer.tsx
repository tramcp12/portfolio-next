// Server Component — no interactivity needed
import { useTranslations } from "next-intl";
import styles from "./Footer.module.css";

const ROOM_LINKS = [
  "jan01",
  "feb02",
  "mar03",
  "aug08",
  "sep09",
  "oct10",
  "nov11",
] as const;

const EXPLORE_LINKS = [
  { key: "runningRoutes", href: "#explore" },
  { key: "foodMarkets", href: "#explore" },
  { key: "cultureNature", href: "#explore" },
  { key: "googleMaps", href: "https://maps.app.goo.gl/cp12" },
] as const;

const QUICK_LINKS = [
  { key: "aboutCP12", href: "#about" },
  { key: "houseRules", href: "#about" },
  { key: "journal", href: "#journal" },
  { key: "book", href: "#book" },
] as const;

const SOCIALS = [
  { name: "Facebook", href: "https://facebook.com/tramcp12", label: "Facebook" },
  { name: "IG", href: "https://instagram.com/tramcp12", label: "Instagram" },
  { name: "YT", href: "https://youtube.com/@tramcp12", label: "YouTube" },
  { name: "TK", href: "https://tiktok.com/@tramcp12", label: "TikTok" },
] as const;

export default function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} id="footer">
      <div className={styles.inner}>
        <div className={styles.grid}>
          {/* Brand column */}
          <div className={styles.brand}>
            <a href="#home" className={styles.logo}>
              Trạm CP12
            </a>
            <p className={styles.tagline}>{t("tagline")}</p>
            <address className={styles.address}>
              228/6 Đường Phú Đồng Thiên Vương
              <br />
              Phường 8, Đà Lạt, Lâm Đồng
              <br />
              <a href="tel:+84765679228" style={{ color: "inherit", textDecoration: "none" }}>
                +84 765 679 228
              </a>
            </address>
            <div className={styles.socials}>
              {SOCIALS.map(({ name, href, label }) => (
                <a
                  key={name}
                  href={href}
                  className={styles.socialLink}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {name[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Rooms column */}
          <div className={styles.col}>
            <p className={styles.colTitle}>{t("col.rooms")}</p>
            {ROOM_LINKS.map((key) => (
              <a key={key} href="#rooms" className={styles.colLink}>
                {t(`room.${key}` as Parameters<typeof t>[0])}
              </a>
            ))}
          </div>

          {/* Explore column */}
          <div className={styles.col}>
            <p className={styles.colTitle}>{t("col.explore")}</p>
            {EXPLORE_LINKS.map(({ key, href }) => (
              <a key={key} href={href} className={styles.colLink}>
                {t(`link.${key}` as Parameters<typeof t>[0])}
              </a>
            ))}
          </div>

          {/* Quick links column */}
          <div className={styles.col}>
            <p className={styles.colTitle}>{t("col.links")}</p>
            {QUICK_LINKS.map(({ key, href }) => (
              <a key={key} href={href} className={styles.colLink}>
                {t(`link.${key}` as Parameters<typeof t>[0])}
              </a>
            ))}
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {year} Trạm CP12. All rights reserved.
          </p>
          <p className={styles.made}>{t("bottom.made")}</p>
        </div>
      </div>
    </footer>
  );
}
