export type StageNumber = 1 | 2 | 3;

export type ActivityQuestion = {
  id: string;
  prompt: string;
  options: string[];
  answerIndex: number;
  feedback: string;
  imagePlaceholder: string;
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
  2: "Rhyming words",
  3: "Tiny Sentences"
};

const wordOptionsCatRatBat = ["cat", "rat", "bat"] as const;
const wordOptionsDogLogFrog = ["dog", "log", "frog"] as const;

const placeholders = {
  stage1PicCat: "/placeholders/stage1-cat.png",
  stage1PicRat: "/placeholders/stage1-rat.png",
  stage1PicBat: "/placeholders/stage1-bat.png",
  stage1PicDog: "/placeholders/stage1-dog.png",
  stage1PicLog: "/placeholders/stage1-log.png",
  stage1PicFrog: "/placeholders/stage1-frog.png",
  matchWordPicture1: "/placeholders/stage2-match-1.svg",
  matchWordPicture2: "/placeholders/stage2-match-2.svg",
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
      }
    ]
  },
  {
    id: "match-word-picture-1",
    stage: 2,
    title: "Find the Right Picture Word",
    instructions: "Choose the word that matches the picture idea.",
    imagePlaceholder: placeholders.matchWordPicture1,
    questions: [
      { id: "q1", prompt: "A picture of a red apple. Pick the word.", options: ["apple", "train", "shoe"], answerIndex: 0, feedback: "Yes, that is apple!", imagePlaceholder: placeholders.matchWordPicture1 },
      { id: "q2", prompt: "A picture of a small dog. Pick the word.", options: ["dog", "star", "drum"], answerIndex: 0, feedback: "Great! Dog is right.", imagePlaceholder: placeholders.matchWordPicture1 },
      { id: "q3", prompt: "A picture of a blue car. Pick the word.", options: ["car", "milk", "tree"], answerIndex: 0, feedback: "Nice matching!", imagePlaceholder: placeholders.matchWordPicture1 }
    ]
  },
  {
    id: "match-word-picture-2",
    stage: 2,
    title: "Picture Word Helper",
    instructions: "Pick the word that belongs to the picture.",
    imagePlaceholder: placeholders.matchWordPicture2,
    questions: [
      { id: "q1", prompt: "A picture of a happy sun. Pick the word.", options: ["sun", "fish", "hat"], answerIndex: 0, feedback: "You found sun!", imagePlaceholder: placeholders.matchWordPicture2 },
      { id: "q2", prompt: "A picture of a green frog. Pick the word.", options: ["frog", "clock", "jam"], answerIndex: 0, feedback: "Yes! Frog is correct.", imagePlaceholder: placeholders.matchWordPicture2 },
      { id: "q3", prompt: "A picture of a tall tree. Pick the word.", options: ["tree", "cup", "pen"], answerIndex: 0, feedback: "Great reading!", imagePlaceholder: placeholders.matchWordPicture2 }
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

export const allStages: StageNumber[] = [1, 2, 3];

export function getActivitiesForStage(stage: StageNumber): Activity[] {
  return activities.filter((activity) => activity.stage === stage);
}

export function getActivityById(activityId: string): Activity | undefined {
  return activities.find((activity) => activity.id === activityId);
}
