const EndGame = ({ score }: { score: number }): JSX.Element => {
  const Image = ({ src }: { src: string }) => {
    return (
      <div>
        <img src={require(`../img/${src}`)} alt="gif" />
      </div>
    );
  };

  const handleEndMessage = () => {
    if (score === 10) {
      return <Image src={'predator-arnold.gif'} />;
    } else if (score >= 4) {
      return <Image src={'steve-carell-the-office.gif'} />;
    } else if (score <= 3) {
      return <Image src={'steve-carell-the-office.gif'} />;
    }
  };
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      {handleEndMessage()}
      <span className="text-3xl">
        Your Total score is <span className="text-green-500">{score}</span>
      </span>
    </div>
  );
};

export default EndGame;
