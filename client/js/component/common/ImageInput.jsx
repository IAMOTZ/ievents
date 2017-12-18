import React from 'react';
import Dropzone from 'react-dropzone';

const ImageInput = (props) => {
  if (props.newImage) {
    // Note that the new image is an image file
    return (
      <Dropzone
        multiple={false}
        accept="image/jpeg"
        onDrop={props.onDrop}>
        <a href={props.newImage.preview} target="blank">{props.newImage.name}</a>
      </Dropzone>
    )
  } else if (props.previousImage) {
    // Note that the previous image is a url 
    // [later] The previous image should also be displayed.
    return (
      <Dropzone
        multiple={false}
        accept="image/jpeg"
        onDrop={props.onDrop}>
        <div>
          <p>Drop a new image or click to select a new image to upload[.jpeg only] </p>
        </div>
      </Dropzone>
    );
  } else {
    return (
      <Dropzone
        multiple={false}
        accept="image/jpeg"
        onDrop={props.onDrop}>
        <p>Drop an image or click to select an image to upload[.jpeg only]</p>
      </Dropzone>
    );
  }
};

export default ImageInput;
