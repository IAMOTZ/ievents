import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { find } from 'lodash';
import { updateEvent } from '../../../actions/eventActions';
import { stopAsyncProcess } from '../../../actions/commonActions';
import * as asyncProcess from '../../../actions/asyncProcess';
import { validateUpdateEventInputs } from '../../../helpers/inputValidators';
import View from '../AddEvent/View';

@connect((store) => {
  const { user } = store.authReducer;
  const { events } = store.fetchEventsReducer;
  return {
    userName: user.name,
    userToken: user.token,
    isAdmin: user.role === 'admin' || user.role === 'superAdmin',
    isSuperAdmin: user.role === 'superAdmin',
    eventToUpdate: find(events, { id: store.updateEventReducer.eventToUpdate }),
    updatingEventStarted: store.updateEventReducer.updatingEventStarted,
    updatingEventResolved: store.updateEventReducer.updatingEventResolved,
    updatingEventError: store.updateEventReducer.updatingEventError,
  };
})
class EditEvent extends React.Component {
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
      },
    };
  }

  componentWillUnmount() {
    this.props.dispatch(stopAsyncProcess(asyncProcess.UPDATING_EVENT));
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
   * Store the date selected in the state of this component.
   * @param {String} dateString The date in its string form.
   */
  handleDateSelection = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    const state = { ...this.state };
    state.date = formattedDate;
    this.setState(state);
  }

  /**
   * Clears all the inputErros in the state.
   */
  clearInputErrors = () => {
    const state = { ...this.state };
    state.inputErrors = {
      titleError: null, descriptionError: null, dateError: null,
    };
    this.setState(state);
  }

  /**
   * Dispatches the action to add the event.
   */
  update = () => {
    this.props.dispatch(stopAsyncProcess(asyncProcess.UPDATING_EVENT));
    const { title, description, date } = this.state;
    const { centerId } = this.props.eventToUpdate;
    const eventDetails = {
      title, description, date, centerId,
    };
    const inputErrors = validateUpdateEventInputs(eventDetails);
    if (inputErrors.errorFound) {
      const state = { ...this.state };
      state.inputErrors = inputErrors;
      this.setState(state);
    } else {
      this.clearInputErrors();
      const eventId = this.props.eventToUpdate.id;
      this.props.dispatch(updateEvent(eventId, eventDetails, this.props.userToken));
      window.scrollTo(0, 0);
    }
  }

  render() {
    if (this.props.updatingEventResolved || !this.props.eventToUpdate) {
      return <Redirect to="/events" />;
    }
    return (
      <View
        userName={this.props.userName}
        isAdmin={this.props.isAdmin}
        isSuperAdmin={this.props.isSuperAdmin}
        dispatch={this.props.dispatch}
        getInput={this.getInput}
        inputErrors={this.state.inputErrors}
        update={this.update}
        updatingEventStarted={this.props.updatingEventStarted}
        updatingEventError={this.props.updatingEventError}
        eventToUpdate={this.props.eventToUpdate}
        updating
        handleDateSelection={this.handleDateSelection}
        selectedDate={this.state.date || this.props.eventToUpdate.date}
      />
    );
  }
}

EditEvent.defaultProps = {
  userName: '',
  userToken: '',
  isAdmin: false,
  isSuperAdmin: false,
  eventToUpdate: {},
  updatingEventStarted: false,
  updatingEventResolved: false,
  updatingEventError: '',
  dispatch: () => { },
};

/* eslint-disable react/forbid-prop-types */
EditEvent.propTypes = {
  userName: PropTypes.string,
  userToken: PropTypes.string,
  isAdmin: PropTypes.bool,
  isSuperAdmin: PropTypes.bool,
  eventToUpdate: PropTypes.object,
  updatingEventStarted: PropTypes.bool,
  updatingEventResolved: PropTypes.bool,
  updatingEventError: PropTypes.string,
  dispatch: PropTypes.func,
};

export default EditEvent;
