/* global shallow */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ImageInput from '../../common/ImageInput.jsx';

const props = {
  previousImage: null,
  newImage: null,
  style: {},
  onDrop() {},
};

const alterProps = newProps => ({ ...props, ...newProps });

describe('<ImageInput />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ImageInput />);
  });
  it('should render a link if there is a new image', () => {
    const newImage = {
      name: 'Test',
      preview: 'http://jsutATestImage.png',
    };
    wrapper.setProps(alterProps({ newImage }));
    expect(wrapper).toMatchSnapshot();
  });
  it('should render text for adding a new image if there was a previous image', () => {
    const previousImage = {
      name: 'Test',
      preview: 'http://jsutATestImage.png',
    };
    wrapper.setProps(alterProps({ previousImage }));
    expect(wrapper).toMatchSnapshot();
  });
  it('should render text for adding an image if there was neither previous or new image', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
