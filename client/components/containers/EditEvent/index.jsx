import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { find } from 'lodash';
import { getAllCenters } from '../../../actions/centerActions';
import { updateEvent } from '../../../actions/eventActions';
import { stopAsyncProcess } from '../../../actions/commonActions';
import * as asyncProcess from '../../../actions/asyncProcess';
import { validateUpdateEventInputs } from '../../../helpers/inputValidators';
import View from './View';

@connect((store) => {
  const { user } = store.authReducer;
  const { events } = store.fetchEventsReducer;
  return {
    userName: user.name,
    userToken: user.token,
    isAdmin: user.role === 'admin' || user.role === 'superAdmin',
    isSuperAdmin: user.role === 'superAdmin',
    toUpdate: find(events, { id: store.updateEventReducer.eventToUpdate }),
    updatingEventStarted: store.updateEventReducer.updatingEventStarted,
    updatingEventResolved: store.updateEventReducer.updatingEventResolved,
    updatingEventError: store.updateEventReducer.updatingEventError,
    centers: store.fetchCentersReducer.centers,
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
        centerIdError: null,
      },
    };
  }

  componentDidMount() {
    this.props.dispatch(getAllCenters());
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
  update = () => {
    this.props.dispatch(stopAsyncProcess(asyncProcess.UPDATING_EVENT));
    const {
      title, description, centerId,
    } = this.state;
    const date = this.state.date ? this.state.date.replace(/-/g, '/') : null;
    const eventDetails = {
      title, description, date, centerId,
    };
    const inputErrors = validateUpdateEventInputs(eventDetails);
    if (inputErrors.errorFound) {
      const state = { ...this.state };
      state.inputErrors = inputErrors;
      this.setState(state);
    } else {
      const eventId = this.props.toUpdate.id;
      this.props.dispatch(updateEvent(eventId, eventDetails, this.props.userToken));
      window.scrollTo(0, 0);
    }
  }

  render() {
    if (this.props.updatingEventResolved) {
      return (<Redirect to="/events" />);
    }
    return (
      <View
        userName={this.props.userName}
        isAdmin={this.props.isAdmin}
        isSuperAdmin={this.props.isSuperAdmin}
        dispatch={this.props.dispatch}
        updatingEventStarted={this.props.updatingEventStarted}
        updatingEventError={this.props.updatingEventError}
        getInput={this.getInput}
        inputErrors={this.state.inputErrors}
        centers={this.props.centers}
        update={this.update}
        toUpdate={this.props.toUpdate}
      />
    );
  }
}

EditEvent.defaultProps = {
  userName: '',
  userToken: '',
  isAdmin: false,
  isSuperAdmin: false,
  toUpdate: {},
  updatingEventStarted: false,
  updatingEventResolved: false,
  updatingEventError: '',
  centers: [],
  dispatch: () => {},
};

/* eslint-disable react/forbid-prop-types */
EditEvent.propTypes = {
  userName: PropTypes.string,
  userToken: PropTypes.string,
  isAdmin: PropTypes.bool,
  isSuperAdmin: PropTypes.bool,
  toUpdate: PropTypes.object,
  updatingEventStarted: PropTypes.bool,
  updatingEventResolved: PropTypes.bool,
  updatingEventError: PropTypes.string,
  centers: PropTypes.array,
  dispatch: PropTypes.func,
};

export default EditEvent;
