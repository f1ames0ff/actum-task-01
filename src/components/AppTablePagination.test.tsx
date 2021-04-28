import React from 'react';
import { act, render, screen } from '@testing-library/react';
import AppSearch from "./AppSearch";
import AppTable from "./AppTable";

let container: Element;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

it("AppTablePagination render test", () => {
  act(() => {
    render(<AppTable/>, { container });
  });

  const linkElement = screen.getByText(/No results/i);

  expect(linkElement).toBeInTheDocument();
});
