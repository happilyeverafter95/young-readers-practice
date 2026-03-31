"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  ProgressState,
  completeActivity,
  emptyProgressState,
  getProgressSummary,
  isStageUnlocked,
  loadProgress,
  saveProgress
} from "@/lib/progress/store";
import { StageNumber } from "@/lib/content/activities";

type ProgressContextValue = {
  progress: ProgressState;
  completeOneActivity: (activityId: string, correct: number, total: number) => void;
  canAccessStage: (stage: StageNumber) => boolean;
  resetProgress: () => void;
  summary: ReturnType<typeof getProgressSummary>;
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<ProgressState>(() => loadProgress());

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const value = useMemo<ProgressContextValue>(() => {
    return {
      progress,
      completeOneActivity: (activityId, correct, total) => {
        setProgress((current) => completeActivity(current, activityId, correct, total));
      },
      canAccessStage: (stage) => isStageUnlocked(progress, stage),
      resetProgress: () => setProgress(emptyProgressState),
      summary: getProgressSummary(progress)
    };
  }, [progress]);

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used within ProgressProvider");
  }
  return context;
}
