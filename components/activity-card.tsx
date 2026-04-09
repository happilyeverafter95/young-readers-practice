import Image from "next/image";
import Link from "next/link";
import { Activity } from "@/lib/content/activities";
import { ActivityRecord } from "@/lib/progress/store";

type ActivityCardProps = {
  activity: Activity;
  record?: ActivityRecord;
  locked: boolean;
  /** Smaller thumbnail on /learn (e.g. Stage 1 cat preview). */
  compactLearnImage?: boolean;
};

export function ActivityCard({ activity, record, locked, compactLearnImage }: ActivityCardProps) {
  const imageClassName = compactLearnImage ? "activity-image activity-image--learn-compact" : "activity-image";
  const imageWidth = compactLearnImage ? 300 : 420;
  const imageHeight = compactLearnImage ? 188 : 260;

  return (
    <article className={`activity-card ${locked ? "locked" : ""}`}>
      <Image src={activity.imagePlaceholder} alt="" width={imageWidth} height={imageHeight} className={imageClassName} />
      <h3>{activity.title}</h3>
      <p>{activity.instructions}</p>
      {record ? (
        <p className="small-text">
          Best Score: {Math.round(record.bestScore * 100)}% | Stars: {record.stars}
        </p>
      ) : null}
      {locked ? (
        <span className="lock-text">Locked</span>
      ) : (
        <Link className="primary-button" href={`/activity/${activity.id}`}>
          Play
        </Link>
      )}
    </article>
  );
}
