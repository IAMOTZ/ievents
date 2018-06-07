import React from 'react';
import PropTypes from 'prop-types';
import EventForm from './EventForm';
import SideNavigation from '../../common/SideNavigation';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import { AuthTopNavigation } from '../../common/TopNavigation';
import Calendar from '../../common/Calendar';
import { LoadingIcon } from '../../common/LoadingAnimation';
import { BigAlert, SmallAlert } from '../../common/Alert';

const View = props => (
  <div className="add-event-container">
    <AuthTopNavigation
      name={props.userName}
      title="Create Event"
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
        <div className="col-lg-10 offset-md-2">
          <Header text="Create Event" />
          <div className="page-content">
            <LoadingIcon
              start={props.addingEventStarted}
              size={3}
            />
            <BigAlert message={props.addingEventError} />
            <div className="inputs-container">
              <EventForm
                addingEventStarted={props.addingEventStarted}
                addingEventError={props.addingEventError}
                getInput={props.getInput}
                inputErrors={props.inputErrors}
                centers={props.centers}
                centerToBook={props.centerToBook}
                add={props.add}
              />
              <div className="calendar-container">
                <label className="d-block">
                  <span className="text-capitalize">{props.centerToBook.name}</span>&nbsp;calendar
                </label>
                <SmallAlert message={props.inputErrors.dateError} />
                <Calendar handleDateSelection={props.handleDateSelection} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <span className="d-block d-sm-none mt-5">
      <Footer />
    </span>
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
  centerToBook: PropTypes.object,
  handleDateSelection: PropTypes.func.isRequired,
};

export default View;
