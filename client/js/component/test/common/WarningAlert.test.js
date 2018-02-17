/* global shallow */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import WarningAlert from '../../common/WarningAlert.jsx';

describe('<WarningAlert />', () => {
  it('should render nothing if no message was passed in', () => {
    const wrapper = shallow(<WarningAlert />);
    expect(wrapper.html()).toBeNull();
  });
  it('should render the component if a message was passed in', () => {
    const wrapper = shallow(<WarningAlert message="Testing WarningAlert" />);
    expect(wrapper).toMatchSnapshot();
  });
});
