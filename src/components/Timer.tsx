import React, { useContext, useEffect } from 'react';
import { GameState } from '../enums/GameState';
import { GameStateContext } from '../helpers/Contexts';

const Timer = () => {
  const { setGameState, timer, setTimer } = useContext(GameStateContext);

  useEffect(() => {
    if (timer === 0) return setGameState(GameState.EndGame);
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer, setTimer, setGameState]);

  return (
    <div className="flex rounded-full bg-white h-40 w-40 justify-center items-center">
      <div className="flex justify-center bg-blue-900 rounded-full items-center h-32 w-32 text-4xl text-white">
        {timer}
      </div>
    </div>
  );
};

export default Timer;
