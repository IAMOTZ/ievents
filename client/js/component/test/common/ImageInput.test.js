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
    const expectedLink = <a href={newImage.preview} target="blank">{newImage.name}</a>;
    wrapper.setProps(alterProps({ newImage }));
    expect(wrapper.contains(expectedLink)).toBeTruthy();
  });
  it('should render text for adding a new image if there was a previous image', () => {
    const previousImage = {
      name: 'Test',
      preview: 'http://jsutATestImage.png',
    };
    const expectedText = <p>Drop a new image or click to select a new image to upload[.jpeg only]</p>;
    wrapper.setProps(alterProps({ previousImage }));
    expect(wrapper.contains(expectedText)).toBeTruthy();
  });
  it('should render text for adding an image if there was neither previous or new image', () => {
    const expectedText = <p>Drop an image or click to select an image to upload[.jpeg only]</p>;
    expect(wrapper.contains(expectedText)).toBeTruthy();
  });
});
