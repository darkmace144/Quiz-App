import { createContext, Dispatch, SetStateAction } from 'react';
import { GameState } from '../enums/GameState';

type GameStateContextType = {
  gameState: GameState;
  setGameState: (GameState: GameState) => void;
  nameState: string;
  setNameState: (nameState: string) => void;
  score: number;
  setScore: Dispatch<SetStateAction<number>>;
  timer: number;
  setTimer: Dispatch<SetStateAction<number>>;
  categoryState: string;
  setCategoryState: (category: string) => void;
};

export const GameStateContext = createContext<GameStateContextType>({
  gameState: GameState.Menu,
  setGameState: () => console.warn('no game state provider selected'),
  nameState: 'Player',
  setNameState: () => console.warn('no player selected'),
  score: 0,
  setScore: () => console.warn('no score selected'),
  timer: 30,
  setTimer: () => console.warn('no timer selected'),
  categoryState: '',
  setCategoryState: () => console.warn('no category selected'),
});
