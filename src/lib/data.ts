/**
 * Typed data accessors — called in Server Components at build time.
 * JSON is imported statically so it is bundled into the server render.
 * No API routes or dynamic fetching needed for this static site.
 */

import roomsData from "../../data/rooms.json";
import travelData from "../../data/travel.json";
import journalData from "../../data/journal.json";
import type { Room, TravelCard, JournalPost } from "./types";

export function getRooms(): Room[] {
  return roomsData as Room[];
}

export function getFeaturedRoom(): Room | undefined {
  return getRooms().find((r) => r.featured);
}

export function getTravelCards(): TravelCard[] {
  return travelData as TravelCard[];
}

export function getJournalPosts(): JournalPost[] {
  return journalData as JournalPost[];
}

/**
 * Get a room's display name based on the current locale.
 * Use this helper in Server Components that receive the locale as a param.
 */
export function getRoomName(room: Room, locale: string): string {
  return locale === "vi" ? room.name_vi : room.name;
}

export function getRoomDesc(room: Room, locale: string): string {
  return locale === "vi" ? room.desc_vi : room.desc;
}

export function getRoomBestFor(room: Room, locale: string): string {
  return (locale === "vi" ? room.bestFor_vi : room.bestFor) ?? "";
}

export function getRoomMeta(room: Room, locale: string) {
  return locale === "vi" ? room.meta_vi : room.meta;
}

export function getRoomAmenities(room: Room, locale: string): string[] {
  return locale === "vi" ? room.amenities_vi : room.amenities;
}
