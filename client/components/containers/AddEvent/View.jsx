import React from 'react';
import PropTypes from 'prop-types';
import EventForm from '../AddEvent/EventForm';
import SideNavigation from '../../common/SideNavigation';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import { AuthTopNavigation } from '../../common/TopNavigation';
import Calendar from '../../common/Calendar';
import { LoadingIcon } from '../../common/LoadingAnimation';
import { BigAlert, SmallAlert } from '../../common/Alert';

// This component is reused in AddEvent and EditEvent container
const View = props => (
  <div className="add-event-container">
    <AuthTopNavigation
      name={props.userName}
      title={props.updating ? 'Edit Event' : 'Create Event'}
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
          <Header text={props.updating ? 'Edit Event' : 'Create Event'} />
          <div className="page-content">
            <LoadingIcon
              start={props.updating ?
                props.updatingEventStarted : props.addingEventStarted}
              size={3}
            />
            <BigAlert
              message={props.updating ?
               props.updatingEventError : props.addingEventError}
            />
            <div className="text-center">
              <p className="event-center-name">You are booking&nbsp;
                <span className="text-capitalize">
                  {props.updating ? props.eventToUpdate.centerName : props.centerToBook.name}
                </span>
              </p>
            </div>
            <div className="inputs-container">
              <EventForm
                add={props.add}
                addingEventError={props.addingEventError}
                addingEventStarted={props.addingEventStarted}
                eventToUpdate={props.eventToUpdate}
                getInput={props.getInput}
                inputErrors={props.inputErrors}
                update={props.update}
                updating={props.updating}
                updatingEventError={props.updatingEventError}
                updatingEventStarted={props.updatingEventStarted}
              />
              <div className="calendar-container">
                <label className="d-block">Select the event date</label>
                <SmallAlert message={props.inputErrors.dateError} />
                <Calendar
                  handleDateSelection={props.handleDateSelection}
                  selectedDate={props.selectedDate}
                />
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
  add: () => {},
  addingEventStarted: false,
  addingEventError: '',
  centerToBook: {},
  eventToUpdate: {},
  inputErrors: {},
  selectedDate: null,
  update: () => {},
  updating: false,
  updatingEventStarted: false,
  updatingEventError: '',
};

/* eslint-disable react/forbid-prop-types */
View.propTypes = {
  getInput: PropTypes.func.isRequired,
  inputErrors: PropTypes.object,
  userName: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  isSuperAdmin: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  add: PropTypes.func,
  addingEventStarted: PropTypes.bool,
  addingEventError: PropTypes.string,
  update: PropTypes.func,
  updating: PropTypes.bool,
  updatingEventStarted: PropTypes.bool,
  updatingEventError: PropTypes.string,
  centerToBook: PropTypes.object,
  eventToUpdate: PropTypes.object,
  handleDateSelection: PropTypes.func.isRequired,
  selectedDate: PropTypes.string,
};

export default View;
