"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import styles from "./Nav.module.css";

interface NavProps {
  locale: string;
}

const NAV_LINKS = [
  { key: "rooms", href: "#rooms" },
  { key: "explore", href: "#explore" },
  { key: "about", href: "#about" },
  { key: "journal", href: "#journal" },
  { key: "book", href: "#book" },
] as const;

export default function Nav({ locale }: NavProps) {
  const t = useTranslations("nav");
  const router = useRouter();
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const lastFocusRef = useRef<Element | null>(null);

  const { isScrolled, isOverDark } = useScrollSpy();

  // Focus trap inside the mobile overlay
  const overlayRef = useFocusTrap(mobileOpen) as React.RefObject<HTMLDivElement>;

  function openMobile() {
    lastFocusRef.current = document.activeElement;
    setMobileOpen(true);
  }

  function closeMobile() {
    setMobileOpen(false);
    // Restore focus to the element that triggered the overlay
    requestAnimationFrame(() => {
      (lastFocusRef.current as HTMLElement | null)?.focus();
    });
  }

  function switchLocale() {
    const next = locale === "vi" ? "en" : "vi";
    router.replace(pathname, { locale: next });
  }

  const navClass = [
    styles.nav,
    isOverDark ? styles.navOverDark : "",
    isScrolled ? styles.navScrolled : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <nav className={navClass} aria-label="Main navigation">
        {/* Logo */}
        <a href="#home" className={styles.logo} aria-label="Trạm CP12 — Về đầu trang">
          Trạm CP12
        </a>

        {/* Desktop links */}
        <ul className={styles.links} role="list">
          {NAV_LINKS.map(({ key, href }) => (
            <li key={key}>
              <a href={href} className={styles.link}>
                {t(key)}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop controls */}
        <div className={styles.controls}>
          <button
            className={styles.langBtn}
            onClick={switchLocale}
            aria-label={t("lang.label")}
          >
            {locale === "vi" ? "EN" : "VI"}
          </button>
          <a href="#book" className={styles.bookBtn}>
            {t("book")}
          </a>
        </div>

        {/* Hamburger */}
        <button
          className={styles.hamburger}
          onClick={openMobile}
          aria-label={t("openMenu")}
          aria-expanded={mobileOpen}
          aria-controls="cp12-mobile-nav"
        >
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
        </button>
      </nav>

      {/* Mobile overlay */}
      <div
        id="cp12-mobile-nav"
        ref={overlayRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!mobileOpen}
        className={[styles.overlay, mobileOpen ? styles.overlayOpen : ""].join(" ")}
      >
        <button
          className={styles.overlayClose}
          onClick={closeMobile}
          aria-label={t("closeMenu")}
        >
          ✕
        </button>

        <ul className={styles.overlayLinks} role="list">
          {NAV_LINKS.map(({ key, href }) => (
            <li key={key}>
              <a
                href={href}
                className={styles.overlayLink}
                onClick={closeMobile}
              >
                {t(key)}
              </a>
            </li>
          ))}
        </ul>

        <div className={styles.overlayBottom}>
          <button
            className={styles.overlayLangBtn}
            onClick={switchLocale}
            aria-label={t("lang.label")}
          >
            {locale === "vi" ? "EN" : "VI"}
          </button>
          <a href="#book" className={styles.overlayBookBtn} onClick={closeMobile}>
            {t("book")}
          </a>
        </div>
      </div>
    </>
  );
}
