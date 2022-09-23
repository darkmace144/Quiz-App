import React, { useEffect } from 'react';
import { GameState } from '../enums/GameState';

type Props = {
  timer: number;
  setTimer: React.Dispatch<React.SetStateAction<number>>;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
};

const Timer = ({ timer, setTimer, setGameState }: Props) => {
  useEffect(() => {
    if (timer === 0) return setGameState(GameState.EndGame);
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer, setTimer, setGameState]);

  return (
    <div className="flex rounded-full bg-white h-40 w-40 justify-center items-center ">
      <div className="flex justify-center bg-blue-900 rounded-full items-center h-32 w-32 text-4xl text-white">
        {timer}
      </div>
    </div>
  );
};

export default Timer;
