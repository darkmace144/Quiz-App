import { createContext } from 'react';
import { GameState } from '../enums/GameState';

type GameStateContextType = {
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
