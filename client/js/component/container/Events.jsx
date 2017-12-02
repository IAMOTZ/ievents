import React from 'react';
import { connect } from 'react-redux';

import eventStyles from '../../../sass/userEvents.scss';
import { UserSideNav } from '../common/SideNavigation.jsx';
import { UserTopNav } from '../common/TopNavigation.jsx';
import { ConfirmModal } from '../common/Modal';
import Header from '../common/Header.jsx';
import EventCards from '../common/EventCards.jsx';

import { getAllEvents, deleteEvent } from '../../actions/eventActions';

@connect((store) => {
  return {
    user: store.user.user,
    events: store.events.events,
  }
})

export default class Events extends React.Component {
  constructor() {
    super();
    this.state = {
      toDelete: null,
      modalVisible: false,
    }
  }

  // Getting all the events as soon as this component mount the DOM
  componentDidMount() {
    this.props.dispatch(getAllEvents(this.props.user.token));
  }

  // Getting all the events again as soon as this component is updated
  componentDidUpdate() {
    this.props.dispatch(getAllEvents(this.props.user.token));
  }

  // This method simply keep track of an event to be deleted and also 
  // initiate a modal
  startDelete = (e) => {
    const id = e.target.id;
    const state = this.state;
    state.toDelete = id;
    state.modalVisible = !this.state.modalVisible;
    this.setState(state);
  }

  // This method eventually deletes the event and hides back the modal
  finishDelete = (e) => {
    this.props.dispatch(deleteEvent(this.state.toDelete, this.props.user.token));
    this.setState({
      toDelete: null,
      modalVisible: !this.state.modalVisible,
    })
  }

  // This method cancels the deleting and also hides back the modal
  cancelDelete = () => {
    this.setState({
      toDelete: null,
      modalVisible: !this.state.modalVisible,
    });
  }

  // This method simply removes the event without any warning
  removeEvent = (e) => {
    this.props.dispatch(deleteEvent(e.target.id, this.props.user.token));
  }

  render() {
    return (
      <div>
        <UserTopNav name={this.props.user.name} title='My Events' />

        <div className="container-fluid">
          <div className="row">

            <UserSideNav userName={this.props.user.name} />

            {/* Main content */}
            <div class="col-lg-10 offset-md-2 mt-lg-0" id="main-content">

              {/* Content Header(navigation) on large screen */}
              <Header text='My Events' />

              {/* Event Grid */}
              <div className="mt-5">
                <div className="card-columns mx-auto">
                  <EventCards events={this.props.events} startDelete={this.startDelete} remove={this.removeEvent}/>
                </div>
              </div>

              <ConfirmModal visible={this.state.modalVisible}
                onCancel={this.cancelDelete}
                onOK={this.finishDelete} 
                children="Are you sure you want to delete this event?"/>

            </div>
          </div>
        </div>
      </div>
    )
  }
}