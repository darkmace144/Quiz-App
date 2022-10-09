import React, { useContext, useEffect, useState } from 'react';
import { GameState } from '../enums/GameState';
import { QuestionState } from '../enums/QuestionTypes';
import { AnswerObject } from '../pages/Home';
import { fetchQuestions } from '../api/getQuestions';
import { GameStateContext } from '../helpers/Contexts';

const Quiz = () => {
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [numberQuestions, setNumberQuestions] = useState(1);
  const [loading, setLoading] = useState(false);
  const { nameState, setGameState, setNameState, setScore, score, setTimer, categoryState } =
    useContext(GameStateContext);

  const TOTAL_QUESTIONS = 10;
  const userAnswer = userAnswers ? userAnswers[numberQuestions] : undefined;
  const question = questions[numberQuestions]?.question;
  const answers = questions[numberQuestions]?.answers;

  const handleRestart = () => {
    setGameState(GameState.Menu);
    setNameState('');
    setTimer(30);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    const answer = e.currentTarget.value;
    const correct = questions[numberQuestions].correctAnswer === answer;
    if (correct) {
      setScore((prev) => prev + 1);
    }

    const answerObject = {
      question: questions[numberQuestions].question,
      answer,
      correct,
      correctAnswer: questions[numberQuestions].correctAnswer,
    };
    setUserAnswers((prev) => [...prev, answerObject]);
  };

  const nextQuestion = () => {
    const nextQuestion = numberQuestions + 1;
    if (numberQuestions === TOTAL_QUESTIONS - 1) {
      setGameState(GameState.EndGame);
    } else {
      setNumberQuestions(nextQuestion);
      setTimer(30);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setNumberQuestions(0);
      setUserAnswers([]);
      setScore(0);
      setQuestions(await fetchQuestions(categoryState));
    };
    setLoading(false);
    fetchData();
  }, []);

  return (
    <div className="flex flex-col h-full w-full pt-5 ">
      <p className="absolute top-0 left-0 p-2">
        Score: <span className="text-green-400 font-bold">{score}</span>
      </p>
      <span className="absolute top-0 right-0 p-2">
        Question: {numberQuestions + 1} / {TOTAL_QUESTIONS}
      </span>
      <h1 className="text-2xl py-5 font-bold">{question}</h1>

      {answers?.map((answers, index) => (
        <div
          data-testid={`answers-${index}`}
          className="flex w-full h-20 justify-center p-2"
          key={index}>
          <button
            className={`border rounded-lg p-2 w-1/2 border-gray-300 bg-gray-200 hover:border-blue-300 hover:bg-blue-100 ${
              userAnswer?.correctAnswer === answers && 'bg-green-500 hover:bg-green-400'
            }`}
            disabled={!!userAnswer}
            value={answers}
            onClick={checkAnswer}>
            <span>{answers}</span>
          </button>
        </div>
      ))}
      <div className="flex flex-row justify-between text-sm items-center w-full bg-white absolute bottom-0 left-0 p-4 border-t border-blue-400 rounded-b-lg">
        <span>{nameState}</span>
        {userAnswers.length === numberQuestions + 1 && numberQuestions !== TOTAL_QUESTIONS ? (
          <button
            className="border text-xl border-blue-300 w-1/3 p-1 rounded-lg hover:bg-blue-300 hover:text-white duration-300 ease-in-out"
            onClick={nextQuestion}>
            Next question
          </button>
        ) : null}
        <button onClick={handleRestart} className="text-right">
          Restart the game
        </button>
      </div>
    </div>
  );
};

export default Quiz;
