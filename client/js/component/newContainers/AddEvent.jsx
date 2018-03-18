import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getAllCenters } from '../../actions/centerActions';
import { addEvent } from '../../actions/eventActions';
import { stopAsyncProcess } from '../../actions/commonActions';
import * as asyncProcess from '../../actions/asyncProcess';
import { validateAddEventInputs } from '../../helpers/inputValidators';
import UserSideNav from '../common/SideNavigation';
import CenterOptions from '../common/CenterDropDown';
import Header from '../common/Header';
import { UserTopNav } from '../common/TopNavigation';
import { LoadingIcon } from '../common/LoadingAnimation';
import { BigAlert, SmallAlert } from '../common/Alert';

@connect((store) => {
  const { user } = store.authReducer;
  return {
    user,
    isAdmin: user.role === 'admin',
    isSuperAdmin: user.role === 'admin' || user.role === 'superAdmin',
    isUserAuthenticaed: store.authReducer.loggingUserResolved,
    centers: store.fetchCentersReducer.centers,
    centerToBook: store.addEventReducer.centerToBook,
    addingEventStarted: store.addEventReducer.addingEventStarted,
    addingEventResolved: store.addEventReducer.addingEventResolved,
    addingEventError: store.addEventReducer.addingEventError,
  };
})
class AddEvent extends React.Component {
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

  componentWillMount() {
    this.props.dispatch(getAllCenters());
  }

  componentWillUnmount() {
    this.props.dispatch(stopAsyncProcess(asyncProcess.ADDING_EVENT));
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
  add = () => {
    this.props.dispatch(stopAsyncProcess(asyncProcess.ADDING_EVENT));
    const {
      title, description, centerId,
    } = this.state;
    const date = this.state.date ? this.state.date.replace(/-/g, '/') : null;
    const eventDetails = {
      title, description, date, centerId,
    };
    const inputErrors = validateAddEventInputs(eventDetails);
    if (inputErrors.errorFound) {
      const state = { ...this.state };
      state.inputErrors = inputErrors;
      this.setState(state);
    } else {
      this.clearInputErrors();
      this.props.dispatch(addEvent(eventDetails, this.props.user.token));
      window.scrollTo(0, 0);
    }
  }

  render() {
    if (!this.props.isUserAuthenticaed) {
      return (<Redirect to="/users/login" />);
    } else if (this.props.addingEventResolved) {
      return (<Redirect to="/events" />);
    }
    return (
      <div className="add-event-container">
        {/* Top navigation on small screen */}
        <UserTopNav
          name={this.props.user.name}
          title="Add Event"
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
            <div className="col-lg-10 offset-md-2" id="main-content">
              {/* Content Header(navigation) on large screen */}
              <Header text="Add Event" />
              {/* Input form */}
              <form className="mt-lg-5 w-lg-50">
                <LoadingIcon start={this.props.addingEventStarted} size={3} />
                <BigAlert message={this.props.addingEventError} />
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className="form-control"
                    placeholder="A short description of your event"
                    onChange={this.getInput}
                  />
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
                    rows="6"
                    name="description"
                    id="description"
                    className="form-control"
                    placeholder="More details about the event"
                    onChange={this.getInput}
                  />
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
                    type="date"
                    id="date"
                    className="form-control ml-sm-3"
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
                    defaultValue={this.props.centerToBook}
                  >
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
                disabled={this.props.addingEventStarted}
                onClick={this.add}
              >Add
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
}

export default AddEvent;
