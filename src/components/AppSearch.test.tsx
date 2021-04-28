import React from 'react';
import { act, render } from '@testing-library/react';
import AppSearch from "./AppSearch";

let container: Element;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

it("AppSearch render test", () => {
  act(() => {
    render(<AppSearch/>, { container });
  });

  const input = container.querySelector('.autocomplete-input-wrapper>div>span>input');

  expect(input).toBeDefined();

  const button = container.querySelector('.autocomplete-input-wrapper>div>button');

  expect(button).toBeDefined();
  expect(button).toHaveTextContent('Search');
});
