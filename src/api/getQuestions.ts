import { QuestionData } from '../enums/QuestionTypes';
import { shuffle } from '../utils/arrayUtils';

export const fetchQuestions = async (categories: string) => {
  const sortedCategories = categories.replace(/ /g, '');
  try {
    const endpoint = `https://the-trivia-api.com/api/questions?categories=${sortedCategories}&limit=10&difficulty=medium`;
    const data = await (await fetch(endpoint)).json();
    return data.map((question: QuestionData) => ({
      ...question,
      answers: shuffle([...question.incorrectAnswers, question.correctAnswer]),
    }));
  } catch (error) {
    console.error(error);
  }
};
