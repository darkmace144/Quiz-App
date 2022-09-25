import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './Home';

describe('when rendered with a `name` prop', () => {
  it('should paste it into the greetings text', () => {
    render(<Home />);
    expect(screen.getByText(/Quiz App/)).toBeInTheDocument();
  });
});

// test input field is setting state
