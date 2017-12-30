import React from 'react';
import Dropzone from 'react-dropzone';

const ImageInput = (props) => {
  if (props.newImage) {
    // Note that the new image is an image file
    return (
      <Dropzone
        style={style(props.style)}
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
        style={style(props.style)}
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
        style={style(props.style)}
        multiple={false}
        accept="image/jpeg"
        onDrop={props.onDrop}>
        <p>Drop an image or click to select an image to upload[.jpeg only]</p>
      </Dropzone>
    );
  }
};

const style = (extraStyles) => {
  const defaultStyles = {
    width: '200px',
    height: '200px',
    borderWidth: '2px',
    borderColor: 'rgb(102, 102, 102)',
    borderStyle: 'dashed',
    borderRadius: '5px',
  }; 
  if(extraStyles) {
    return Object.assign(defaultStyles, extraStyles) 
  } else {
    return defaultStyles;
  }
}

export default ImageInput;
