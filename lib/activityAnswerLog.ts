export type IncorrectAnswerLogPayload = {
  activityId: string;
  questionId: string;
  stage: number;
  selectedOption: string;
  correctOption: string;
};

export function logIncorrectAnswer(payload: IncorrectAnswerLogPayload): void {
  const entry = { kind: "incorrect_answer" as const, at: new Date().toISOString(), ...payload };
  console.info("[young-readers]", entry);
}
