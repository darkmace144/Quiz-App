import React, { useContext, useState } from 'react';
import { AiOutlinePlayCircle } from 'react-icons/ai';
import { GameState } from '../enums/GameState';
import { GameStateContext } from '../helpers/Contexts';
import CategoryCard from './CategoryCard';

const Menu = () => {
  const { nameState, setGameState, setNameState, categoryState, setCategoryState } =
    useContext(GameStateContext);
  const [nameError, setNameError] = useState<string>('');
  const [categoryError, setCategoryError] = useState<string>('');

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    setNameState(name);
  };

  const handleStartGame = () => {
    if (nameState.length === 0) setNameError('Please Enter Name');
    else if (categoryState.length === 0) setCategoryError('Please Select Category');
    else {
      setGameState(GameState.Quiz);
      setNameError('');
      setCategoryError('');
    }
  };
  const handleCategoryOnClick = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryState(e.currentTarget.value);
  };

  return (
    <div className="flex flex-col w-full h-full justify-between items-center pt-10">
      <div className="flex flex-col w-1/2">
        <span>Enter Name:</span>
        <input
          className="border-2 text-black border-gray-200 focus:border-transparent focus:ring-0 rounded-lg p-1"
          type="text"
          value={nameState}
          name="name"
          onChange={handleName}
        />
        <div className="flex w-full  justify-between">
          <span className="text-red-500 text-sm">{nameError}</span>
        </div>
      </div>

      <CategoryCard handleOnClick={handleCategoryOnClick} categoryError={categoryError} />

      <button
        className="flex flex-row w-full items-center justify-center space-x-1"
        onClick={handleStartGame}>
        <span className="text-md">Play Game </span>
        <AiOutlinePlayCircle size={25} />
      </button>
    </div>
  );
};
export default Menu;
