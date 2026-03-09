# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (uses Turbopack)
npm run build    # Production build
npm run start    # Start production server
```

No test runner or linter is configured. TypeScript type-checking runs implicitly during build.

## Architecture Overview

**Trạm CP12** is a static marketing/booking site for a trail-runner homestay in Đà Lạt, Vietnam. It is a Next.js 16 App Router site with full i18n (Vietnamese/English).

### i18n (next-intl)

The site uses `next-intl` with `localePrefix: "always"`, so every URL is prefixed (`/vi/`, `/en/`). The routing entry point is:

- `middleware.ts` — locale detection and redirect
- `src/i18n/routing.ts` — defines `locales: ["vi", "en"]`, `defaultLocale: "vi"`
- `src/i18n/request.ts` — loads `messages/{locale}.json` per request
- `messages/en.json` / `messages/vi.json` — all UI strings

**Layout hierarchy:**
- `src/app/layout.tsx` — minimal root shell (required by Next.js, delegates to locale layout)
- `src/app/[locale]/layout.tsx` — real layout: sets `<html lang>`, loads fonts, renders `Nav`, `Footer`, `DotNav`, `NextSectionBtn`, `ScrollReveal`, and injects JSON-LD structured data

### Data Layer

All content is static JSON bundled at build time — no API routes or dynamic fetching.

- `data/rooms.json` — room listings
- `data/travel.json` — explore/activity cards
- `data/journal.json` — blog/journal posts
- `src/lib/data.ts` — typed accessors (`getRooms()`, `getTravelCards()`, etc.)
- `src/lib/types.ts` — TypeScript interfaces for all domain entities

Room data has bilingual fields (`name`/`name_vi`, `desc`/`desc_vi`, `amenities`/`amenities_vi`, etc.). Use the locale-aware helpers in `src/lib/data.ts` (e.g., `getRoomName(room, locale)`) rather than accessing fields directly.

### Component Structure

```
src/components/
  layout/     — Nav, Footer, DotNav, NextSectionBtn, ScrollReveal (shell/chrome)
  sections/   — Page sections: HeroSection, RoomsSection, ExploreSection, etc.
  common/     — Shared UI primitives
```

Each component has a co-located `.module.css` file. The site uses CSS Modules (no Tailwind, no CSS-in-JS).

**CSS custom properties** for fonts are set on `<body>`:
- `--font-serif` → Cormorant Garamond
- `--font-sans` → Be Vietnam Pro

### Custom Hooks

- `src/hooks/useScrollReveal.ts` — IntersectionObserver-based scroll animations
- `src/hooks/useScrollSpy.ts` — tracks active section for dot navigation
- `src/hooks/useFocusTrap.ts` — keyboard accessibility for `RoomModal`

### Static Assets

All images and videos live under `public/static/` and are served with 1-year immutable cache headers (configured in `vercel.json`). Images use `avif`/`webp` formats (configured in `next.config.ts`).

### Key Conventions

- **Server Components by default.** Only components requiring browser APIs or interactivity are Client Components (`"use client"`). Example: `RoomsClient.tsx` handles modal state; the parent `RoomsSection.tsx` is a Server Component that passes data down.
- **Bilingual content in JSON data** uses `_vi` suffix for Vietnamese fields. UI strings go in `messages/`.
- **`@/` path alias** maps to `src/` (configured in `tsconfig.json`).
- **No linter config exists.** Follow existing code style.
