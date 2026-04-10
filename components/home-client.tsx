"use client";

import Link from "next/link";
import { getActivitiesForStage, publishedStages, stageNames } from "@/lib/content/activities";
import { useProgress } from "@/components/progress-context";

const MAX_TROPHIES_SHOWN = 14;

function mascotMessage(completed: number, total: number): string {
  if (total === 0) return "Hi! I'm Pinky. Tap Start Learning and we'll read together!";
  if (completed === 0) return "Hi! I'm Pinky. Tap Start Learning and we'll read together!";
  if (completed >= total) return "You finished every activity! I'm doing a happy dance!";
  const half = total / 2;
  if (completed >= half) return "You're past halfway — you're a reading star!";
  if (completed === 1) return "One activity done! That was awesome!";
  if (completed >= 2) return "You're on a roll! Want to do another one?";
  return "Nice work — let's keep going!";
}

export function HomeClient() {
  const { summary, progress, canAccessStage } = useProgress();

  const { completedCount, totalActivities } = summary;
  const total = totalActivities || 1;
  const progressPercent = Math.min(100, Math.round((completedCount / total) * 100));

  let nextHref = "/learn";
  let nextLabel = "Explore all stages";
  for (const stage of publishedStages) {
    if (!canAccessStage(stage)) continue;
    const acts = getActivitiesForStage(stage);
    const hasIncomplete = acts.some((a) => !progress.activityRecords[a.id]);
    if (hasIncomplete) {
      nextHref = `/learn?stage=${stage}`;
      nextLabel = `Next: ${stageNames[stage]}`;
      break;
    }
  }

  const shownTrophies = Math.min(progress.totalStars, MAX_TROPHIES_SHOWN);
  const trophyOverflow = Math.max(0, progress.totalStars - MAX_TROPHIES_SHOWN);
  const trophyWord = progress.totalStars === 1 ? "trophy" : "trophies";

  return (
    <section className="panel journey-panel">
      <h2 className="journey-title">Your adventure with Pinky</h2>

      <p className="journey-mascot" role="status">
        {mascotMessage(completedCount, totalActivities)}
      </p>

      <div className="journey-progress-block">
        <div className="journey-progress-label">
          <span>Your path</span>
          <span className="journey-progress-count">
            {completedCount} / {totalActivities} activities
          </span>
        </div>
        <div className="journey-progress-track" role="progressbar" aria-valuenow={progressPercent} aria-valuemin={0} aria-valuemax={100}>
          <div className="journey-progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      <div className="journey-trophies-block">
        <p className="journey-trophies-label">
          You earned {progress.totalStars} {trophyWord}
        </p>
        {progress.totalStars === 0 ? (
          <p className="journey-trophies-empty">
            <span className="journey-trophy journey-trophy--placeholder" aria-hidden>
              🏆
            </span>
            <span className="journey-trophy journey-trophy--placeholder" aria-hidden>
              🏆
            </span>
            <span className="journey-trophy journey-trophy--placeholder" aria-hidden>
              🏆
            </span>
          </p>
        ) : (
          <div
            key={progress.totalStars}
            className="journey-trophies journey-trophies--entrance"
            aria-label={`${progress.totalStars} trophies`}
          >
            {Array.from({ length: shownTrophies }, (_, i) => (
              <span key={i} className="journey-trophy journey-trophy--filled" aria-hidden>
                🏆
              </span>
            ))}
            {trophyOverflow > 0 ? (
              <span className="journey-trophies-more" aria-hidden>
                +{trophyOverflow}
              </span>
            ) : null}
          </div>
        )}
      </div>

      <p className="journey-streak">
        {progress.streakDays > 0
          ? `Reading streak: ${progress.streakDays} day${progress.streakDays === 1 ? "" : "s"} in a row!`
          : "Practice on more than one day to grow a reading streak!"}
      </p>

      <div className="journey-cta-wrap">
        <Link href={nextHref} className="primary-button journey-cta">
          {nextLabel}
        </Link>
      </div>

      <details className="journey-parent-details">
        <summary>For grown-ups</summary>
        {completedCount === 0 ? (
          <p>Progress is saved on this device only (no account).</p>
        ) : (
          <p>
            Average best score across finished activities: {Math.round(summary.averageBestScore * 100)}%. Completion:{" "}
            {progressPercent}% of all activities.
          </p>
        )}
      </details>
    </section>
  );
}
