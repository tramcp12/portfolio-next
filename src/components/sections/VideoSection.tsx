"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import styles from "./VideoSection.module.css";

export default function VideoSection() {
  const t = useTranslations("video");
  const tm = useTranslations("modal");
  const [open, setOpen] = useState(false);
  const lastFocusRef = useRef<Element | null>(null);
  const modalRef = useFocusTrap(open) as React.RefObject<HTMLDivElement>;

  // Hero play button triggers this modal too
  useEffect(() => {
    const heroBtn = document.getElementById("heroPlayBtn");
    if (!heroBtn) return;
    const handler = () => {
      lastFocusRef.current = document.activeElement;
      setOpen(true);
    };
    heroBtn.addEventListener("click", handler);
    return () => heroBtn.removeEventListener("click", handler);
  }, []);

  // Escape key closes
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeModal();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  function openModal() {
    lastFocusRef.current = document.activeElement;
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
    requestAnimationFrame(() => {
      (lastFocusRef.current as HTMLElement | null)?.focus();
    });
  }

  return (
    <>
      <section
        id="video"
        data-section="video"
        data-nav-scheme="dark"
        className={styles.section}
        aria-labelledby="videoHeading"
      >
        <div className={styles.container}>
          <p className={styles.label} aria-hidden="true">
            {t("label")}
          </p>
          <h2
            id="videoHeading"
            className={`${styles.title} cp12-reveal`}
            dangerouslySetInnerHTML={{ __html: t.raw("title") }}
          />
          <p className={`${styles.desc} cp12-reveal delay-1`}>{t("desc")}</p>

          <button
            type="button"
            id="videoFrame"
            className={`${styles.frame} cp12-reveal delay-2`}
            aria-label={t("frameLabel")}
            onClick={openModal}
          >
            <span className={styles.frameOverlay} aria-hidden="true">
              <span className={styles.bigPlay}>▶</span>
              <span className={styles.videoTag}>
                ⏱ {t("tag")}
              </span>
            </span>
          </button>
        </div>
      </section>

      {/* Video modal */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label={tm("title")}
        aria-hidden={!open}
        className={[styles.modal, open ? styles.modalOpen : ""]
          .filter(Boolean)
          .join(" ")}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeModal();
        }}
      >
        <button
          className={styles.modalClose}
          onClick={closeModal}
          aria-label={tm("close")}
        >
          ✕
        </button>
        <div className={styles.modalContent}>
          <p className={styles.modalTitle}>{tm("title")}</p>
          <div className={styles.videoPlaceholder}>
            {/* YouTube embed will be added once video URL is available */}
            🎬 Video coming soon
          </div>
          <p className={styles.modalNote}>{tm("note")}</p>
        </div>
      </div>
    </>
  );
}
