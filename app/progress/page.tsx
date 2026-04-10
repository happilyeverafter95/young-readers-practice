"use client";

import Link from "next/link";
import {
  type BadgeDefinition,
  filterPublishedBadgeIds,
  getBadgeDefinition,
  sortBadgeIds
} from "@/lib/content/badges";
import { useProgress } from "@/components/progress-context";

export default function ProgressPage() {
  const { progress, summary } = useProgress();
  const badgeIds = sortBadgeIds(filterPublishedBadgeIds(progress.badges));
  const badgeCards = badgeIds
    .map((id) => getBadgeDefinition(id))
    .filter((def): def is BadgeDefinition => def != null);

  return (
    <main className="container progress-rewards">
      <header className="rewards-hero">
        <p className="rewards-hero-emoji" aria-hidden="true">
          🏆✨
        </p>
        <h1>My Rewards</h1>
        <p className="rewards-hero-lead">Your reading treasure chest—stars, streaks, and shiny badges!</p>
      </header>

      <section className="panel reward-row">
        <div className="reward-stat">
          <span className="reward-stat-emoji" aria-hidden="true">
            ⭐
          </span>
          <h2>{progress.totalStars} Stars</h2>
          <p>Total stars from completed activities.</p>
        </div>
        <div className="reward-stat">
          <span className="reward-stat-emoji" aria-hidden="true">
            🔥
          </span>
          <h2>{progress.streakDays} Day Streak</h2>
          <p>Practice a little each day to grow your streak.</p>
        </div>
        <div className="reward-stat">
          <span className="reward-stat-emoji" aria-hidden="true">
            🎯
          </span>
          <h2>{Math.round(summary.completionRate * 100)}% Done</h2>
          <p>Activities completed so far.</p>
        </div>
      </section>

      <section className="panel badges-panel">
        <h2 className="badges-panel-title">
          <span aria-hidden="true">🎖️</span> Badge collection
        </h2>
        {badgeCards.length === 0 ? (
          <div className="badge-empty">
            <p className="badge-empty-emoji" aria-hidden="true">
              🎁
            </p>
            <p className="badge-empty-title">No badges yet—adventure awaits!</p>
            <p className="badge-empty-hint">Finish a whole learning stage with a strong score to earn your first badge.</p>
          </div>
        ) : (
          <ul className="badge-grid">
            {badgeCards.map((badge) => (
              <li key={badge.id} className="badge-card">
                <span className="badge-card-emoji" aria-hidden="true">
                  {badge.emoji}
                </span>
                <h3 className="badge-card-title">{badge.title}</h3>
                <p className="badge-card-tagline">{badge.tagline}</p>
              </li>
            ))}
          </ul>
        )}
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
