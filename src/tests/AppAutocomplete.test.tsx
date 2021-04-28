import React from 'react';
import { act } from '@testing-library/react';
import AppAutocomplete from "../components/AppAutocomplete";
import ReactDOM from 'react-dom';
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AppSearch from "../components/AppSearch";

let container: Element;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);

  configure({ adapter: new Adapter() });
});

it("AppTablePagination test", () => {
  const component = <AppAutocomplete inputBehavior={false}
                                     behaviorActive={false}/>;

  act(() => {
    ReactDOM.render(component, container);
  });

  const input = container.querySelector('input#mainInput');

  expect(input).toBeDefined();
  expect(input).toHaveAttribute('placeholder', 'Search github users');

  const processedComp = shallow(component);
  expect(processedComp).toMatchSnapshot();
});
