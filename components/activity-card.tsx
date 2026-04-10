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
  const frameClass = compactLearnImage
    ? "learn-activity-preview-frame learn-activity-preview-frame--compact"
    : "learn-activity-preview-frame";

  return (
    <article className={`activity-card ${locked ? "locked" : ""}`}>
      <div className={frameClass}>
        <Image
          src={activity.imagePlaceholder}
          alt=""
          fill
          className="learn-activity-preview-image"
          sizes={compactLearnImage ? "260px" : "420px"}
        />
      </div>
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
