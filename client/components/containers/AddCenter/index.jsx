import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { validateAddCenterInputs } from '../../../helpers/inputValidators';
import { addCenter } from '../../../actions/centerActions';
import { stopAsyncProcess } from '../../../actions/commonActions';
import * as asyncProcess from '../../../actions/asyncProcess';
import View from './View';


@connect((store) => {
  const { user } = store.authReducer;
  return {
    userName: user.name,
    userToken: user.token,
    isAdmin: user.role === 'admin' || user.role === 'superAdmin',
    isSuperAdmin: user.role === 'superAdmin',
    addingCenterStarted: store.addCenterReducer.addingCenterStarted,
    addingCenterResolved: store.addCenterReducer.addingCenterResolved,
    addingCenterError: store.addCenterReducer.addingCenterError,
  };
})
class AddCenter extends React.Component {
  constructor() {
    super();
    this.state = {
      name: null,
      location: null,
      details: null,
      capacity: null,
      price: null,
      images: null,
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
    this.props.dispatch(stopAsyncProcess(asyncProcess.ADDING_CENTER));
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
    this.setState({ images: files });
  }

  /**
   * Dispatches the action to add the center.
   * @param {Event} event The event object.
   */
  add = (event) => {
    event.preventDefault();
    this.props.dispatch(stopAsyncProcess(asyncProcess.ADDING_CENTER));
    const {
      name, location, details, capacity, price, images,
    } = this.state;
    const centerDetails = {
      name, location, details, capacity, price,
    };
    const inputErrors = validateAddCenterInputs(centerDetails);
    if (inputErrors.errorFound) {
      const state = { ...this.state };
      state.inputErrors = inputErrors;
      this.setState(state);
    } else {
      this.clearInputErrors();
      const fd = new FormData();
      const entries = Object.entries(centerDetails);
      entries.forEach((entry) => {
        const key = entry[0];
        const value = entry[1];
        if (value) {
          fd.append(key, value);
        }
      });
      if (images) {
        fd.append('image', images[0]);
      }
      this.props.dispatch(addCenter(fd, this.props.userToken));
    }
    window.scrollTo(0, 0);
  }

  render() {
    if (this.props.addingCenterResolved) {
      return (<Redirect to="/centers2" />);
    }
    return (
      <View
        userName={this.props.userName}
        isAdmin={this.props.isAdmin}
        isSuperAdmin={this.props.isSuperAdmin}
        dispatch={this.props.dispatch}
        addingCenterStarted={this.props.addingCenterStarted}
        addingCenterError={this.props.addingCenterError}
        getInput={this.getInput}
        inputErrors={this.state.inputErrors}
        handleImageDrop={this.handleImageDrop}
        images={this.state.images}
        add={this.add}
      />
    );
  }
}

AddCenter.propTypes = {
  userName: PropTypes.string,
  userToken: PropTypes.string,
  isAdmin: PropTypes.bool,
  isSuperAdmin: PropTypes.bool,
  addingCenterStarted: PropTypes.bool,
  addingCenterResolved: PropTypes.bool,
  addingCenterError: PropTypes.string,
  dispatch: PropTypes.func,
};

AddCenter.defaultProps = {
  userName: '',
  userToken: '',
  isAdmin: false,
  isSuperAdmin: false,
  addingCenterStarted: false,
  addingCenterResolved: false,
  addingCenterError: '',
  dispatch: () => {},
};

export default AddCenter;
