import React from 'react';
import Header from '../../common/Header.jsx';


describe('<Header />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Header text="Testing Header"/>);
    expect(wrapper).toMatchSnapshot();
  });
});
