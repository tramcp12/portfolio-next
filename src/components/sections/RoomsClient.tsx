"use client";

import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import type { Room } from "@/lib/types";
import { getRoomName, getRoomBestFor, getRoomMeta } from "@/lib/data";
import RoomModal from "./RoomModal";
import styles from "./RoomsSection.module.css";

interface RoomsClientProps {
  rooms: Room[];
  locale: string;
}

const BG_CLASSES = [styles.r1, styles.r2, styles.r3, styles.r4];

export default function RoomsClient({ rooms, locale }: RoomsClientProps) {
  const t = useTranslations("rooms");
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);

  function openModal(room: Room) {
    lastFocusRef.current = document.activeElement as HTMLElement;
    setSelectedRoom(room);
  }

  function closeModal() {
    setSelectedRoom(null);
    // Restore focus to the card that opened the modal
    lastFocusRef.current?.focus();
  }

  return (
    <>
      <div className={styles.grid}>
        {rooms.map((room, idx) => {
          const name = getRoomName(room, locale);
          const bestFor = getRoomBestFor(room, locale);
          const meta = getRoomMeta(room, locale);
          const bgClass = BG_CLASSES[idx % BG_CLASSES.length];
          const interactive = !room.comingSoon;

          return (
            <article
              key={room.id}
              className={`${styles.card} ${bgClass} cp12-reveal`}
              role={interactive ? "button" : undefined}
              tabIndex={interactive ? 0 : undefined}
              aria-label={interactive ? name : undefined}
              onClick={() => interactive && openModal(room)}
              onKeyDown={(e) => {
                if (interactive && (e.key === "Enter" || e.key === " ")) {
                  e.preventDefault();
                  openModal(room);
                }
              }}
            >
              <div className={styles.cardBg} aria-hidden="true" />
              <div className={styles.cardOverlay} aria-hidden="true" />

              {room.comingSoon && (
                <span className={styles.comingSoon}>{t("comingSoon")}</span>
              )}

              <div className={styles.cardBody}>
                <p className={styles.cardBestFor}>{bestFor}</p>
                <h3 className={styles.cardName}>{name}</h3>

                {meta.length > 0 && (
                  <div className={styles.cardMeta}>
                    {meta.map((m, i) => (
                      <span key={i} className={styles.metaItem}>
                        <span aria-hidden="true">{m.icon}</span>
                        {m.text}
                      </span>
                    ))}
                  </div>
                )}

                <p className={styles.cardPrice}>{room.price}đ {t("perNight")}</p>
              </div>
            </article>
          );
        })}
      </div>

      <RoomModal room={selectedRoom} locale={locale} onClose={closeModal} />
    </>
  );
}
