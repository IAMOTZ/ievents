import React from 'react';
import Dropzone from 'react-dropzone';

const ImageInput = (props) => {
  let component;
  if (props.newImage) {
    component = (
      <CustomDropZone
        style={props.style}
        onDrop={props.onDrop}
      ><a href={props.newImage.preview} target="blank">{props.newImage.name}</a>
      </CustomDropZone>
    );
  } else if (props.previousImage) {
    component = (
      <CustomDropZone
        style={props.style}
        onDrop={props.onDrop}
      ><p>Drop a new image or click to select a new image to upload[.jpeg only]</p>
      </CustomDropZone>
    );
  } else {
    component = (
      <CustomDropZone
        style={props.style}
        onDrop={props.onDrop}
      ><p>Drop an image or click to select an image to upload[.jpeg only]</p>
      </CustomDropZone>
    );
  }
  return component;
};

/**
 * Adds extra styles to Dropzone element.
 * @param {Object} extraStyles The extra styles to add to Dropzone.
 */
const style = (extraStyles) => {
  const defaultStyles = {
    width: '200px',
    height: '200px',
    borderWidth: '2px',
    borderColor: 'rgb(102, 102, 102)',
    borderStyle: 'dashed',
    borderRadius: '5px',
  };
  let customStyle;
  if (extraStyles) {
    customStyle = Object.assign(defaultStyles, extraStyles);
  } else {
    customStyle = defaultStyles;
  }
  return customStyle;
};

const CustomDropZone = props => (
  <Dropzone
    style={style(props.style)}
    multiple={false}
    accept="image/jpeg"
    onDrop={props.onDrop} 
  >
    {props.children}
  </Dropzone>
);

export default ImageInput;
