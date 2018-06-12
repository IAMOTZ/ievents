import React from 'react';
import ImageInput from '../../../components/common/ImageInput';

const props = {
  newImage: null,
  onDrop: jest.fn(),
  previousImage: null,
};

const alterProps = newProps => ({ ...props, ...newProps });

describe('<ImageInput />', () => {
  describe('Rendering:', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<ImageInput {...props} />);
    });
    it('should render correctly when there is no image', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('should render correctly when there is a previous image', () => {
      wrapper.setProps(alterProps({ previousImage: 'https://linkToPreviousImage' }));
      expect(wrapper).toMatchSnapshot();
    });
    it('should render correctly when there is a new image', () => {
      wrapper.setProps(alterProps({ newImage: 'https://linkToNewImage' }));
      expect(wrapper).toMatchSnapshot();
    });
  });
});
