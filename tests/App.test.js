import React from 'react';

import { shallow } from 'enzyme';

import App from '../src/components/App/App';

it('renders without crashing', () => {
  const app = shallow(<App />);
  expect(app.node).toMatchSnapshot();
});
