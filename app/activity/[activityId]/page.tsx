"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useParams } from "next/navigation";
import { getActivityById } from "@/lib/content/activities";
import { useProgress } from "@/components/progress-context";

export default function ActivityPage() {
  const params = useParams<{ activityId: string }>();
  const activity = getActivityById(params.activityId);
  const { completeOneActivity, progress } = useProgress();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const question = activity?.questions[index];
  const isLast = activity ? index === activity.questions.length - 1 : false;

  const doneMessage = (() => {
    if (!activity) return "";
    const percent = Math.round((correctCount / activity.questions.length) * 100);
    if (percent >= 90) return "Amazing work! You are a reading superstar!";
    if (percent >= 70) return "Great reading! Keep going!";
    return "Nice effort! Practice makes progress!";
  })();

  if (!activity || !question) {
    return (
      <main className="container">
        <h1>Activity not found</h1>
        <Link href="/learn" className="primary-button">
          Back to Learning Path
        </Link>
      </main>
    );
  }
  const activeActivity = activity;
  const currentQuestion = question;

  function submitAnswer() {
    if (selected === null || submitted) return;
    const isCorrect = selected === currentQuestion.answerIndex;
    if (isCorrect) {
      setCorrectCount((value) => value + 1);
    }
    setSubmitted(true);
  }

  function nextStep() {
    if (!submitted) return;
    if (isLast) {
      const finalCorrect = correctCount;
      completeOneActivity(activeActivity.id, finalCorrect, activeActivity.questions.length);
      setShowCelebration(true);
      return;
    }
    setSelected(null);
    setSubmitted(false);
    setIndex((value) => value + 1);
  }

  if (showCelebration) {
    const record = progress.activityRecords[activeActivity.id];
    return (
      <main className="container">
        <section className="celebration">
          <h1>You finished {activeActivity.title}!</h1>
          <p>{doneMessage}</p>
          <p>Stars earned for this activity: {record?.stars ?? 0}</p>
          <div className="hero-actions">
            <Link href="/learn" className="primary-button">
              Continue Learning
            </Link>
            <Link href="/progress" className="secondary-button">
              See Rewards
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="container">
      <h1>{activeActivity.title}</h1>
      <p>{activeActivity.instructions}</p>
      <p className="small-text">
        Question {index + 1} of {activeActivity.questions.length}
      </p>

      <section className="question-card">
        <Image src={currentQuestion.imagePlaceholder} alt="" width={560} height={340} className="activity-image question-image" />
        <h2>{currentQuestion.prompt}</h2>
        <div className="option-grid">
          {currentQuestion.options.map((option, optionIndex) => {
            const className = selected === optionIndex ? "option-button selected" : "option-button";
            return (
              <button
                type="button"
                key={option}
                className={className}
                onClick={() => setSelected(optionIndex)}
                disabled={submitted}
              >
                {option}
              </button>
            );
          })}
        </div>

        {submitted && (
          <p className={selected === currentQuestion.answerIndex ? "good-feedback" : "try-feedback"}>
            {selected === currentQuestion.answerIndex ? currentQuestion.feedback : "Good try! Let's keep learning."}
          </p>
        )}

        <div className="hero-actions">
          {!submitted ? (
            <button type="button" className="primary-button" onClick={submitAnswer} disabled={selected === null}>
              Check Answer
            </button>
          ) : (
            <button type="button" className="primary-button" onClick={nextStep}>
              {isLast ? "Finish Activity" : "Next Question"}
            </button>
          )}
          <Link href="/learn" className="secondary-button">
            Back
          </Link>
        </div>
      </section>
    </main>
  );
}
