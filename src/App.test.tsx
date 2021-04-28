import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('AppSearch render test', () => {
  render(<App />);

  const linkElement = screen.getByText(/actum task 01/i);

  expect(linkElement).toBeInTheDocument();
});
