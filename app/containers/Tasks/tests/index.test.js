import React from 'react';
import { shallow } from 'enzyme';

import Tasks from '../index';

describe('<Tasks />', () => {
  it('should render without crashing', () => {
    const renderedComponent = shallow(<Tasks />);
    expect(renderedComponent.exists()).toBe(true);
  });
});
