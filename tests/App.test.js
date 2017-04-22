import React from 'react';
import App from '../src/App';

import { shallow } from 'enzyme';

it('renders without crashing', () => {
  const app = shallow(<App />)
  expect(app.node).toMatchSnapshot();
});
