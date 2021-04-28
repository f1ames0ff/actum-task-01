import React from 'react';
import { act, render, screen } from '@testing-library/react';
import AppTable from "../components/AppTable";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

let container: Element;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);

  configure({ adapter: new Adapter() });
});

it("AppTable test", () => {
  const component = <AppTable/>;

  act(() => {
    render(component, { container });
  });

  const linkElement = screen.getByText(/No results/i);
  expect(linkElement).toBeInTheDocument();

  const processedComp = shallow(component);
  expect(processedComp).toMatchSnapshot();
});
