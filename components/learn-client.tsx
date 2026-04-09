"use client";

import Link from "next/link";
import { useMemo } from "react";
import { ActivityCard } from "@/components/activity-card";
import { useProgress } from "@/components/progress-context";
import { StageNumber, activities, allStages, stageNames } from "@/lib/content/activities";

type LearnClientProps = {
  selectedStage: StageNumber;
};

export function LearnClient({ selectedStage }: LearnClientProps) {
  const { progress, canAccessStage } = useProgress();

  const stageActivities = useMemo(
    () => activities.filter((activity) => activity.stage === selectedStage),
    [selectedStage]
  );

  return (
    <main className="container">
      <h1>Learning Path</h1>
      <p>Pick a stage and complete each activity to unlock more challenges.</p>

      <div className="tab-row">
        {allStages.map((stage) => {
          const unlocked = canAccessStage(stage);
          return (
            <Link
              key={stage}
              className={`tab-button ${selectedStage === stage ? "active" : ""} ${!unlocked ? "locked" : ""}`}
              href={unlocked ? `/learn?stage=${stage}` : "#"}
              aria-disabled={!unlocked}
            >
              Stage {stage}: {stageNames[stage]}
            </Link>
          );
        })}
      </div>

      <section className="grid">
        {stageActivities.map((activity) => (
          <ActivityCard
            key={activity.id}
            activity={activity}
            record={progress.activityRecords[activity.id]}
            locked={!canAccessStage(activity.stage)}
            compactLearnImage={selectedStage === 1}
          />
        ))}
      </section>

      <div className="learn-nav-row">
        <Link href="/" className="secondary-button">
          Back to home
        </Link>
      </div>
    </main>
  );
}
