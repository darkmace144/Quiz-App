import React, { useState } from 'react';
import { Quiz, EndGame } from '../components';
import { GameState } from '../enums/GameState';
import { GameStateContext } from '../helpers/Contexts';
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
  const [timer, setTimer] = useState(30);
  const [score, setScore] = useState(0);
  const [categoryState, setCategoryState] = useState<string>('');

  return (
    <div
      role="contentinfo"
      className="flex flex-col justify-center items-center space-y-4 w-full text-2xl h-screen bg-blue-900">
      <GameStateContext.Provider
        value={{
          gameState,
          setGameState,
          nameState,
          setNameState,
          score,
          setScore,
          timer,
          setTimer,
          categoryState,
          setCategoryState,
        }}>
        {gameState === GameState.Quiz && <Timer />}
        <div className="flex flex-col bg-gray-100 w-1/2 h-[35rem] p-4 rounded-xl shadow-lg animate-wiggle relative">
          <div className="flex flex-col w-full h-full text-center items-center">
            <h1 className="font-semibold text-3xl">Quiz App</h1>
            {gameState === GameState.Menu && <Menu />}
            {gameState === GameState.Quiz && <Quiz />}
            {gameState === GameState.EndGame && <EndGame />}
          </div>
        </div>
      </GameStateContext.Provider>
    </div>
  );
};

export default HomePage;
