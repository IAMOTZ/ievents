/* global $ */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getAllEvents, deleteEvent, setEventToUpdate,
} from '../../../actions/eventActions';
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
    fetchingEventsStarted: store.fetchEventsReducer.fetchingEventsStarted,
    deletingEventStarted: store.deleteEventReducer.deletingEventStarted,
    deletingEventResolved: store.deleteEventReducer.deletingEventResolved,
    events: store.fetchEventsReducer.events,
    pagination: store.fetchEventsReducer.pagination
  };
})
class Events extends React.Component {
  constructor() {
    super();
    this.state = {
      toDelete: null,
      modalContent: null,
    };
  }

  componentWillMount() {
    this.props.dispatch(getAllEvents(this.props.userToken, {
      limit: this.props.pagination.limit,
      offset: this.props.pagination.offset,
    }));
  }

  componentDidUpdate() {
    if (this.props.deletingEventResolved) {
      const { userToken } = this.props;
      this.props.dispatch(getAllEvents(userToken, {
        limit: this.props.pagination.limit,
        offset: this.props.pagination.offset,
      }));
      this.props.dispatch(stopAsyncProcess(asyncProcess.DELETING_EVENT));
    }
  }

  /**
   * It updates the store about an event that is to be edited.
   * @param {Event} event The event object.
   */
  onEdit = (event) => {
    const { id } = event.currentTarget;
    this.props.dispatch(setEventToUpdate(id));
  }

  /**
   * It updates the state about an event that is to be deleted.
   * It also initiates the confirmation modal.
   * @param {Event} event The event object.
   */
  startDelete = (event) => {
    const { id } = event.currentTarget;
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

  /**
   * Compose the content to be displayed in the event details modal.
   * @param {Object} event The event whose details is to be displayed.
   */
  createModalContent = (event) => {
    const { title, description } = event;
    const state = { ...this.state };
    state.modalContent = {
      eventTitle: title,
      eventDescription: description,
    };
    this.setState(state);
  }

  /**
   * Updates the pagination for the events.
   * @param {Object} pageData The current page data.
   */
  updatePagination = (pageData) => {
    const nextOffset = pageData.selected * this.props.pagination.limit;
    this.props.dispatch(getAllEvents(this.props.userToken, {
      limit: this.props.pagination.limit,
      offset: nextOffset,
    }));
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
        startDelete={this.startDelete}
        onEdit={this.onEdit}
        cancelDelete={this.cancelDelete}
        finishDelete={this.finishDelete}
        pagination={this.props.pagination}
        updatePagination={this.updatePagination}
        modalContent={this.state.modalContent}
        createModalContent={this.createModalContent}
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
  dispatch: () => { },
  pagination: {}
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
  dispatch: PropTypes.func,
  pagination: PropTypes.object,
};

export default Events;
