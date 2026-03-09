"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import styles from "./NextSectionBtn.module.css";

const SECTION_ORDER = [
  "home",
  "video",
  "rooms",
  "testimonials",
  "explore",
  "about",
  "location",
  "journal",
  "faq",
  "book",
];

function getNextSectionId(activeSection: string): string | null {
  const idx = SECTION_ORDER.indexOf(activeSection);
  if (idx === -1 || idx === SECTION_ORDER.length - 1) return null;
  return SECTION_ORDER[idx + 1];
}

export default function NextSectionBtn() {
  const t = useTranslations("nav");
  const { activeSection, showNextBtn } = useScrollSpy();

  // Keyboard: PageDown / Shift+ArrowDown → next section
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "PageDown" || (e.shiftKey && e.key === "ArrowDown")) {
        e.preventDefault();
        const next = getNextSectionId(activeSection);
        if (next) document.getElementById(next)?.scrollIntoView({ behavior: "smooth" });
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeSection]);

  function handleClick() {
    const next = getNextSectionId(activeSection);
    if (next) document.getElementById(next)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <button
      className={[styles.btn, showNextBtn ? styles.btnVisible : ""]
        .filter(Boolean)
        .join(" ")}
      onClick={handleClick}
      aria-label={t("nextSection")}
    >
      ↓
    </button>
  );
}
