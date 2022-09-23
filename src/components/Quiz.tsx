import React from 'react';
import { AnswerObject } from '../pages/Home';

type QuizProps = {
  question: string;
  score: number;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNumber: number;
  totalQuestions: number;
};

const Quiz = ({
  question,
  score,
  answers,
  callback,
  userAnswer,
  questionNumber,
  totalQuestions,
}: QuizProps) => {
  return (
    <div className="flex flex-col h-full w-full pt-5 ">
      <p className="absolute top-0 left-0 p-2">
        Score: <span className="text-green-400 font-bold">{score}</span>
      </p>
      <span className="absolute top-0 right-0 p-2">
        Question: {questionNumber} / {totalQuestions}
      </span>
      <h1 className="text-2xl py-5 font-bold" dangerouslySetInnerHTML={{ __html: question }}></h1>

      {answers.map((answers) => (
        <div className="flex w-full h-20 justify-center p-2" key={answers}>
          <button
            className={`border rounded-lg p-2 w-1/2 border-gray-300 bg-gray-200 hover:border-blue-300 hover:bg-blue-100 ${
              userAnswer?.correctAnswer === answers && 'bg-green-500 hover:bg-green-400'
            }`}
            disabled={!!userAnswer}
            value={answers}
            onClick={callback}>
            <span dangerouslySetInnerHTML={{ __html: answers }}></span>
          </button>
        </div>
      ))}
    </div>
  );
};

export default Quiz;
