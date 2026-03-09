"use client";

import { useState, useId } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import styles from "./ExploreSection.module.css";

const CARD_IMAGES: Record<string, string> = {
  ti1: "/static/img/travel/lake-run.jpg",
  ti2: "/static/img/travel/flower-garden.jpg",
  ti3: "/static/img/travel/langbiang.jpg",
  ti4: "/static/img/travel/night-market.jpg",
  ti5: "/static/img/travel/hill-loop.jpg",
  ti6: "/static/img/travel/zen-monastery.jpg",
};

const TRAVEL_CARDS = [
  {
    id: "card1",
    bgClass: "ti1",
    category: "running",
    runnersPick: true,
    diff: "easy",
  },
  { id: "card2", bgClass: "ti2", category: "nature", runnersPick: false, diff: "easy" },
  { id: "card3", bgClass: "ti3", category: "nature", runnersPick: false, diff: "hard" },
  { id: "card4", bgClass: "ti4", category: "food", runnersPick: false, diff: "easy" },
  { id: "card5", bgClass: "ti5", category: "nature", runnersPick: false, diff: "easy" },
  { id: "card6", bgClass: "ti6", category: "nature", runnersPick: false, diff: "easyMed" },
] as const;

const FILTERS = ["all", "running", "food", "nature"] as const;
type Filter = (typeof FILTERS)[number];

export default function ExploreSection() {
  const t = useTranslations("explore");
  const [active, setActive] = useState<Filter>("all");
  const panelId = useId();
  const tabIds = Object.fromEntries(FILTERS.map((f) => [f, useId()]));

  const diffLabel: Record<string, string> = {
    easy: t("diff.easy"),
    medium: t("diff.medium"),
    hard: t("diff.hard"),
    easyMed: t("diff.easyMed"),
  };

  return (
    <section
      id="explore"
      data-section="explore"
      data-nav-scheme="dark"
      className={styles.section}
      aria-labelledby="exploreHeading"
    >
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className="cp12-reveal">
            <div className={styles.label} aria-hidden="true">
              {t("label")}
            </div>
            <h2
              id="exploreHeading"
              className={styles.heading}
              dangerouslySetInnerHTML={{ __html: t.raw("heading") }}
            />
          </div>

          {/* Filter tabs — W3C APG Tabs pattern */}
          <div
            role="tablist"
            aria-label="Filter by category"
            className={styles.tabs}
          >
            {FILTERS.map((f) => (
              <button
                key={f}
                id={tabIds[f]}
                role="tab"
                aria-selected={active === f}
                aria-controls={panelId}
                tabIndex={active === f ? 0 : -1}
                className={[styles.tab, active === f ? styles.tabActive : ""]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => setActive(f)}
                onKeyDown={(e) => {
                  const idx = FILTERS.indexOf(f);
                  if (e.key === "ArrowRight") {
                    setActive(FILTERS[(idx + 1) % FILTERS.length]);
                  } else if (e.key === "ArrowLeft") {
                    setActive(
                      FILTERS[(idx - 1 + FILTERS.length) % FILTERS.length]
                    );
                  }
                }}
              >
                {f === "running" && <span aria-hidden="true">🏃 </span>}
                {f === "food" && <span aria-hidden="true">🍜 </span>}
                {f === "nature" && <span aria-hidden="true">⛺ </span>}
                {t(`filter.${f}` as Parameters<typeof t>[0])}
              </button>
            ))}
          </div>
        </div>

        <div
          id={panelId}
          role="tabpanel"
          aria-labelledby={tabIds[active]}
          className={styles.grid}
        >
          {TRAVEL_CARDS.map((card) => {
            const hidden = active !== "all" && card.category !== active;
            return (
              <article
                key={card.id}
                className={[
                  styles.card,
                  styles[card.bgClass as keyof typeof styles],
                  hidden ? styles.cardHidden : "",
                  "cp12-reveal",
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-hidden={hidden}
              >
                <div className={styles.cardImg}>
                  <Image
                    fill
                    src={CARD_IMAGES[card.bgClass]}
                    alt={t(`${card.id}.name` as Parameters<typeof t>[0])}
                    sizes="(max-width: 480px) 100vw, (max-width: 900px) 50vw, 33vw"
                    className={styles.cardImgEl}
                    style={{ objectFit: "cover" }}
                  />
                  {card.runnersPick && (
                    <span className={styles.runnerBadge}>
                      🏃 {t("runnersPick")}
                    </span>
                  )}
                  <span className={styles.diffBadge}>
                    {diffLabel[card.diff]}
                  </span>
                </div>
                <div className={styles.cardBody}>
                  <p className={styles.cardCat}>
                    {t(`${card.id}.cat` as Parameters<typeof t>[0])}
                  </p>
                  <h3 className={styles.cardName}>
                    {t(`${card.id}.name` as Parameters<typeof t>[0])}
                  </h3>
                  <div className={styles.cardMeta}>
                    <span className={styles.metaItem}>
                      📍{" "}
                      {t(`${card.id}.dist` as Parameters<typeof t>[0])}
                    </span>
                    <span className={styles.metaItem}>
                      ⏱{" "}
                      {t(`${card.id}.time` as Parameters<typeof t>[0])}
                    </span>
                  </div>
                  <p className={styles.highlight}>
                    {t(`${card.id}.highlight` as Parameters<typeof t>[0])}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
