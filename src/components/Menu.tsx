import React, { useState } from 'react';
import { AiOutlinePlayCircle } from 'react-icons/ai';
import { fetchQuestions } from '../api/getQuestions';
import { GameState } from '../enums/GameState';
import { QuestionState } from '../enums/QuestionTypes';
import { AnswerObject } from '../pages/Home';
import CategoryCard from './CategoryCard';

type MenuProps = {
  nameState: string;
  setNameState: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  setQuestions: React.Dispatch<React.SetStateAction<QuestionState[]>>;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setUserAnswers: React.Dispatch<React.SetStateAction<AnswerObject[]>>;
  setNumber: React.Dispatch<React.SetStateAction<number>>;
};

const Menu = (props: MenuProps) => {
  const {
    nameState,
    setNameState,
    setGameState,
    setLoading,
    setQuestions,
    setScore,
    setUserAnswers,
    setNumber,
  } = props;
  const [nameError, setNameError] = useState<string>('');
  const [categoryError, setCategoryError] = useState<string>('');
  const [categoryState, setCategoryState] = useState<string>('');

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    setNameState(name);
  };

  const handleStartGame = async () => {
    if (nameState.length === 0) setNameError('Please Enter Name');
    else if (categoryState.length === 0) setCategoryError('Please Select Category');
    else {
      setGameState(GameState.Quiz);
      try {
        setLoading(true);
        setQuestions(await fetchQuestions(categoryState));
        setScore(0);
        setUserAnswers([]);
        setNumber(0);
        setLoading(false);
        setNameError('');
        setCategoryError('');
      } catch (error) {
        console.error(error);
      }
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
