import React from 'react';
import { act } from '@testing-library/react';
import AppSearch from "../components/AppSearch";
import ReactDOM from "react-dom";
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

let container: Element;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);

  configure({ adapter: new Adapter() });
});

it("AppSearch test", () => {
  const component = <AppSearch/>;

  act(() => {
    ReactDOM.render(component, container);
  });

  const button = container.querySelector('button#searchButton');

  expect(button).toBeDefined();
  expect(button).toHaveTextContent('Search');

  const behaviorInput = container.querySelector('input#behaviorInput');
  expect(behaviorInput).toBeDefined();

  const disableBehaviorInput = container.querySelector('input#disableBehaviorInput');
  expect(disableBehaviorInput).toBeDefined();

  const processedComp = shallow(component);
  expect(processedComp).toMatchSnapshot();
});
