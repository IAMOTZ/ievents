import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ImageInput from '../../common/ImageInput';
import { LoadingIcon } from '../../common/LoadingAnimation';
import { BigAlert, SmallAlert } from '../../common/Alert';

// This component is reused in AddCenter and EditCenter container
const CenterForm = (props) => {
  const centerToUpdate = { ...props.centerToUpdate };
  return (
    <form className="mt-lg-5 mb-md-5">
      <LoadingIcon
        start={props.updating ?
          props.updatingCenterStarted : props.addingCenterStarted}
        size={3}
      />
      <div className="w-lg-50 mx-auto">
        <BigAlert
          message={props.updating ?
            props.addingCenterError : props.updatingCenterError}
        />
      </div>
      <div className="form-inputs">
        <div className="text-inputs mr-lg-5">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder="The name of the center"
              defaultValue={centerToUpdate.name}
              onChange={props.getInput}
              autoComplete="off"
            />
            <small className="form-text text-muted">Between 2 and 30 characters</small>
            <SmallAlert message={props.inputErrors.nameError} />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              className="form-control"
              id="location"
              name="location"
              placeholder="The location of the center"
              defaultValue={centerToUpdate.location}
              onChange={props.getInput}
            />
            <small className="form-text text-muted">Less than 50 characters</small>
            <SmallAlert message={props.inputErrors.locationError} />
          </div>
          <div className="form-group">
            <label htmlFor="capacity">Capacity</label>
            <input
              type="number"
              pattern="\d*"
              className="form-control"
              id="capacity"
              name="capacity"
              placeholder="How many seats"
              defaultValue={centerToUpdate.capacity}
              onChange={props.getInput}
            />
            <SmallAlert message={props.inputErrors.capacityError} />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              className="form-control"
              id="price"
              name="price"
              placeholder="Price"
              defaultValue={centerToUpdate.price}
              onChange={props.getInput}
            />
            <SmallAlert message={props.inputErrors.priceError} />
          </div>
          <div className="form-group">
            <label htmlFor="details">Details</label>
            <textarea
              className="form-control"
              id="details"
              rows="7"
              name="details"
              placeholder="More details about the center"
              defaultValue={centerToUpdate.details}
              onChange={props.getInput}
            />
            <small className="form-text text-muted">Less than 300 characters</small>
            <SmallAlert message={props.inputErrors.detailsError} />
          </div>
        </div>
        <div className="image-input">
          <div className="form-group">
            <label htmlFor="image">Image(click to upload new)</label>
            <ImageInput
              id="image"
              onDrop={props.handleImageDrop}
              newImage={props.newImageLink}
              previousImage={
                centerToUpdate.images ? centerToUpdate.images[0] : null
              }
            />
            <div className="mt-5">
              <button
                id="add-btn"
                className="btn ie-blue-button"
                disabled={props.updating ?
                  props.updatingCenterStarted : props.addingCenterStarted}
                onClick={props.updating ? props.update : props.add}
              >{props.updating ? 'Update Center' : 'Add Center'}
              </button>
              <Link
                className={`btn ie-dark-button ml-3 ${
                  props.updatingCenterStarted || props.addingCenterStarted ? 'd-none' : ''
                  }`}
                to="/centers"
              > Cancel
              </Link>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

CenterForm.defaultProps = {
  addingCenterStarted: false,
  addingCenterError: '',
  updatingCenterStarted: false,
  updatingCenterError: '',
  inputErrors: {},
  newImageLink: null,
  centerToUpdate: {},
  add: undefined,
  update: undefined,
  updating: false,
};

/* eslint-disable react/forbid-prop-types */
CenterForm.propTypes = {
  addingCenterStarted: PropTypes.bool,
  addingCenterError: PropTypes.string,
  updatingCenterStarted: PropTypes.bool,
  updatingCenterError: PropTypes.string,
  getInput: PropTypes.func.isRequired,
  inputErrors: PropTypes.object,
  newImageLink: PropTypes.string,
  handleImageDrop: PropTypes.func.isRequired,
  centerToUpdate: PropTypes.object,
  add: PropTypes.func,
  update: PropTypes.func,
  updating: PropTypes.bool,
};

export default CenterForm;
