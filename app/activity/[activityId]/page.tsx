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
  const [feedbackModal, setFeedbackModal] = useState<null | "correct" | "incorrect">(null);

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
        <nav className="page-top-nav" aria-label="Activity navigation">
          <Link href="/learn" className="page-back-link">
            ← Back to learning path
          </Link>
        </nav>
        <h1>Activity not found</h1>
        <p>This activity is missing. Use the link above to return.</p>
      </main>
    );
  }
  const activeActivity = activity;
  const currentQuestion = question;

  function handleOptionClick(optionIndex: number) {
    if (feedbackModal !== null) return;
    setSelected(optionIndex);
    if (optionIndex === currentQuestion.answerIndex) {
      setCorrectCount((value) => value + 1);
      setFeedbackModal("correct");
    } else {
      setFeedbackModal("incorrect");
    }
  }

  function handleCorrectContinue() {
    setFeedbackModal(null);
    setSelected(null);
    if (isLast) {
      completeOneActivity(activeActivity.id, correctCount, activeActivity.questions.length);
      setShowCelebration(true);
      return;
    }
    setIndex((value) => value + 1);
  }

  function handleIncorrectTryAgain() {
    setFeedbackModal(null);
    setSelected(null);
  }

  if (showCelebration) {
    const record = progress.activityRecords[activeActivity.id];
    return (
      <main className="container">
        <nav className="page-top-nav" aria-label="Activity navigation">
          <Link href="/learn" className="page-back-link">
            ← Back to learning path
          </Link>
        </nav>
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
      <nav className="page-top-nav" aria-label="Activity navigation">
        <Link href="/learn" className="page-back-link">
          ← Back to learning path
        </Link>
      </nav>
      <h1>{activeActivity.title}</h1>
      <p>{activeActivity.instructions}</p>
      <p className="small-text">
        Question {index + 1} of {activeActivity.questions.length}
      </p>

      <section className="question-card">
        <Image src={currentQuestion.imagePlaceholder} alt="" width={560} height={340} className="activity-image question-image" />
        <h2>{currentQuestion.prompt}</h2>
        <div
          className={
            activeActivity.stage === 1 ? "option-grid option-grid--stage1-row" : "option-grid"
          }
        >
          {currentQuestion.options.map((option, optionIndex) => {
            const className = selected === optionIndex ? "option-button selected" : "option-button";
            return (
              <button
                type="button"
                key={option}
                className={className}
                onClick={() => handleOptionClick(optionIndex)}
                disabled={feedbackModal !== null}
              >
                {option}
              </button>
            );
          })}
        </div>
      </section>

      {feedbackModal === "correct" ? (
        <div className="feedback-modal-backdrop" role="presentation">
          <div
            className="feedback-modal feedback-modal--correct"
            role="dialog"
            aria-modal="true"
            aria-labelledby="feedback-modal-title"
          >
            <div className="feedback-modal-icon feedback-modal-icon--correct" aria-hidden>
              ✓
            </div>
            <h2 id="feedback-modal-title" className="feedback-modal-heading">
              You got it!
            </h2>
            <p className="feedback-modal-message">{currentQuestion.feedback}</p>
            <button type="button" className="feedback-modal-button feedback-modal-button--correct" onClick={handleCorrectContinue}>
              {isLast ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      ) : null}

      {feedbackModal === "incorrect" ? (
        <div className="feedback-modal-backdrop" role="presentation">
          <div
            className="feedback-modal feedback-modal--incorrect"
            role="dialog"
            aria-modal="true"
            aria-labelledby="feedback-modal-wrong-title"
          >
            <div className="feedback-modal-icon feedback-modal-icon--wrong" aria-hidden>
              ✗
            </div>
            <h2 id="feedback-modal-wrong-title" className="feedback-modal-heading">
              Try again
            </h2>
            <p className="feedback-modal-message">That is not the right word. Pick another answer.</p>
            <button type="button" className="feedback-modal-button feedback-modal-button--wrong" onClick={handleIncorrectTryAgain}>
              OK
            </button>
          </div>
        </div>
      ) : null}
    </main>
  );
}
