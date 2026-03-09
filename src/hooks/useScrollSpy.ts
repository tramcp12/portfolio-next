"use client";

import { useEffect, useState } from "react";

// Sections that use a dark background — nav switches to light text over these
const DARK_SECTIONS = new Set([
  "home",
  "video",
  "explore",
  "book",
]);

const SECTION_IDS = [
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

export interface ScrollSpyState {
  activeSection: string;
  isOverDark: boolean;
  isScrolled: boolean;
  showDots: boolean;
  showNextBtn: boolean;
  isAtBottom: boolean;
}

export function useScrollSpy(): ScrollSpyState {
  const [state, setState] = useState<ScrollSpyState>({
    activeSection: "home",
    isOverDark: true,
    isScrolled: false,
    showDots: false,
    showNextBtn: false,
    isAtBottom: false,
  });

  useEffect(() => {
    let rafPending = false;

    function update() {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const docH = document.documentElement.scrollHeight;

      const isScrolled = scrollY > 10;
      const showDots = scrollY > vh * 0.4;
      const isAtBottom = scrollY + vh >= docH - 40;
      const showNextBtn = scrollY > vh * 0.2 && !isAtBottom;

      // Find active section by measuring which section occupies the middle viewport
      let active = SECTION_IDS[0];
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= vh * 0.5) {
          active = id;
        }
      }

      setState({
        activeSection: active,
        isOverDark: DARK_SECTIONS.has(active),
        isScrolled,
        showDots,
        showNextBtn,
        isAtBottom,
      });
    }

    function onScroll() {
      if (rafPending) return;
      rafPending = true;
      requestAnimationFrame(() => {
        update();
        rafPending = false;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    update(); // initial
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return state;
}
