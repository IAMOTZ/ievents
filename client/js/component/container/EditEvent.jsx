import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
// Actions.
import { getAllCenters } from '../../actions/centerActions';
import { updateEvent, clearStatus } from '../../actions/eventActions';
import { validateUpdateEventInputs } from '../../helpers/inputValidators';
// Common Components.
import UserSideNav from '../common/SideNavigation.jsx';
import CenterOptions from '../common/CenterDropDown.jsx';
import Header from '../common/Header.jsx';
import { UserTopNav } from '../common/TopNavigation.jsx';
import { LoadingIcon } from '../common/LoadingAnimation.jsx';
import { BigAlert, SmallAlert } from '../common/Alert.jsx';

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
    this.props.dispatch(clearStatus('ALL'));
  }

  /**
   * Update some state variables with the user inputs.
   * @param {Event} e The event object.
   */
  getInput = (e) => {
    const state = { ...this.state };
    state[e.target.name] = e.target.value;
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
      const eventId = this.props.toEdit.id;
      this.props.dispatch(updateEvent(eventId, eventDetails, this.props.user.token));
      window.scrollTo(0, 0);
    }
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
                  <BigAlert message={this.props.status.error} />
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
                    >Between 5 and 30 characters
                    </small>
                    <SmallAlert message={this.state.inputErrors.titleError} />
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
                    <SmallAlert message={this.state.inputErrors.descriptionError} />
                  </div>
                </form>
                <form className="my-3 form-inline">
                  <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input
                      id="date"
                      type="date"
                      className="form-control ml-sm-3"
                      defaultValue={this.props.toEdit.date.replace(/\//g, '-')}
                      name="date"
                      onChange={this.getInput}
                    />
                    <SmallAlert message={this.state.inputErrors.dateError} />
                  </div>
                  <div className="form-group ml-md-3">
                    <label htmlFor="centers">Choose a Center</label>
                    <select
                      id="centers"
                      className="form-control ml-md-3"
                      name="centerId"
                      onChange={this.getInput}
                      defaultValue={this.props.toEdit.centerId}>
                      <option
                        value=""
                        name="centerId"
                      >choose a center
                      </option>
                      <CenterOptions centers={this.props.centers} />
                    </select>
                    <SmallAlert message={this.state.inputErrors.centerIdError} />
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
