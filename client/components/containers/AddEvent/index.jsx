import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getAllCenters } from '../../../actions/centerActions';
import { addEvent } from '../../../actions/eventActions';
import { stopAsyncProcess } from '../../../actions/commonActions';
import * as asyncProcess from '../../../actions/asyncProcess';
import { validateAddEventInputs } from '../../../helpers/inputValidators';
import View from './View';


@connect((store) => {
  const { user } = store.authReducer;
  return {
    userName: user.name,
    userToken: user.token,
    isAdmin: user.role === 'admin' || user.role === 'superAdmin',
    isSuperAdmin: user.role === 'superAdmin',
    centers: store.fetchCentersReducer.centers,
    centerToBook: store.addEventReducer.centerToBook,
    addingEventStarted: store.addEventReducer.addingEventStarted,
    addingEventResolved: store.addEventReducer.addingEventResolved,
    addingEventError: store.addEventReducer.addingEventError,
  };
})
class AddEvent extends React.Component {
  constructor() {
    super();
    this.state = {
      title: null,
      description: null,
      date: null,
      centerId: null,
      inputErrors: {
        titleError: null,
        descriptionError: null,
        dateError: null,
        centerIdError: null,
      },
    };
  }

  componentWillMount() {
    this.props.dispatch(getAllCenters());
    const state = { ...this.state };
    const centerToBook = this.props.centerToBook || null;
    state.centerId = centerToBook ? String(centerToBook) : null;
    this.setState(state);
  }

  componentWillUnmount() {
    this.props.dispatch(stopAsyncProcess(asyncProcess.ADDING_EVENT));
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
   * Clears all the inputErros in the state.
   */
  clearInputErrors = () => {
    const state = { ...this.state };
    state.inputErrors = {
      titleError: null,
      descriptionError: null,
      dateError: null,
      centerIdError: null,
    };
    this.setState(state);
  }

  /**
   * Dispatches the action to add the event.
   */
  add = () => {
    this.props.dispatch(stopAsyncProcess(asyncProcess.ADDING_EVENT));
    const {
      title, description, centerId,
    } = this.state;
    const date = this.state.date ? this.state.date.replace(/-/g, '/') : null;
    const eventDetails = {
      title, description, date, centerId,
    };
    const inputErrors = validateAddEventInputs(eventDetails);
    if (inputErrors.errorFound) {
      const state = { ...this.state };
      state.inputErrors = inputErrors;
      this.setState(state);
    } else {
      this.clearInputErrors();
      this.props.dispatch(addEvent(eventDetails, this.props.userToken));
      window.scrollTo(0, 0);
    }
  }

  render() {
    if (this.props.addingEventResolved) {
      return <Redirect to="/events" />;
    }
    return (
      <View
        add={this.add}
        userName={this.props.userName}
        getInput={this.getInput}
        centers={this.props.centers}
        isAdmin={this.props.isAdmin}
        dispatch={this.props.dispatch}
        inputErrors={this.state.inputErrors}
        isSuperAdmin={this.props.isSuperAdmin}
        addingEventStarted={this.props.addingEventStarted}
        addingEventError={this.props.addingEventError}
        centerToBook={this.props.centerToBook}
      />
    );
  }
}

AddEvent.defaultProps = {
  userName: '',
  userToken: '',
  isAdmin: false,
  isSuperAdmin: false,
  centers: [],
  centerToBook: 0,
  addingEventStarted: false,
  addingEventResolved: false,
  addingEventError: '',
  dispatch: () => {},
};

/* eslint-disable react/forbid-prop-types */
AddEvent.propTypes = {
  userName: PropTypes.string,
  userToken: PropTypes.string,
  isAdmin: PropTypes.bool,
  isSuperAdmin: PropTypes.bool,
  centers: PropTypes.array,
  centerToBook: PropTypes.number,
  addingEventStarted: PropTypes.bool,
  addingEventResolved: PropTypes.bool,
  addingEventError: PropTypes.string,
  dispatch: PropTypes.func,
};

export default AddEvent;
