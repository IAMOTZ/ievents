/* global $ */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getAllEvents, deleteEvent, setEventToUpdate,
} from '../../../actions/eventActions';
import { getAllCenters } from '../../../actions/centerActions';
import { stopAsyncProcess } from '../../../actions/commonActions';
import * as asyncProcess from '../../../actions/asyncProcess';
import './styles.scss';
import View from './View';

@connect((store) => {
  const { user } = store.authReducer;
  return {
    userName: user.name,
    userToken: user.token,
    isAdmin: user.role === 'admin' || user.role === 'superAdmin',
    isSuperAdmin: user.role === 'superAdmin',
    isUserAuthenticated: store.authReducer.loggingUserResolved,
    fetchingEventsStarted: store.fetchEventsReducer.fetchingEventsStarted,
    deletingEventStarted: store.deleteEventReducer.deletingEventStarted,
    deletingEventResolved: store.deleteEventReducer.deletingEventResolved,
    events: store.fetchEventsReducer.events,
    centers: store.fetchCentersReducer.centers,
  };
})
class Events extends React.Component {
  constructor() {
    super();
    this.state = {
      toDelete: null,
    };
  }

  componentWillMount() {
    this.props.dispatch(getAllEvents(this.props.userToken));
    this.props.dispatch(getAllCenters());
  }

  componentDidUpdate() {
    if (this.props.deletingEventResolved) {
      const { userToken } = this.props;
      this.props.dispatch(getAllEvents(userToken));
      this.props.dispatch(stopAsyncProcess(asyncProcess.DELETING_EVENT));
    }
  }

  /**
   * It updates the store about an event that is to be edited.
   * @param {Event} event The event object.
   */
  onEdit = (event) => {
    this.props.dispatch(setEventToUpdate(event.target.id));
  }

  /**
   * It updates the state about an event that is to be deleted.
   * It also initiates the confirmation modal.
   * @param {Event} event The event object.
   */
  startDelete = (event) => {
    const { id } = event.target;
    const state = { ...this.state };
    state.toDelete = id;
    this.setState(state);
  }

  /**
   * It eventually deletes the event and hides back the modal.
   */
  finishDelete = () => {
    this.props.dispatch(deleteEvent(this.state.toDelete, this.props.userToken));
    this.setState({ toDelete: null });
    $('#confirmation-modal').modal('hide');
    window.scrollTo(0, 0);
  }

  /**
   * This method cancels the deleting and also hides back the modal.
   */
  cancelDelete = () => {
    this.setState({ toDelete: null });
  }

  render() {
    return (
      <View
        userName={this.props.userName}
        isAdmin={this.props.isAdmin}
        isSuperAdmin={this.props.isSuperAdmin}
        dispatch={this.props.dispatch}
        deletingEventStarted={this.props.deletingEventStarted}
        fetchingEventsStarted={this.props.fetchingEventsStarted}
        events={this.props.events}
        centers={this.props.centers}
        startDelete={this.startDelete}
        onEdit={this.onEdit}
        cancelDelete={this.cancelDelete}
        finishDelete={this.finishDelete}
      />
    );
  }
}

Events.defaultProps = {
  userName: '',
  userToken: '',
  isAdmin: false,
  isSuperAdmin: false,
  fetchingEventsStarted: false,
  deletingEventStarted: false,
  deletingEventResolved: false,
  events: [],
  centers: [],
  dispatch: () => { },
};

/* eslint-disable react/forbid-prop-types */
Events.propTypes = {
  userName: PropTypes.string,
  userToken: PropTypes.string,
  isAdmin: PropTypes.bool,
  isSuperAdmin: PropTypes.bool,
  fetchingEventsStarted: PropTypes.bool,
  deletingEventStarted: PropTypes.bool,
  deletingEventResolved: PropTypes.bool,
  events: PropTypes.array,
  centers: PropTypes.array,
  dispatch: PropTypes.func,
};

export default Events;
