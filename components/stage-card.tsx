import Link from "next/link";
import { StageNumber } from "@/lib/content/activities";

type StageCardProps = {
  stage: StageNumber;
  title: string;
  description: string;
  unlocked: boolean;
};

export function StageCard({ stage, title, description, unlocked }: StageCardProps) {
  return (
    <article className={`stage-card ${unlocked ? "unlocked" : "locked"}`}>
      <h3>Stage {stage}: {title}</h3>
      <p>{description}</p>
      {unlocked ? (
        <Link className="primary-button" href={`/learn?stage=${stage}`}>
          Start Stage {stage}
        </Link>
      ) : (
        <p className="lock-text">Complete the previous stage to unlock this one.</p>
      )}
    </article>
  );
}
