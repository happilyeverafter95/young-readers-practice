"use client";

import { useMemo } from "react";
import Link from "next/link";
import { activities, allStages, getActivitiesForStage, stageNames } from "@/lib/content/activities";
import { useProgress } from "@/components/progress-context";

export default function ParentPage() {
  const { progress, summary, canAccessStage, resetProgress } = useProgress();

  const stageSummaries = useMemo(() => {
    return allStages.map((stage) => {
      const stageActivities = getActivitiesForStage(stage);
      const completed = stageActivities.filter((activity) => progress.activityRecords[activity.id]).length;
      const avgScore =
        completed === 0
          ? 0
          : stageActivities.reduce((sum, activity) => {
              const record = progress.activityRecords[activity.id];
              return sum + (record?.bestScore ?? 0);
            }, 0) / completed;
      return {
        stage,
        completed,
        total: stageActivities.length,
        avgScore,
        unlocked: canAccessStage(stage)
      };
    });
  }, [canAccessStage, progress.activityRecords]);

  const recentRecords = Object.values(progress.activityRecords)
    .sort((a, b) => b.completedAt.localeCompare(a.completedAt))
    .slice(0, 5);

  return (
    <main className="container">
      <h1>Parent Progress Summary</h1>
      <p>Track completion and celebrate progress with your child.</p>

      <section className="panel reward-row">
        <div>
          <h2>{summary.completedCount}/{activities.length}</h2>
          <p>Completed activities</p>
        </div>
        <div>
          <h2>{Math.round(summary.averageBestScore * 100)}%</h2>
          <p>Average best score</p>
        </div>
        <div>
          <h2>{progress.totalStars}</h2>
          <p>Total stars earned</p>
        </div>
      </section>

      <section className="panel">
        <h2>Stage Breakdown</h2>
        <ul className="parent-list">
          {stageSummaries.map((item) => (
            <li key={item.stage}>
              Stage {item.stage} - {stageNames[item.stage]}: {item.completed}/{item.total} completed, avg score {Math.round(item.avgScore * 100)}%, {item.unlocked ? "unlocked" : "locked"}
            </li>
          ))}
        </ul>
      </section>

      <section className="panel">
        <h2>Recent Activity</h2>
        {recentRecords.length === 0 ? (
          <p>No completed activity yet.</p>
        ) : (
          <ul className="parent-list">
            {recentRecords.map((record) => (
              <li key={record.activityId + record.completedAt}>
                {record.activityId}: {Math.round(record.bestScore * 100)}% best, {record.stars} stars
              </li>
            ))}
          </ul>
        )}
      </section>

      <div className="hero-actions">
        <Link href="/learn" className="primary-button">
          Back to Learning
        </Link>
        <button type="button" className="secondary-button" onClick={resetProgress}>
          Reset Progress
        </button>
      </div>
    </main>
  );
}
