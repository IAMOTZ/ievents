import React from 'react';
import PropTypes from 'prop-types';
import ImageInput from '../../common/ImageInput';
import { LoadingIcon } from '../../common/LoadingAnimation';
import { BigAlert, SmallAlert } from '../../common/Alert';

const CenterForm = (props) => {
  const toUpdate = { ...props.toUpdate };
  return (
    <form className="mt-lg-5 mb-md-5">
      <LoadingIcon start={props.addingCenterStarted || props.updatingCenterStarted} size={3} />
      <div className="w-lg-50 mx-auto">
        <BigAlert message={props.addingCenterError || props.updatingCenterError} />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-6">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="The name of the center"
                defaultValue={toUpdate.name}
                onChange={props.getInput}
              />
              <small className="form-text text-muted">Between 2 and 30 characters</small>
              <SmallAlert message={props.inputErrors.nameError} />
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                className="form-control"
                id="location"
                name="location"
                placeholder="The location of the center"
                defaultValue={toUpdate.location}
                onChange={props.getInput}
              />
              <small className="form-text text-muted">Less than 50 characters</small>
              <SmallAlert message={props.inputErrors.locationError} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-lg-6">
            <div className="form-group">
              <label htmlFor="details">Details</label>
              <textarea
                className="form-control"
                id="details"
                rows="7"
                name="details"
                placeholder="More details about the center"
                defaultValue={toUpdate.details}
                onChange={props.getInput}
              />
              <small className="form-text text-muted">Less than 300 characters</small>
              <SmallAlert message={props.inputErrors.detailsError} />
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <label htmlFor="capacity">Capacity</label>
                  <input
                    type="number"
                    pattern="\d*"
                    className="form-control"
                    id="capacity"
                    name="capacity"
                    placeholder="How many seats"
                    defaultValue={toUpdate.capacity}
                    onChange={props.getInput}
                  />
                  <SmallAlert message={props.inputErrors.capacityError} />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <label htmlFor="price">Price</label>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    name="price"
                    placeholder="Price"
                    defaultValue={toUpdate.price}
                    onChange={props.getInput}
                  />
                  <SmallAlert message={props.inputErrors.priceError} />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <label htmlFor="image">Image</label>
                  <div className="text-center">
                    {/* <ImageInput
                      style={{ height: '100px' }}
                      id="image"
                      onDrop={props.handleImageDrop}
                      newImage={props.images ? props.images[0] : null}
                      previousImage={
                        toUpdate.images ? toUpdate.images[0] : null
                      }
                    /> */}
                  </div>
                </div>
              </div>
              <div className="ml-3 pt-3">
                <button
                  id="add-btn"
                  className="btn ie-blue-button"
                  disabled={props.addingCenterStarted || props.updatingCenterStarted}
                  onClick={props.add || props.update}
                >{toUpdate.name ? 'Update' : 'Add'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

CenterForm.defaultProps = {
  addingCenterStarted: undefined,
  addingCenterError: '',
  updatingCenterStarted: undefined,
  updatingCenterError: '',
  inputErrors: {},
  images: [],
  toUpdate: {},
  add: undefined,
  update: undefined,
};

/* eslint-disable react/forbid-prop-types */
CenterForm.propTypes = {
  addingCenterStarted: PropTypes.bool,
  addingCenterError: PropTypes.string,
  updatingCenterStarted: PropTypes.bool,
  updatingCenterError: PropTypes.string,
  getInput: PropTypes.func.isRequired,
  inputErrors: PropTypes.object,
  images: PropTypes.array,  
  handleImageDrop: PropTypes.func.isRequired,
  toUpdate: PropTypes.object,
  add: PropTypes.func,
  update: PropTypes.func,
};

export default CenterForm;
