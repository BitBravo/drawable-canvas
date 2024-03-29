import React from 'react';
import { shallow } from 'enzyme';

import Login from '../index';

describe('<Login />', () => {
  it('should render its heading', () => {
    const renderedComponent = shallow(<Login />);
    expect(renderedComponent.contains(<h1>Login</h1>)).toBe(true);
  });

  it('should never re-render the component', () => {
    const renderedComponent = shallow(<Login />);
    const inst = renderedComponent.instance();
    expect(inst.shouldComponentUpdate()).toBe(false);
  });
});
