import React from 'react';
import { LoadingBox, LoadingIcon } from '../../../components/common/LoadingAnimation';


describe('<LoadingIcon />', () => {
  const props = {
    start: null,
    size: null
  };
  const alterProps = newProps => ({ ...props, ...newProps });
  describe('Rendering:', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<LoadingIcon {...props} />);
    });
    it('should render correctly when size and start props is not given', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('should render correctly when size and start props is given', () => {
      wrapper.setProps(alterProps({ size: 2, start: true }));
      expect(wrapper).toMatchSnapshot();
    });
    it('should use the default size when the size props is not given', () => {
      wrapper.setProps(alterProps({ start: true }));
      expect(wrapper).toMatchSnapshot();
    });
  });
});


describe('<LoadingBox />', () => {
  const props = { iconSize: 2 };
  describe('Rendering:', () => {
    it('should render correctly', () => {
      const wrapper = shallow(<LoadingBox {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
