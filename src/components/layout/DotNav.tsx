"use client";

import { useTranslations } from "next-intl";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import styles from "./DotNav.module.css";

const DOTS = [
  { id: "home", key: "dot.home" },
  { id: "video", key: "dot.video" },
  { id: "rooms", key: "dot.rooms" },
  { id: "testimonials", key: "dot.testimonials" },
  { id: "explore", key: "dot.explore" },
  { id: "about", key: "dot.about" },
  { id: "location", key: "dot.location" },
  { id: "journal", key: "dot.journal" },
  { id: "faq", key: "dot.faq" },
  { id: "book", key: "dot.book" },
] as const;

export default function DotNav() {
  const t = useTranslations("nav");
  const { activeSection, isOverDark, showDots } = useScrollSpy();

  function scrollToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  const navClass = [
    styles.dotNav,
    showDots ? styles.dotNavVisible : "",
    isOverDark ? "" : styles.onLight,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <nav className={navClass} aria-label={t("dots")}>
      {DOTS.map(({ id, key }) => {
        const label = t(key as Parameters<typeof t>[0]);
        return (
          <button
            key={id}
            className={[
              styles.dot,
              activeSection === id ? styles.dotActive : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onClick={() => scrollToSection(id)}
            aria-label={label}
            data-label={label}
            tabIndex={showDots ? 0 : -1}
          />
        );
      })}
    </nav>
  );
}
