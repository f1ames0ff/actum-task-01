import React from 'react';
import { act } from '@testing-library/react';
import App from '../App';
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ReactDOM from "react-dom";

let container: Element;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);

  configure({ adapter: new Adapter() });
});

test('AppSearch render test', () => {
  const component = <App/>;

  act(() => {
    ReactDOM.render(component, container);
  });

  const header = container.querySelector('nav.navbar');
  expect(header).toBeDefined();
  expect(header).toHaveTextContent('ACTUM task 01');

  const processedComp = shallow(component);
  expect(processedComp).toMatchSnapshot();
});
