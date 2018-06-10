import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import './styles.scss';

const defaultImage = '/images/defaultImgx4.jpeg';

const ImageInput = (props) => {
  const { newImage, previousImage } = props;
  let captionText;
  let imageSource;
  if (newImage) {
    imageSource = newImage;
    captionText = 'Click to select another image.';
  } else if (previousImage) {
    imageSource = previousImage;
    captionText = 'Click to select another image.';
  } else {
    imageSource = defaultImage;
    captionText = 'This is the default center image. Click to select another image.';
  }
  return (
    <Dropzone
      className="react-dropzone"
      multiple={false}
      accept=".jpg, .jpeg, .png"
      onDropAccepted={props.onDrop}
    >
      <div className="image-preview">
        <img src={imageSource} alt="" />
        <div className="image-preview-overlay">
          <span>{captionText}</span>
        </div>
      </div>
    </Dropzone>
  );
};

ImageInput.defaultProps = {
  newImage: null,
  previousImage: null,
};

ImageInput.propTypes = {
  onDrop: PropTypes.func.isRequired,
  newImage: PropTypes.string,
  previousImage: PropTypes.string,
};

export default ImageInput;
