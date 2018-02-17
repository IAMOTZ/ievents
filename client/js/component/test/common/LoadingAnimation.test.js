/* global shallow */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { LoadingIcon, LoadingContainer } from '../../common/LoadingAnimation.jsx';

describe('<LoadingIcon />', () => {
  it('should render nothing if start prop is not given', () => {
    const wrapper = shallow(<LoadingIcon />);
    expect(wrapper.html()).toBeNull();
  });
  it('should render a LoadingIcon of size 4', () => {
    const wrapper = shallow(<LoadingIcon start size={4} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('<LoadingContainer />', () => {
  it('should render the LoadingContainer with icon size of 3', () => {
    const wrapper = shallow(<LoadingContainer iconSize={3} />);
    expect(wrapper).toMatchSnapshot();
  });
});
