import Image from "next/image";
import Link from "next/link";
import { Activity } from "@/lib/content/activities";
import { ActivityRecord } from "@/lib/progress/store";

type ActivityCardProps = {
  activity: Activity;
  record?: ActivityRecord;
  locked: boolean;
};

export function ActivityCard({ activity, record, locked }: ActivityCardProps) {
  return (
    <article className={`activity-card ${locked ? "locked" : ""}`}>
      <Image src={activity.imagePlaceholder} alt="" width={420} height={260} className="activity-image" />
      <h3>{activity.title}</h3>
      <p>{activity.instructions}</p>
      <p className="small-text">
        {record ? `Best Score: ${Math.round(record.bestScore * 100)}% | Stars: ${record.stars}` : "Not started yet"}
      </p>
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
