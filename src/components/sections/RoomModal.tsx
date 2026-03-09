"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import type { Room } from "@/lib/types";
import styles from "./RoomModal.module.css";

interface RoomModalProps {
  room: Room | null;
  locale: string;
  onClose: () => void;
}

export default function RoomModal({ room, locale, onClose }: RoomModalProps) {
  const t = useTranslations("panel");
  const isOpen = room !== null;
  const [photoIdx, setPhotoIdx] = useState(0);
  const modalRef = useFocusTrap(isOpen) as React.RefObject<HTMLDivElement>;

  const isVi = locale === "vi";

  // Reset photo index when room changes
  useEffect(() => {
    setPhotoIdx(0);
  }, [room?.id]);

  // Escape key
  useEffect(() => {
    if (!isOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!room) return null;

  const name = isVi ? (room.name_vi || room.name) : room.name;
  const desc = isVi ? (room.desc_vi || room.desc) : room.desc;
  const amenities = isVi ? (room.amenities_vi ?? room.amenities) : room.amenities;
  const meta = isVi ? (room.meta_vi ?? room.meta) : room.meta;
  const photos =
    room.photos?.length > 0
      ? room.photos
      : room.coverPhoto
        ? [{ src: room.coverPhoto, alt: name, alt_vi: name }]
        : [];

  const currentPhoto = photos[photoIdx] ?? photos[0];
  const photoAlt = isVi ? (currentPhoto.alt_vi || currentPhoto.alt) : currentPhoto.alt;

  function prevPhoto() {
    setPhotoIdx((i) => (i - 1 + photos.length) % photos.length);
  }

  function nextPhoto() {
    setPhotoIdx((i) => (i + 1) % photos.length);
  }

  const nightLabel = isVi ? "VND / đêm" : "VND / night";

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-label={t("regionLabel")}
      aria-hidden={!isOpen}
      className={[styles.overlay, isOpen ? styles.overlayOpen : ""]
        .filter(Boolean)
        .join(" ")}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={styles.inner}>
        {/* Gallery */}
        <div className={styles.gallery}>
          <div className={styles.mainImg}>
            <Image
              fill
              src={`/${currentPhoto.src}`}
              alt={photoAlt}
              sizes="(max-width: 768px) 100vw, 55vw"
              style={{ objectFit: "cover" }}
            />
          </div>

          {/* Close on gallery side for mobile */}
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label={t("close")}
          >
            ✕
          </button>

          {/* Prev / Next */}
          {photos.length > 1 && (
            <div className={styles.galNav} aria-hidden="true">
              <button
                className={styles.galBtn}
                onClick={prevPhoto}
                aria-label={t("prevPhoto")}
              >
                ‹
              </button>
              <button
                className={styles.galBtn}
                onClick={nextPhoto}
                aria-label={t("nextPhoto")}
              >
                ›
              </button>
            </div>
          )}

          {/* Thumbnails */}
          {photos.length > 1 && (
            <div className={styles.thumbs} aria-label="Photo thumbnails">
              {photos.map((photo, i) => {
                const thumbAlt = isVi ? (photo.alt_vi || photo.alt) : photo.alt;
                return (
                  <button
                    key={i}
                    className={[
                      styles.thumb,
                      i === photoIdx ? styles.thumbActive : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={() => setPhotoIdx(i)}
                    aria-label={thumbAlt}
                    aria-pressed={i === photoIdx}
                  >
                    <Image
                      fill
                      src={`/${photo.src}`}
                      alt={thumbAlt}
                      sizes="44px"
                      style={{ objectFit: "cover" }}
                    />
                  </button>
                );
              })}
            </div>
          )}

          {/* Counter */}
          <span className={styles.counter} aria-live="polite">
            {t("photoCount", { n: photoIdx + 1, total: photos.length })}
          </span>
        </div>

        {/* Info */}
        <div className={styles.info} role="region" aria-label={t("regionLabel")}>
          <h2 className={styles.name}>{name}</h2>
          <p className={styles.price}>
            {room.price} {nightLabel}
          </p>

          {meta.length > 0 && (
            <div className={styles.meta}>
              {meta.map((m, i) => (
                <span key={i} className={styles.metaItem}>
                  <span aria-hidden="true">{m.icon}</span>
                  {m.text}
                </span>
              ))}
            </div>
          )}

          <p className={styles.desc}>{desc}</p>

          {amenities.length > 0 && (
            <>
              <p className={styles.amenitiesLabel}>{t("amenitiesLabel")}</p>
              <div className={styles.amenities}>
                {amenities.map((a) => (
                  <span key={a} className={styles.chip}>
                    {a}
                  </span>
                ))}
              </div>
            </>
          )}

          <a href="#book" className={styles.bookBtn} onClick={onClose}>
            {t("bookBtn")}
          </a>
        </div>
      </div>
    </div>
  );
}
