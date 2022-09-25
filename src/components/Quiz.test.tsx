import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Quiz } from './';

test('render quiz', () => {
  const onClick = jest.fn();
  render(
    <Quiz
      question={''}
      score={0}
      answers={[]}
      callback={onClick}
      userAnswer={undefined}
      questionNumber={0}
      totalQuestions={0}
    />,
  );
  const divElement = screen.getByText('Question: 0 / 0');
  expect(divElement).toBeInTheDocument();
});

test('should render answers', async () => {
  const onClick = jest.fn();
  render(
    <Quiz
      question={''}
      score={0}
      answers={['answer1', 'answer2', 'answer3', 'answer4']}
      callback={onClick}
      userAnswer={undefined}
      questionNumber={0}
      totalQuestions={0}
    />,
  );
  const answersItems = await screen.findByTestId('answers-0');
  expect(answersItems).toBeInTheDocument();
});
