"use client";

import Link from "next/link";
import { useProgress } from "@/components/progress-context";

export default function ProgressPage() {
  const { progress, summary } = useProgress();
  const badges = progress.badges.length ? progress.badges : ["No badges yet - keep going!"];

  return (
    <main className="container">
      <h1>My Rewards</h1>
      <p>See how much you have grown as a reader.</p>

      <section className="panel reward-row">
        <div>
          <h2>{progress.totalStars} Stars</h2>
          <p>Total stars from completed activities.</p>
        </div>
        <div>
          <h2>{progress.streakDays} Day Streak</h2>
          <p>Read each day to keep your streak.</p>
        </div>
        <div>
          <h2>{Math.round(summary.completionRate * 100)}% Done</h2>
          <p>Activities completed so far.</p>
        </div>
      </section>

      <section className="panel">
        <h2>Badges</h2>
        <ul className="badge-list">
          {badges.map((badge) => (
            <li key={badge} className="badge-item">
              {badge}
            </li>
          ))}
        </ul>
      </section>

      <div className="hero-actions">
        <Link href="/learn" className="primary-button">
          Keep Learning
        </Link>
        <Link href="/parent" className="secondary-button">
          Parent Summary
        </Link>
      </div>
    </main>
  );
}
