// test render links
import { render, screen } from '@testing-library/react';
import React from 'react';
import Home from '../pages/Home';

describe('App tests', () => {
  it('should contains the heading 1', () => {
    render(<Home />);
    const heading = screen.getByText(/Quiz App/i);
    expect(heading).toBeInTheDocument();
  });
});
