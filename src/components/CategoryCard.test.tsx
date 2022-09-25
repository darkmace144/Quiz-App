import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CategoryCard } from './';

test('renders category card', () => {
  const onClick = jest.fn();
  render(<CategoryCard categoryError="Please Select Category" handleOnClick={onClick} />);
  const placeholder = screen.getByPlaceholderText('Select an category');
  expect(placeholder).toBeInTheDocument();
});

test('should render categories items', async () => {
  const onClick = jest.fn();
  render(<CategoryCard categoryError="Please Select Category" handleOnClick={onClick} />);
  const categoriesItems = await screen.findByTestId('category-0');
  expect(categoriesItems).toBeInTheDocument();
});
