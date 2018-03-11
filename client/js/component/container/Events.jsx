import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
// Actions.
import {
  getAllEvents, deleteEvent, initializeEdit, clearStatus,
} from '../../actions/eventActions';
import { getAllCenters } from '../../actions/centerActions';
// Common Componnets.
import UserSideNav from '../common/SideNavigation';
import Header from '../common/Header';
import EventCards from '../common/EventCards';
import { UserTopNav } from '../common/TopNavigation';
import { ConfirmModal } from '../common/Modal';
import { LoadingContainer, LoadingIcon } from '../common/LoadingAnimation';

@connect(store => (
  {
    user: store.user.user,
    authenticated: store.user.status.fetched,
    isAdmin: (store.user.user.role === 'admin'),
    isSuperAdmin: (store.user.user.role === 'superAdmin'),
    events: store.events.events,
    centers: store.centers.centers,
    status: {
      deleting: store.events.status.deleting,
      deleted: store.events.status.deleted,
      fetching: store.events.status.fetching,
    },
  }
))
export default class Events extends React.Component {
  constructor() {
    super();
    this.state = {
      toDelete: null,
      modalVisible: false,
    };
  }

  // Getting all the events as soon as this component is about to mount the DOM
  componentWillMount() {
    this.props.dispatch(getAllEvents(this.props.user.token));
    this.props.dispatch(getAllCenters());
  }

  // Getting all the events again when an event is deleted
  componentDidUpdate() {
    if (this.props.status.deleted) {
      this.props.dispatch(getAllEvents(this.props.user.token));
      this.props.dispatch(clearStatus('DELETE'));
    }
  }

  /**
   * It updates the store about an event that is to be edited.
   * @param {Event} event The event object.
   */
  onEdit = (event) => {
    this.props.dispatch(initializeEdit(event.target.id));
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
    let component;
    if (!this.props.authenticated) {
      component = (<Redirect to="/users/login" />);
    } else {
      component = (
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
                <LoadingIcon start={this.props.status.deleting} size={2} />
                {
                  this.props.events.length === 0 && this.props.status.fetching ?
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
    return component;
  }
}
