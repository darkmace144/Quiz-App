import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './Home';

describe('renders page', () => {
  it('should have text on the page', () => {
    render(<Home />);
    expect(screen.getByText(/Quiz App/)).toBeInTheDocument();
  });
});
