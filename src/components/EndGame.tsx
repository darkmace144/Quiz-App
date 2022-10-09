import { GameStateContext } from '../helpers/Contexts';
import React, { useContext } from 'react';

const EndGame = (): JSX.Element => {
  const { score } = useContext(GameStateContext);

  const Image = ({ src }: { src: string }) => {
    return <img className="rounded pb-5" src={require(`../img/${src}`)} alt="gif" />;
  };

  const handleStartOver = () => {
    window.location.reload();
  };

  const handleEndMessage = () => {
    if (score === 10) {
      return <Image src={'predator-arnold.gif'} />;
    } else if (score >= 4) {
      return <Image src={'steve-carell-the-office.gif'} />;
    } else if (score <= 3) {
      return <Image src={'woah.gif'} />;
    }
  };
  return (
    <div className="flex flex-col justify-center items-center w-full h-full space-y-4">
      <span className="text-3xl ">
        Your Total score is <span className="text-green-500 font-bold">{score}</span>
      </span>
      {handleEndMessage()}
      <button
        onClick={handleStartOver}
        className="border border-blue-500 hover:bg-blue-500 hover:text-white duration-300 w-1/2 rounded-lg">
        Restart Game
      </button>
    </div>
  );
};

export default EndGame;
