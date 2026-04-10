import type { StageNumber } from "./activities";

/** Stable ids stored in progress (and localStorage). */
export const STAGE_COMPLETION_BADGE: Record<StageNumber, string> = {
  1: "picture-word-star",
  2: "rhyme-ranger",
  3: "sentence-superstar"
};

export type BadgeDefinition = {
  id: string;
  emoji: string;
  title: string;
  tagline: string;
};

export const BADGE_CATALOG: Record<string, BadgeDefinition> = {
  "picture-word-star": {
    id: "picture-word-star",
    emoji: "🖼️",
    title: "Picture Word Star",
    tagline: "You matched every word to a picture!"
  },
  "rhyme-ranger": {
    id: "rhyme-ranger",
    emoji: "🎵",
    title: "Rhyme Ranger",
    tagline: "You finished every rhyming adventure!"
  },
  "sentence-superstar": {
    id: "sentence-superstar",
    emoji: "📖",
    title: "Sentence Superstar",
    tagline: "You read every tiny sentence like a champ!"
  }
};

const LEGACY_BADGE_MAP: Record<string, string> = {
  "stage-1-star": "picture-word-star",
  "stage-2-star": "rhyme-ranger",
  "stage-3-star": "sentence-superstar"
};

const BADGE_ORDER = ["picture-word-star", "rhyme-ranger", "sentence-superstar"] as const;

export function normalizeBadgeId(raw: string): string {
  return LEGACY_BADGE_MAP[raw] ?? raw;
}

export function getBadgeDefinition(id: string): BadgeDefinition | undefined {
  return BADGE_CATALOG[normalizeBadgeId(id)];
}

export function sortBadgeIds(ids: string[]): string[] {
  return [...new Set(ids.map(normalizeBadgeId))].sort((a, b) => {
    const ia = BADGE_ORDER.indexOf(a as (typeof BADGE_ORDER)[number]);
    const ib = BADGE_ORDER.indexOf(b as (typeof BADGE_ORDER)[number]);
    const sa = ia === -1 ? 99 : ia;
    const sb = ib === -1 ? 99 : ib;
    return sa - sb;
  });
}
