import { createContext, useContext } from 'react';
import { GameState } from '../enums/GameState';

export type GameStateContextType = {
  gameState: GameState;
  setGameState: (GameState: GameState) => void;
  nameState: string;
  setNameState: (nameState: string) => void;
};

export const GameStateContext = createContext<GameStateContextType>({
  gameState: GameState.Menu,
  setGameState: () => console.warn('no game state provider selected'),
  nameState: 'Player',
  setNameState: () => console.warn('no player selected'),
});

export const useQuiz = () => useContext(GameStateContext);
