import React from 'react';
import { render, screen } from '@testing-library/react';
import AppSearch from "./AppSearch";


test('renders learn react link', () => {
  render(<AppSearch />);

  const linkElement = screen.getByText(/learn react/i);

  expect(linkElement).toBeInTheDocument();
});
