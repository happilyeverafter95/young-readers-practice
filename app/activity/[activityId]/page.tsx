"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { getActivityById, getActivityQuestionsInPlayOrder, publishedStages } from "@/lib/content/activities";
import { logIncorrectAnswer } from "@/lib/activityAnswerLog";
import { useProgress } from "@/components/progress-context";

export default function ActivityPage() {
  const params = useParams<{ activityId: string }>();
  const activity = getActivityById(params.activityId);
  const playQuestions = useMemo(
    () => (activity ? getActivityQuestionsInPlayOrder(activity) : []),
    [activity]
  );
  const { completeOneActivity, progress } = useProgress();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [feedbackModal, setFeedbackModal] = useState<null | "correct" | "incorrect">(null);

  if (!activity) {
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

  if (!publishedStages.includes(activity.stage)) {
    return (
      <main className="container">
        <nav className="page-top-nav" aria-label="Activity navigation">
          <Link href="/learn" className="page-back-link">
            ← Back to learning path
          </Link>
        </nav>
        <h1>Coming soon</h1>
        <p>This reading step is not available yet. Pick a stage from the learning path.</p>
      </main>
    );
  }

  const question = playQuestions[index];
  const isLast = index === playQuestions.length - 1;

  const doneMessage = (() => {
    const percent = Math.round((correctCount / playQuestions.length) * 100);
    if (percent >= 90) return "Amazing work! You are a reading superstar!";
    if (percent >= 70) return "Great reading! Keep going!";
    return "Nice effort! Practice makes progress!";
  })();

  if (!question) {
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
      const correctOption = currentQuestion.options[currentQuestion.answerIndex] ?? "";
      const selectedOption = currentQuestion.options[optionIndex] ?? "";
      logIncorrectAnswer({
        activityId: activeActivity.id,
        questionId: currentQuestion.id,
        stage: activeActivity.stage,
        selectedOption,
        correctOption
      });
      setFeedbackModal("incorrect");
    }
  }

  function handleCorrectContinue() {
    setFeedbackModal(null);
    setSelected(null);
    if (isLast) {
      completeOneActivity(activeActivity.id, correctCount, playQuestions.length);
      setShowCelebration(true);
      return;
    }
    setIndex((value) => value + 1);
  }

  function handleIncorrectContinue() {
    setFeedbackModal(null);
    setSelected(null);
    if (isLast) {
      completeOneActivity(activeActivity.id, correctCount, playQuestions.length);
      setShowCelebration(true);
      return;
    }
    setIndex((value) => value + 1);
  }

  function handleInformationalContinue() {
    const nextCorrect = correctCount + 1;
    setCorrectCount(nextCorrect);
    if (isLast) {
      completeOneActivity(activeActivity.id, nextCorrect, playQuestions.length);
      setShowCelebration(true);
      return;
    }
    setIndex((value) => value + 1);
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
        Question {index + 1} of {playQuestions.length}
      </p>

      <section className="question-card">
        <div className="question-image-frame">
          <Image
            src={currentQuestion.imagePlaceholder}
            alt=""
            fill
            priority={index === 0}
            className="question-image-object"
            sizes="(max-width: 640px) calc(100vw - 2.5rem), 560px"
          />
        </div>
        <h2>{currentQuestion.prompt}</h2>
        {currentQuestion.informational ? (
          <div className="informational-continue-wrap">
            <button type="button" className="primary-button informational-next-button" onClick={handleInformationalContinue}>
              {isLast ? "Finish" : "Next"}
            </button>
          </div>
        ) : (
          <div
            className={
              activeActivity.stage === 1
                ? "option-grid option-grid--stage1-row"
                : activeActivity.stage === 2
                  ? "option-grid option-grid--single-column"
                  : "option-grid"
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
        )}
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
              Not quite
            </h2>
            <p className="feedback-modal-message">
              {activeActivity.stage === 1
                ? `That is not the right word. The answer is “${currentQuestion.options[currentQuestion.answerIndex] ?? ""}”.`
                : `That is not the right answer. The answer is “${currentQuestion.options[currentQuestion.answerIndex] ?? ""}”.`}
            </p>
            <button type="button" className="feedback-modal-button feedback-modal-button--wrong" onClick={handleIncorrectContinue}>
              {isLast ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      ) : null}
    </main>
  );
}
