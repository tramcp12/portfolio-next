"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Mount this once in the layout — it activates the IntersectionObserver
 * that adds `.visible` to `.cp12-reveal` elements across the whole page.
 * Renders nothing visible itself.
 */
export default function ScrollReveal() {
  useScrollReveal();
  return null;
}
