"use client";

import { useProgress } from "@/components/progress-context";

export function HomeClient() {
  const { summary, progress } = useProgress();
  return (
    <section className="panel">
      <h2>Your Reading Journey</h2>
      <p>
        Completed: {summary.completedCount}/{summary.totalActivities} activities
      </p>
      <p>Stars Earned: {progress.totalStars}</p>
      <p>Streak Days: {progress.streakDays}</p>
    </section>
  );
}
