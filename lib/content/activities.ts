export type StageNumber = 1 | 2 | 3;

export type ActivityQuestion = {
  id: string;
  prompt: string;
  options: string[];
  answerIndex: number;
  feedback: string;
  imagePlaceholder: string;
  /** Intro or story beat: no choices—learner taps Next (counts toward score). */
  informational?: boolean;
};

export type Activity = {
  id: string;
  stage: StageNumber;
  title: string;
  instructions: string;
  imagePlaceholder: string;
  questions: ActivityQuestion[];
};

export const stageNames: Record<StageNumber, string> = {
  1: "Picture and Word Match",
  2: "Picture and Phrases",
  3: "Tiny Sentences"
};

const wordOptionsCatRatBat = ["cat", "rat", "bat"] as const;
const wordOptionsDogLogFrog = ["dog", "log", "frog"] as const;
const wordOptionsJarCarStar = ["jar", "car", "star"] as const;

const placeholders = {
  stage1PicCat: "/placeholders/stage1-cat.png",
  stage1PicRat: "/placeholders/stage1-rat.png",
  stage1PicBat: "/placeholders/stage1-bat.png",
  stage1PicDog: "/placeholders/stage1-dog.png",
  stage1PicLog: "/placeholders/stage1-log.png",
  stage1PicFrog: "/placeholders/stage1-frog.png",
  stage1PicJar: "/placeholders/stage1-jar.png",
  stage1PicCar: "/placeholders/stage1-car.png",
  stage1PicStar: "/placeholders/stage1-star.png",
  stage2SamWave: "/placeholders/stage2-sam.png",
  stage2PamWave: "/placeholders/stage2-pam.png",
  stage2SamRun: "/placeholders/stage2-sam-run.png",
  stage2PamRun: "/placeholders/stage2-pam-ran.png",
  stage2BothHome: "/placeholders/stage2-both-home.png",
  stage2BothEat: "/placeholders/stage2-both-eat.png",
  stage2BothApples: "/placeholders/stage2-both-apples.png",
  shortSentence1: "/placeholders/stage3-sentences-1.svg",
  shortSentence2: "/placeholders/stage3-sentences-2.svg"
};

export const activities: Activity[] = [
  {
    id: "stage1-picture-words-all",
    stage: 1,
    title: "Picture words",
    instructions:
      "Pick the word that matches the picture.",
    imagePlaceholder: placeholders.stage1PicCat,
    questions: [
      {
        id: "q1",
        prompt: "Which word goes with this picture?",
        options: [...wordOptionsCatRatBat],
        answerIndex: 0,
        feedback: "Yes! Cat!",
        imagePlaceholder: placeholders.stage1PicCat
      },
      {
        id: "q2",
        prompt: "Which word goes with this picture?",
        options: [...wordOptionsCatRatBat],
        answerIndex: 1,
        feedback: "Nice! Rat!",
        imagePlaceholder: placeholders.stage1PicRat
      },
      {
        id: "q3",
        prompt: "Which word goes with this picture?",
        options: [...wordOptionsCatRatBat],
        answerIndex: 2,
        feedback: "Great! Bat!",
        imagePlaceholder: placeholders.stage1PicBat
      },
      {
        id: "q4",
        prompt: "Which word goes with this picture?",
        options: [...wordOptionsDogLogFrog],
        answerIndex: 0,
        feedback: "You got it! Dog!",
        imagePlaceholder: placeholders.stage1PicDog
      },
      {
        id: "q5",
        prompt: "Which word goes with this picture?",
        options: [...wordOptionsDogLogFrog],
        answerIndex: 1,
        feedback: "Right! Log!",
        imagePlaceholder: placeholders.stage1PicLog
      },
      {
        id: "q6",
        prompt: "Which word goes with this picture?",
        options: [...wordOptionsDogLogFrog],
        answerIndex: 2,
        feedback: "Super! Frog!",
        imagePlaceholder: placeholders.stage1PicFrog
      },
      {
        id: "q7",
        prompt: "Which word goes with this picture?",
        options: [...wordOptionsJarCarStar],
        answerIndex: 0,
        feedback: "Yes! Jar!",
        imagePlaceholder: placeholders.stage1PicJar
      },
      {
        id: "q8",
        prompt: "Which word goes with this picture?",
        options: [...wordOptionsJarCarStar],
        answerIndex: 1,
        feedback: "Nice! Car!",
        imagePlaceholder: placeholders.stage1PicCar
      },
      {
        id: "q9",
        prompt: "Which word goes with this picture?",
        options: [...wordOptionsJarCarStar],
        answerIndex: 2,
        feedback: "Great! Star!",
        imagePlaceholder: placeholders.stage1PicStar
      }
    ]
  },
  {
    id: "stage2-picture-phrases",
    stage: 2,
    title: "Sam and Pam",
    instructions: "Read each picture and phrase. When you see answer choices, tap the best one!",
    imagePlaceholder: placeholders.stage2SamWave,
    questions: [
      {
        id: "q1",
        informational: true,
        prompt: "This is Sam!",
        options: [],
        answerIndex: 0,
        feedback: "",
        imagePlaceholder: placeholders.stage2SamWave
      },
      {
        id: "q2",
        informational: true,
        prompt: "This is Pam!",
        options: [],
        answerIndex: 0,
        feedback: "",
        imagePlaceholder: placeholders.stage2PamWave
      },
      {
        id: "q3",
        prompt: "What is Sam doing?",
        options: ["Sam ran", "Sam ate", "Sam hopped"],
        answerIndex: 0,
        feedback: "Yes! Sam ran!",
        imagePlaceholder: placeholders.stage2SamRun
      },
      {
        id: "q4",
        prompt: "What is Pam doing?",
        options: ["Pam ran too", "Pam ate fruit", "Pam hopped"],
        answerIndex: 0,
        feedback: "Right! Pam ran too!",
        imagePlaceholder: placeholders.stage2PamRun
      },
      {
        id: "q5",
        prompt: "Where did Sam and Pam go?",
        options: ["Home", "Park", "Lake"],
        answerIndex: 0,
        feedback: "Home! Great job!",
        imagePlaceholder: placeholders.stage2BothHome
      },
      {
        id: "q6",
        prompt: "What is Sam and Pam doing now?",
        options: ["They ate lunch", "They sat", "They ran"],
        answerIndex: 0,
        feedback: "They ate lunch—yum!",
        imagePlaceholder: placeholders.stage2BothEat
      },
      {
        id: "q7",
        prompt: "What are they eating now?",
        options: ["apples", "grapes", "pear"],
        answerIndex: 0,
        feedback: "Apples! Crunchy and sweet!",
        imagePlaceholder: placeholders.stage2BothApples
      }
    ]
  },
  {
    id: "short-sentence-1",
    stage: 3,
    title: "Read a Tiny Sentence",
    instructions: "Read the sentence and pick the best answer.",
    imagePlaceholder: placeholders.shortSentence1,
    questions: [
      { id: "q1", prompt: "The cat naps. Who naps?", options: ["cat", "bus", "moon"], answerIndex: 0, feedback: "The cat naps!", imagePlaceholder: placeholders.shortSentence1 },
      { id: "q2", prompt: "We eat pie. What do we eat?", options: ["pie", "rock", "book"], answerIndex: 0, feedback: "Pie is right.", imagePlaceholder: placeholders.shortSentence1 },
      { id: "q3", prompt: "Sam has a red cap. What color is the cap?", options: ["red", "blue", "green"], answerIndex: 0, feedback: "Yes, it is red.", imagePlaceholder: placeholders.shortSentence1 }
    ]
  },
  {
    id: "short-sentence-2",
    stage: 3,
    title: "Sentence Detective",
    instructions: "Use clues in the sentence.",
    imagePlaceholder: placeholders.shortSentence2,
    questions: [
      { id: "q1", prompt: "Mia kicks a ball. What does Mia kick?", options: ["ball", "star", "pillow"], answerIndex: 0, feedback: "Mia kicks a ball!", imagePlaceholder: placeholders.shortSentence2 },
      { id: "q2", prompt: "The fish swims fast. Who swims?", options: ["fish", "chair", "hat"], answerIndex: 0, feedback: "The fish swims.", imagePlaceholder: placeholders.shortSentence2 },
      { id: "q3", prompt: "I see two ducks. How many ducks?", options: ["two", "one", "five"], answerIndex: 0, feedback: "Two ducks, great job!", imagePlaceholder: placeholders.shortSentence2 }
    ]
  }
];

/** Every stage that exists in `activities` (keep in sync when adding content). */
export const allStages: StageNumber[] = [1, 2, 3];

/** Stages shown in the app (tabs, home, progress). Omit stages that are not ready to ship. */
export const publishedStages: StageNumber[] = [1, 2];

export function getPublishedActivities(): Activity[] {
  return activities.filter((activity) => publishedStages.includes(activity.stage));
}

export function getActivitiesForStage(stage: StageNumber): Activity[] {
  return activities.filter((activity) => activity.stage === stage);
}

export function getActivityById(activityId: string): Activity | undefined {
  return activities.find((activity) => activity.id === activityId);
}

function shuffleCopy<T>(items: T[]): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** How many picture-word questions to run per stage 1 session. */
const STAGE1_QUESTIONS_PER_SESSION = 6;

function stage1FamilyIndex(question: ActivityQuestion): 0 | 1 | 2 {
  const first = question.options[0];
  if (first === wordOptionsCatRatBat[0]) return 0;
  if (first === wordOptionsDogLogFrog[0]) return 1;
  return 2;
}

/**
 * Picks six questions without repeating any item. Tries to limit repeats of the same
 * answer bank by taking two random items from each rhyme family (2×3 = 6).
 */
function pickStage1SessionQuestions(questions: ActivityQuestion[]): ActivityQuestion[] {
  const families: [ActivityQuestion[], ActivityQuestion[], ActivityQuestion[]] = [[], [], []];
  for (const q of questions) {
    families[stage1FamilyIndex(q)].push(q);
  }

  const picked: ActivityQuestion[] = [];
  for (const family of families) {
    picked.push(...shuffleCopy(family).slice(0, 2));
  }

  const need = STAGE1_QUESTIONS_PER_SESSION - picked.length;
  if (need > 0) {
    const pool = shuffleCopy(questions.filter((q) => !picked.includes(q)));
    picked.push(...pool.slice(0, need));
  }

  return shuffleCopy(picked);
}

function shuffleQuestionOptionsCopy(question: ActivityQuestion): ActivityQuestion {
  if (question.informational || question.options.length < 2) {
    return { ...question };
  }
  const tagged = question.options.map((text, originalIndex) => ({ text, originalIndex }));
  const shuffled = shuffleCopy(tagged);
  return {
    ...question,
    options: shuffled.map((t) => t.text),
    answerIndex: shuffled.findIndex((t) => t.originalIndex === question.answerIndex)
  };
}

function buildStage2PlayQuestions(questions: ActivityQuestion[]): ActivityQuestion[] {
  return questions.map((q) => shuffleQuestionOptionsCopy(q));
}

const activityPlayQuestionsCache = new Map<string, ActivityQuestion[]>();

/**
 * Stage 1: six questions per session, spread across word families when possible.
 * Stage 2: answer choices are shuffled so the correct option is not always first.
 * Order is stable for the page load (module cache) so dev Strict Mode does not
 * reshuffle between double-mounts.
 */
export function getActivityQuestionsInPlayOrder(activity: Activity): ActivityQuestion[] {
  const cached = activityPlayQuestionsCache.get(activity.id);
  if (cached) return cached;

  let out: ActivityQuestion[];
  if (activity.stage === 1) {
    out = pickStage1SessionQuestions([...activity.questions]);
  } else if (activity.stage === 2) {
    out = buildStage2PlayQuestions(activity.questions);
  } else {
    out = [...activity.questions];
  }
  activityPlayQuestionsCache.set(activity.id, out);
  return out;
}
