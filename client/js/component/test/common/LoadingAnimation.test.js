import React from 'react';
import renderer from 'react-test-renderer';
import { LoadingIcon, LoadingContainer } from '../../common/LoadingAnimation.jsx';

describe('<LoadingIcon />', () => {
  it('should render nothing if start prop is not given', () => {
    const wrapper = shallow(<LoadingIcon />);
    expect(wrapper.html()).toBeNull();
  });
  it('should render a LoadingIcon of size 4', () => {
    const tree = renderer.create(<LoadingIcon start size={4} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('<LoadingContainer />', () => {
  it('should render the LoadingContainer with icon size of 3', () => {
    const tree = renderer.create(<LoadingContainer iconSize={3} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
