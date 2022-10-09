import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Quiz } from './';

test('render quiz', () => {
  const onClick = jest.fn();
  render(<Quiz />);
  const divElement = screen.getByText('Question: 0 / 0');
  expect(divElement).toBeInTheDocument();
});

test('should render answers', async () => {
  const onClick = jest.fn();
  render(<Quiz />);
  const answersItems = await screen.findByTestId('answers-0');
  expect(answersItems).toBeInTheDocument();
});
