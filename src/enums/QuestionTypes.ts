export type QuestionData = {
  id: number;
  correctAnswer: string;
  incorrectAnswers: string[];
  question: string;
};

export type QuestionState = QuestionData & { answers: string[] };
