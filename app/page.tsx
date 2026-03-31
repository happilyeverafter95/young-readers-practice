import Image from "next/image";
import Link from "next/link";
import { allStages, stageNames } from "@/lib/content/activities";
import { StageCard } from "@/components/stage-card";
import { HomeClient } from "@/components/home-client";

const stageDescriptions: Record<number, string> = {
  1: "Read very short, simple phrases.",
  2: "Match words to picture ideas.",
  3: "Read tiny sentences and answer."
};

export default function HomePage() {
  return (
    <main className="container">
      <section className="hero">
        <h1>Learn to read with Pinky</h1>
        <p>Short, fun reading steps for ages 4-6.</p>
        <div className="hero-actions">
          <Link href="/learn" className="primary-button">
            Start Learning
          </Link>
          <Link href="/progress" className="secondary-button">
            My Rewards
          </Link>
          <Link href="/parent" className="secondary-button">
            Parent View
          </Link>
        </div>
      </section>

      <section className="hero-graphic panel">
        <div className="sparkle-frame" aria-hidden>
          <span className="sparkle sparkle-1">✦</span>
          <span className="sparkle sparkle-2">✦</span>
          <span className="sparkle sparkle-3">✦</span>
          <span className="sparkle sparkle-4">✦</span>
          <Image
            src="/placeholders/home-hero-placeholder.svg"
            alt="Happy reading adventure placeholder illustration"
            width={960}
            height={420}
            className="hero-graphic-image"
            priority
          />
        </div>
        <p className="hero-graphic-caption">Swap this image later with your custom front-page artwork.</p>
      </section>

      <HomeClient />

      <section className="grid">
        {allStages.map((stage) => (
          <StageCard
            key={stage}
            stage={stage}
            title={stageNames[stage]}
            description={stageDescriptions[stage]}
            unlocked
          />
        ))}
      </section>
    </main>
  );
}
