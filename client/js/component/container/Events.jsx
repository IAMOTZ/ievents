import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import {
  getAllEvents,
  deleteEvent,
  initializeEdit,
  clearStatus
} from '../../actions/eventActions';
import { getAllCenters } from '../../actions/centerActions';

import UserSideNav from '../common/SideNavigation.jsx';
import { UserTopNav } from '../common/TopNavigation.jsx';
import { ConfirmModal } from '../common/Modal';
import Header from '../common/Header.jsx';
import EventCards from '../common/EventCards.jsx';

@connect((store) => {
  return {
    user: store.user.user,
    authenticated: store.user.status.fetched,
    events: store.events.events,
    centers: store.centers.centers,
    eventDeleted: store.events.status.deleted,
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

  // Getting all the events as soon as this component is about to mount the DOM
  componentWillMount() {
    this.props.dispatch(getAllEvents(this.props.user.token));
    this.props.dispatch(getAllCenters());
  }

  // Getting all the events again as soon as this component is updated
  componentDidUpdate() {
    if (this.props.eventDeleted) {
      this.props.dispatch(getAllEvents(this.props.user.token));
      this.props.dispatch(clearStatus('DELETE'));
    }
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

  // This method initialize editing of an event
  onEdit = (e) => {
    this.props.dispatch(initializeEdit(e.target.id))
  }

  render() {
    if (!this.props.authenticated) {
      return (<Redirect to="/users/login" />)
    } else {
      return (
        <div id="events-container">
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
                    <EventCards
                      events={this.props.events}
                      centers={this.props.centers}
                      startDelete={this.startDelete}
                      remove={this.removeEvent}
                      edit={this.onEdit} />

                  </div>
                </div>

                <ConfirmModal visible={this.state.modalVisible}
                  onCancel={this.cancelDelete}
                  onOK={this.finishDelete}
                  children="Are you sure you want to delete this event?" />

              </div>
            </div>
          </div>

          <footer class="d-block d-sm-none mt-5">
            <div class="container text-white text-center py-5">
              <h1>Ievents</h1>
              <p>Copyright &copy; 2017</p>
            </div>
          </footer>
        </div>
      )
    }
  }
}