import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { find } from 'lodash';
import { validateUpdateCenterInputs } from '../../../helpers/inputValidators';
import { updateCenter } from '../../../actions/centerActions';
import { stopAsyncProcess } from '../../../actions/commonActions';
import * as asyncProcess from '../../../actions/asyncProcess';
import View from './View';


@connect((store) => {
  const { user } = store.authReducer;
  const { centers } = store.fetchCentersReducer;
  return {
    userName: user.name,
    userToken: user.token,
    isAdmin: user.role === 'admin' || user.role === 'superAdmin',
    isSuperAdmin: user.role === 'superAdmin',
    toUpdate: find(centers, { id: store.updateCenterReducer.centerToUpdate }),
    updatingCenterStarted: store.updateCenterReducer.updatingCenterStarted,
    updatingCenterResolved: store.updateCenterReducer.updatingCenterResolved,
    updatingCenterError: store.updateCenterReducer.updatingCenterError,
  };
})
class EditCenter extends React.Component {
  constructor() {
    super();
    this.state = {
      name: null,
      location: null,
      details: null,
      capacity: null,
      price: null,
      newImages: null,
      inputErrors: {
        nameError: null,
        locationError: null,
        detailsError: null,
        capacityError: null,
        priceError: null,
      },
    };
  }

  componentWillUnmount() {
    this.props.dispatch(stopAsyncProcess(asyncProcess.UPDATING_CENTER));
  }

  /**
   * Stores the user inputs in the state of this component.
   * @param {Event} event The event object.
   */
  getInput = (event) => {
    const state = { ...this.state };
    state[event.target.name] = event.target.value;
    this.setState(state);
  }

  /**
   * Clears all the inputErrors in the state.
   */
  clearInputErrors = () => {
    const state = { ...this.state };
    state.inputErrors = {
      nameError: null,
      locationError: null,
      detailsError: null,
      capacityError: null,
      priceError: null,
    };
    this.setState(state);
  }

  /**
   * A callback to update the state after the user uploads an image.
   * @param {File} files The image file.
   */
  handleImageDrop = (files) => {
    this.setState({
      newImages: files,
    });
  }

  /**
   * Dispatches the action to update the center.
   * @param {Event} event The event object.
   */
  update = (event) => {
    event.preventDefault();
    this.props.dispatch(stopAsyncProcess(asyncProcess.UPDATING_CENTER));
    const {
      name, location, details, capacity, price, newImages,
    } = this.state;
    const centerId = this.props.toUpdate.id;
    const centerDetails = {
      name, location, details, capacity, price,
    };
    const inputErrors = validateUpdateCenterInputs(centerDetails);
    if (inputErrors.errorFound) {
      const state = { ...this.state };
      state.inputErrors = inputErrors;
      this.setState(state);
    } else {
      const fd = new FormData();
      const entries = Object.entries(centerDetails);
      entries.forEach((entry) => {
        const key = entry[0];
        const value = entry[1];
        if (value) {
          fd.append(key, value);
        }
      });
      if (newImages) {
        fd.append('image', newImages[0]);
      }
      this.props.dispatch(updateCenter(centerId, fd, this.props.userToken));
    }
    window.scrollTo(0, 0);
  }

  render() {
    if (this.props.updatingCenterResolved) {
      return (<Redirect to="/centers" />);
    }
    return (
      <View
        userName={this.props.userName}
        isAdmin={this.props.isAdmin}
        isSuperAdmin={this.props.isSuperAdmin}
        dispatch={this.props.dispatch}
        updatingCenterStarted={this.props.updatingCenterStarted}
        updatingCenterError={this.props.updatingCenterError}
        getInput={this.getInput}
        inputErrors={this.state.inputErrors}
        handleImageDrop={this.handleImageDrop}
        images={this.state.images}
        update={this.update}
        toUpdate={this.props.toUpdate}
      />
    );
  }
}

EditCenter.defaultProps = {
  userName: '',
  userToken: '',
  isAdmin: false,
  isSuperAdmin: false,
  toUpdate: {},
  updatingCenterStarted: false,
  updatingCenterResolved: false,
  updatingCenterError: '',
  dispatch: () => {},
};

/* eslint-disable react/forbid-prop-types */
EditCenter.propTypes = {
  userName: PropTypes.string,
  userToken: PropTypes.string,
  isAdmin: PropTypes.bool,
  isSuperAdmin: PropTypes.bool,
  toUpdate: PropTypes.object,
  updatingCenterStarted: PropTypes.bool,
  updatingCenterResolved: PropTypes.bool,
  updatingCenterError: PropTypes.string,
  dispatch: PropTypes.func,
};

export default EditCenter;
