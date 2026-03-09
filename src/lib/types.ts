// ─── Core domain types for Trạm CP12 Next.js site ───────────

export type Locale = "vi" | "en";

// ── Room ──────────────────────────────────────────────────────

export interface RoomPhoto {
  src: string;
  alt: string;
  alt_vi: string;
}

export interface RoomMeta {
  icon: string;
  text: string;
}

export interface Room {
  id: string;
  /** Path relative to public/ — optional for comingSoon rooms where modal never opens */
  coverPhoto?: string;
  /** English room name */
  name: string;
  /** Vietnamese room name */
  name_vi: string;
  /** Short "best for" blurb — English */
  bestFor?: string;
  /** Short "best for" blurb — Vietnamese */
  bestFor_vi?: string;
  /** Price string e.g. "585K" */
  price: string;
  featured: boolean;
  /** When true: card shows "Coming Soon" badge; modal cannot open */
  comingSoon?: boolean;
  /** Long description — English */
  desc: string;
  /** Long description — Vietnamese */
  desc_vi: string;
  /** Quick-info pills (guest count, etc.) — English */
  meta: RoomMeta[];
  /** Quick-info pills — Vietnamese */
  meta_vi: RoomMeta[];
  /** Amenity list — English */
  amenities: string[];
  /** Amenity list — Vietnamese */
  amenities_vi: string[];
  /** Ordered gallery photos */
  photos: RoomPhoto[];
}

// ── Travel / Explore ──────────────────────────────────────────

export type TravelCategory = "running" | "food" | "nature";
export type TravelDifficulty = "Easy" | "Moderate" | "Hard" | "Easy–Med";

export interface TravelCard {
  /** CSS class for layered gradient background (ti1–ti6) */
  bgClass: string;
  category: TravelCategory;
  badge?: string;
  difficulty: TravelDifficulty;
  cat: string;
  name: string;
  distance: string;
  duration: string;
  highlight: string;
}

// ── Journal ───────────────────────────────────────────────────

export interface JournalPost {
  /** CSS class for card background gradient (bi1–bi3) */
  bgClass: string;
  large: boolean;
  imgLabel: string;
  cat: string;
  title: string;
  excerpt: string;
  linkText: string;
  linkLabel: string;
  href: string;
}
