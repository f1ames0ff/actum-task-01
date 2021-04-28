import React from 'react';
import { act, render } from '@testing-library/react';
import { configure, shallow } from "enzyme";
import AppTablePagination from "../components/AppTablePagination";
import Adapter from "enzyme-adapter-react-16";

let container: Element;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);

  configure({ adapter: new Adapter() });
});

it("AppTablePagination test", () => {
  const component = <AppTablePagination/>;

  act(() => {
    render(component, { container });
  });

  const processedComp = shallow(component);
  expect(processedComp).toMatchSnapshot();
});
