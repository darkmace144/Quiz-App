import React, { useState } from 'react';
import { Quiz, EndGame } from '../components';
import { GameState } from '../enums/GameState';
import { GameStateContext } from '../helpers/Contexts';
import { QuestionState } from '../enums/QuestionTypes';
import Timer from '../components/Timer';
import Menu from '../components/Menu';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const HomePage = () => {
  const [gameState, setGameState] = useState(GameState.Menu);
  const [nameState, setNameState] = useState('');
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(1);
  const [timer, setTimer] = useState(30);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);

  const TOTAL_QUESTIONS = 10;

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    const answer = e.currentTarget.value;
    const correct = questions[number].correctAnswer === answer;
    if (correct) {
      setScore((prev) => prev + 1);
    }

    const answerObject = {
      question: questions[number].question,
      answer,
      correct,
      correctAnswer: questions[number].correctAnswer,
    };
    setUserAnswers((prev) => [...prev, answerObject]);
  };

  const nextQuestion = () => {
    const nextQuestion = number + 1;
    if (number === TOTAL_QUESTIONS - 1) {
      setGameState(GameState.EndGame);
    } else {
      setNumber(nextQuestion);
      setTimer(30);
    }
  };

  const handleRestart = () => {
    setGameState(GameState.Menu);
    setNameState('');
    setTimer(30);
  };
  return (
    <div
      role="contentinfo"
      className="flex flex-col justify-center items-center space-y-4 w-full text-2xl h-screen bg-blue-900">
      <GameStateContext.Provider value={{ gameState, setGameState, nameState, setNameState }}>
        {gameState === GameState.Quiz && (
          <Timer timer={timer} setTimer={setTimer} setGameState={setGameState} />
        )}
        <div className="flex flex-col bg-gray-100 w-1/2 h-[35rem] p-4 rounded-xl shadow-lg animate-wiggle relative">
          <div className="flex flex-col w-full h-full text-center items-center">
            <h1 className="font-semibold text-3xl">Quiz App</h1>
            {gameState === GameState.Menu && (
              <Menu
                nameState={nameState}
                setLoading={setLoading}
                setGameState={setGameState}
                setNameState={setNameState}
                setQuestions={setQuestions}
                setScore={setScore}
                setUserAnswers={setUserAnswers}
                setNumber={setNumber}
              />
            )}
            {gameState === GameState.Quiz && (
              <>
                {loading ? (
                  <p>loading question: </p>
                ) : (
                  <Quiz
                    score={score}
                    question={questions[number].question}
                    totalQuestions={TOTAL_QUESTIONS}
                    questionNumber={number + 1}
                    callback={checkAnswer}
                    userAnswer={userAnswers ? userAnswers[number] : undefined}
                    answers={questions[number].answers}
                  />
                )}
                <div className="flex flex-row justify-between text-sm items-center w-full bg-white absolute bottom-0 left-0 p-4 border-t border-blue-400 rounded-b-lg">
                  <span>{nameState}</span>
                  {userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS ? (
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
              </>
            )}
            {gameState === GameState.EndGame && <EndGame score={score} />}
          </div>
        </div>
      </GameStateContext.Provider>
    </div>
  );
};

export default HomePage;
