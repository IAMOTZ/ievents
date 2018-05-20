import React from 'react';
import PropTypes from 'prop-types';
import EventForm from '../AddEvent/EventForm';
import SideNavigation from '../../common/SideNavigation';
import Header from '../../common/Header';
import { AuthTopNavigation } from '../../common/TopNavigation';

const View = props => (
  <div className="add-event-container">
    <AuthTopNavigation
      name={props.userName}
      title="Edit Event"
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
          <Header text="Edit Event" />
          <EventForm
            updatingEventStarted={props.updatingEventStarted}
            updatingEventError={props.updatingEventError}
            getInput={props.getInput}
            inputErrors={props.inputErrors}
            centers={props.centers}
            update={props.update}
            toUpdate={props.toUpdate}
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
  updatingEventError: '',
};

/* eslint-disable react/forbid-prop-types */
View.propTypes = {
  userName: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  isSuperAdmin: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  updatingEventStarted: PropTypes.bool.isRequired,
  updatingEventError: PropTypes.string,
  getInput: PropTypes.func.isRequired,
  inputErrors: PropTypes.object,
  centers: PropTypes.array.isRequired,
  update: PropTypes.func.isRequired,
  toUpdate: PropTypes.object.isRequired,
};

export default View;
