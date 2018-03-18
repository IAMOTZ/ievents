import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  getAllEvents, deleteEvent, setEventToUpdate,
} from '../../actions/eventActions';
import { getAllCenters } from '../../actions/centerActions';
import { stopAsyncProcess } from '../../actions/commonActions';
import * as asyncProcess from '../../actions/asyncProcess';
import UserSideNav from '../common/SideNavigation';
import Header from '../common/Header';
import EventCards from '../common/EventCards';
import { UserTopNav } from '../common/TopNavigation';
import { ConfirmModal } from '../common/Modal';
import { LoadingContainer, LoadingIcon } from '../common/LoadingAnimation';

@connect((store) => {
  const { user } = store.authReducer;
  return {
    user,
    isAdmin: user.role === 'admin',
    isSuperAdmin: user.role === 'admin' || user.role === 'superAdmin',
    isUserAuthenticaed: store.authReducer.loggingUserResolved,
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
      modalVisible: false,
    };
  }

  componentWillMount() {
    this.props.dispatch(getAllEvents(this.props.user.token));
    this.props.dispatch(getAllCenters());
  }

  componentDidUpdate() {
    if (this.props.deletingEventResolved) {
      const userToken = this.props.user.token;
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
    state.modalVisible = !this.state.modalVisible;
    this.setState(state);
  }

  /**
   * It eventually deletes the event and hides back the modal.
   */
  finishDelete = () => {
    this.props.dispatch(deleteEvent(this.state.toDelete, this.props.user.token));
    this.setState({
      toDelete: null,
      modalVisible: !this.state.modalVisible,
    });
    window.scrollTo(0, 0);
  }

  /**
   * This method cancels the deleting and also hides back the modal.
   */
  cancelDelete = () => {
    this.setState({
      toDelete: null,
      modalVisible: !this.state.modalVisible,
    });
  }

  render() {
    if (!this.props.isUserAuthenticaed) {
      return (<Redirect to="/users/login" />);
    }
    return (
      <div id="events-container">
        <UserTopNav
          name={this.props.user.name}
          title="My Events"
          isAdmin={this.props.isAdmin}
          isSuperAdmin={this.props.isSuperAdmin}
          dispatch={this.props.dispatch}
        />
        <div className="container-fluid">
          <div className="row">
            <UserSideNav
              name={this.props.user.name}
              isAdmin={this.props.isAdmin}
              isSuperAdmin={this.props.isSuperAdmin}
              dispatch={this.props.dispatch}
            />
            {/* Main content */}
            <div className="col-lg-10 offset-md-2 mt-lg-0" id="main-content">
              {/* Content Header(navigation) on large screen */}
              <Header text="My Events" />
              <div className="bg-primary rounded text-center mx-auto mt-2 w-lg-50">
                <span className="text-white">Events that their date has passed is considered done</span>
              </div>
              <LoadingIcon start={this.props.deletingEventStarted} size={2} />
              {
                this.props.events.length === 0 && this.props.deletingEventStarted ?
                  <LoadingContainer iconSize={4} /> :
                  <div className="mt-5">
                    <div className="card-columns mx-auto">
                      <EventCards
                        events={this.props.events}
                        centers={this.props.centers}
                        startDelete={this.startDelete}
                        remove={this.removeEvent}
                        edit={this.onEdit}
                      />
                    </div>
                  </div>
              }
              <ConfirmModal
                visible={this.state.modalVisible}
                onCancel={this.cancelDelete}
                onOK={this.finishDelete}
              ><span>Are you sure you want to delete this event?</span>
              </ConfirmModal>
            </div>
          </div>
        </div>
        <footer className="d-block d-sm-none mt-5">
          <div className="container text-white text-center py-5">
            <h1>Ievents</h1>
            <p>Copyright &copy; 2017</p>
          </div>
        </footer>
      </div>
    );
  }
}

export default Events;
