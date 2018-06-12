import React from 'react';
import { BigAlert, SmallAlert } from '../../../components/common/Alert';


const props = {
  type: null,
  message: null,
};

const alterProps = newProps => ({ ...props, ...newProps });

describe('<BigAlert />', () => {
  describe('Rendering', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<BigAlert {...props} />);
    });
    it('should render correctly when there is no message', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('should render correctly when there is a message', () => {
      wrapper.setProps(alterProps({ message: 'I am a test' }));
      expect(wrapper).toMatchSnapshot();
    });
    it('should render correctly when the type is success', () => {
      wrapper.setProps(alterProps({ message: 'I am a success test', type: 'success' }));
      expect(wrapper).toMatchSnapshot();
    });
  });
});

describe('<SmallAlert />', () => {
  describe('Rendering', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<SmallAlert {...props} />);
    });
    it('should render correctly when there is no message', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('should render correctly when there is a message', () => {
      wrapper.setProps(alterProps({ message: 'I am a test' }));
      expect(wrapper).toMatchSnapshot();
    });
  });
});
