import React from 'react';
import PropTypes from 'prop-types';
import EventForm from './EventForm';
import SideNavigation from '../../common/SideNavigation';
import Header from '../../common/Header';
import { AuthTopNavigation } from '../../common/TopNavigation';

const View = props => (
  <div className="add-event-container">
    <AuthTopNavigation
      name={props.userName}
      title="Add Event"
      isAdmin={props.isAdmin}
      isSuperAdmin={props.isSuperAdmin}
      dispatch={props.dispatch}
    />
    <div className="container-fluid">
      <div className="row">
        <SideNavigation
          name={props.userName}
          isAdmin={props.isAdmin}
          isSuperAdmin={props.isSuperAdmin}
          dispatch={props.dispatch}
        />
        <div className="col-lg-10 offset-md-2" id="main-content">
          <Header text="Add Event" />
          <EventForm
            addingEventStarted={props.addingEventStarted}
            addingEventError={props.addingEventError}
            getInput={props.getInput}
            inputErrors={props.inputErrors}
            centers={props.centers}
            centerToBook={props.centerToBook}
            add={props.add}
          />
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

View.defaultProps = {
  inputErrors: {},
  addingEventError: '',
  centerToBook: 0,
  centers: [],
};

/* eslint-disable react/forbid-prop-types */
View.propTypes = {
  add: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  getInput: PropTypes.func.isRequired,
  centers: PropTypes.array,
  isAdmin: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  inputErrors: PropTypes.object,
  isSuperAdmin: PropTypes.bool.isRequired,
  addingEventStarted: PropTypes.bool.isRequired,
  addingEventError: PropTypes.string,
  centerToBook: PropTypes.number,
};

export default View;
