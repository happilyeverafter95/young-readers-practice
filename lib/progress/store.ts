import { STAGE_COMPLETION_BADGE, normalizeBadgeId } from "@/lib/content/badges";
import {
  StageNumber,
  getActivitiesForStage,
  getPublishedActivities,
  publishedStages
} from "@/lib/content/activities";

export type ActivityRecord = {
  activityId: string;
  attempts: number;
  correct: number;
  total: number;
  bestScore: number;
  stars: number;
  completedAt: string;
};

export type ProgressState = {
  activityRecords: Record<string, ActivityRecord>;
  badges: string[];
  totalStars: number;
  streakDays: number;
  lastCompletedDate: string | null;
};

const STORAGE_KEY = "young-readers-progress-v1";

export const emptyProgressState: ProgressState = {
  activityRecords: {},
  badges: [],
  totalStars: 0,
  streakDays: 0,
  lastCompletedDate: null
};

export function scoreToStars(score: number): number {
  if (score >= 0.9) return 3;
  if (score >= 0.75) return 2;
  if (score >= 0.5) return 1;
  return 0;
}

function toDateOnly(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function computeStreak(lastCompletedDate: string | null, now: Date): number {
  if (!lastCompletedDate) return 1;
  const today = toDateOnly(now);
  if (lastCompletedDate === today) {
    return 0;
  }

  const last = new Date(`${lastCompletedDate}T00:00:00`);
  const current = new Date(`${today}T00:00:00`);
  const diffMs = current.getTime() - last.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 1) return 1;
  if (diffDays > 1) return 0;
  return 0;
}

export function isStageUnlocked(progress: ProgressState, stage: StageNumber): boolean {
  if (stage === 1) return true;
  const previousStage = (stage - 1) as StageNumber;
  const previousActivities = getActivitiesForStage(previousStage);
  if (previousActivities.length === 0) return true;

  const records = previousActivities
    .map((activity) => progress.activityRecords[activity.id])
    .filter(Boolean) as ActivityRecord[];

  if (records.length < previousActivities.length) return false;
  const averageBestScore = records.reduce((sum, record) => sum + record.bestScore, 0) / records.length;
  return averageBestScore >= 0.7;
}

function stageBadge(stage: StageNumber): string {
  return STAGE_COMPLETION_BADGE[stage];
}

function recalcBadges(progress: ProgressState): string[] {
  const badges = new Set(progress.badges.map(normalizeBadgeId));
  for (const stage of publishedStages) {
    const stageActivities = getActivitiesForStage(stage);
    if (stageActivities.length === 0) continue;
    const records = stageActivities
      .map((activity) => progress.activityRecords[activity.id])
      .filter(Boolean) as ActivityRecord[];
    if (records.length !== stageActivities.length) continue;
    const averageBestScore = records.reduce((sum, record) => sum + record.bestScore, 0) / records.length;
    if (averageBestScore >= 0.7) {
      badges.add(stageBadge(stage));
    }
  }
  return [...badges];
}

function recalcTotalStars(activityRecords: Record<string, ActivityRecord>): number {
  return Object.values(activityRecords).reduce((sum, record) => sum + record.stars, 0);
}

export function completeActivity(
  progress: ProgressState,
  activityId: string,
  correct: number,
  total: number,
  completedAt: Date = new Date()
): ProgressState {
  const existing = progress.activityRecords[activityId];
  const score = total === 0 ? 0 : correct / total;
  const stars = scoreToStars(score);
  const nextRecord: ActivityRecord = {
    activityId,
    attempts: (existing?.attempts ?? 0) + 1,
    correct,
    total,
    bestScore: Math.max(existing?.bestScore ?? 0, score),
    stars: Math.max(existing?.stars ?? 0, stars),
    completedAt: completedAt.toISOString()
  };

  const nextRecords = {
    ...progress.activityRecords,
    [activityId]: nextRecord
  };

  const streakDelta = computeStreak(progress.lastCompletedDate, completedAt);
  const isSameDay = progress.lastCompletedDate === toDateOnly(completedAt);
  const nextStreak = isSameDay
    ? progress.streakDays
    : progress.streakDays === 0
      ? 1
      : streakDelta === 1
        ? progress.streakDays + 1
        : 1;

  const nextProgress: ProgressState = {
    ...progress,
    activityRecords: nextRecords,
    totalStars: recalcTotalStars(nextRecords),
    streakDays: nextStreak,
    lastCompletedDate: toDateOnly(completedAt)
  };
  return { ...nextProgress, badges: recalcBadges(nextProgress) };
}

export function getProgressSummary(progress: ProgressState) {
  const published = getPublishedActivities();
  const completedPublishedRecords = published
    .map((activity) => progress.activityRecords[activity.id])
    .filter(Boolean) as ActivityRecord[];
  const completedCount = completedPublishedRecords.length;
  const totalActivities = published.length;
  const completionRate = totalActivities === 0 ? 0 : completedCount / totalActivities;
  const averageBestScore =
    completedPublishedRecords.length === 0
      ? 0
      : completedPublishedRecords.reduce((sum, record) => sum + record.bestScore, 0) / completedPublishedRecords.length;
  return {
    completedCount,
    totalActivities,
    completionRate,
    averageBestScore
  };
}

export function loadProgress(): ProgressState {
  if (typeof window === "undefined") return emptyProgressState;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyProgressState;
    const parsed = JSON.parse(raw) as ProgressState;
    const merged = {
      ...emptyProgressState,
      ...parsed,
      badges: [...new Set((parsed.badges ?? []).map(normalizeBadgeId))],
      totalStars: recalcTotalStars(parsed.activityRecords ?? {})
    };
    return { ...merged, badges: recalcBadges(merged) };
  } catch {
    return emptyProgressState;
  }
}

export function saveProgress(progress: ProgressState): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}
