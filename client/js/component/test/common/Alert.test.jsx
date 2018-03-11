/* global shallow */
import React from 'react';
import { BigAlert, SmallAlert } from '../../common/Alert';

const props = {
  message: null,
  type: null,
};

const alterProps = newProps => ({
  ...props, ...newProps,
});

describe('<SmallAlert />', () => {
  it('should render nothing when there is no message', () => {
    const wrapper = shallow(<SmallAlert {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render correctly when there is message', () => {
    const wrapper = shallow(<SmallAlert {...alterProps({ message: 'Just an error' })} />);
    expect(wrapper).toMatchSnapshot();
  });
});
describe('<BigAlert />', () => {
  it('should render nothing when there is no message', () => {
    const wrapper = shallow(<BigAlert {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render correctly when there is message', () => {
    const wrapper = shallow(<BigAlert {...alterProps({ message: 'Just an error' })} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render a succes alert when type is set to success', () => {
    const wrapper = shallow(<BigAlert {...alterProps({ message: 'I am success', type: 'success' })} />);
    expect(wrapper).toMatchSnapshot();
  });
});
