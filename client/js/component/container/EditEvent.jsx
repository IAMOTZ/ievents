import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
// Actions.
import { getAllCenters } from '../../actions/centerActions';
import { updateEvent, clearStatus } from '../../actions/eventActions';
// Common Components.
import UserSideNav from '../common/SideNavigation.jsx';
import CenterOptions from '../common/CenterDropDown.jsx';
import Header from '../common/Header.jsx';
import WarningAlert from '../common/WarningAlert.jsx';
import { UserTopNav } from '../common/TopNavigation.jsx';
import { LoadingIcon } from '../common/LoadingAnimation.jsx';

@connect(store => (
  {
    user: store.user.user,
    authenticated: store.user.status.fetched,
    isAdmin: (store.user.user.role === 'admin'),
    isSuperAdmin: (store.user.user.role === 'superAdmin'),
    centers: store.centers.centers,
    toEdit: store.events.toEdit,
    status: {
      error: store.events.status.updatingError.message,
      success: store.events.status.updated,
      updating: store.events.status.updating,
    },
  }
))
export default class EditEvent extends React.Component {
  constructor() {
    super();
    this.state = {
      title: null,
      description: null,
      date: null,
      centerId: null,
    };
  }

  componentDidMount() {
    this.props.dispatch(getAllCenters());
  }

  componentWillUnmount() {
    this.props.dispatch(clearStatus('ALL'));
  }

  /**
   * Update some state variables with the user inputs.
   * @param {Event} e The event object.
   */
  getInput = (e) => {
    const { state } = this;
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  /**
   * Dispatches the action to add the event.
   */
  update = () => {
    const {
      title, description, centerId,
    } = this.state;
    const date = this.state.date ? this.state.date.replace(/-/g, '/') : null;
    const eventDetails = {
      title, description, date, centerId,
    };
    const eventId = this.props.toEdit.id;
    this.props.dispatch(updateEvent(eventId, eventDetails, this.props.user.token));
    window.scrollTo(0, 0);
  }

  render() {
    let component;
    if (!this.props.authenticated) {
      component = (<Redirect to="/users/login" />);
    } else if (this.props.status.success) {
      component = (<Redirect to="/events" />);
    } else {
      component = (
        <div className="add-event-container">
          {/* Top navigation on small screen */}
          <UserTopNav
            name={this.props.user.name}
            title="Edit Event"
            isAdmin={this.props.isAdmin}
            isSuperAdmin={this.props.isSuperAdmin}
            dispatch={this.props.dispatch}
          />
          <div className="container-fluid">
            <div className="row">
              {/*  Side navigation on large screen */}
              <UserSideNav
                name={this.props.user.name}
                isAdmin={this.props.isAdmin}
                isSuperAdmin={this.props.isSuperAdmin}
                dispatch={this.props.dispatch}
              />
              {/* Main content */}
              <div className="col-lg-10 offset-md-2" id="add-event-section">
                {/* Content Header(navigation) on large screen */}
                <Header text="Edit Event" />
                {/* Input form */}
                <form className="mt-lg-5 w-lg-50">
                  <LoadingIcon start={this.props.status.updating} size={2} />
                  <WarningAlert message={this.props.status.error} />
                  <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      defaultValue={this.props.toEdit.title}
                      placeholder="A short description of your event"
                      name="title"
                      onChange={this.getInput} />
                    <small
                      id="emailHelp"
                      className="form-text text-muted"
                    >Less than 30 characters
                    </small>
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                      id="description"
                      rows="6"
                      className="form-control"
                      defaultValue={this.props.toEdit.description}
                      placeholder="More details about the event"
                      name="description"
                      onChange={this.getInput} />
                    <small
                      id="emailHelp"
                      className="form-text text-muted"
                    >Less than 200 characters
                    </small>
                  </div>
                </form>
                <form className="my-3 form-inline">
                  <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input
                      id="date"
                      type="date"
                      className="form-control mx-sm-3"
                      defaultValue={this.props.toEdit.date.replace(/\//g, '-')}
                      name="date"
                      onChange={this.getInput} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="centers">Choose a Center</label>
                    <select
                      id="centers"
                      className="form-control ml-md-3"
                      name="centerId"
                      onChange={this.getInput}
                      defaultValue={this.props.toEdit.centerId}>
                      <option>choose a center</option>
                      <CenterOptions centers={this.props.centers} />
                    </select>
                  </div>
                </form>
                <button
                  className="btn btn-outline-dark"
                  disabled={this.props.status.updating}
                  onClick={this.update}
                >Update
                </button>
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
