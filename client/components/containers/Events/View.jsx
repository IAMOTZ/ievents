import React from 'react';
import PropTypes from 'prop-types';
import SideNavigation from '../../common/SideNavigation';
import Header from '../../common/Header';
import EventCards from '../../common/EventCards';
import { AuthTopNavigation } from '../../common/TopNavigation';
import { ConfirmationModal } from '../../common/Modals';
import { LoadingBox, LoadingIcon } from '../../common/LoadingAnimation';

const View = props => (
  <div id="events-container">
    <AuthTopNavigation
      name={props.userName}
      title="My Events"
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
        <div className="col-lg-10 offset-md-2 mt-lg-0">
          <Header text="My Events" />
          <div id="page-content">
            <div className="bg-primary rounded text-center mx-auto mt-2 w-lg-50">
              <span className="text-white">Events that their date has passed is considered done</span>
            </div>
            <LoadingIcon start={props.deletingEventStarted} size={2} />
            {
              props.events.length === 0 && props.fetchingEventsStarted ?
                <LoadingBox iconSize={4} /> :
                <div className="mt-5">
                  <div className="card-columns mx-auto">
                    <EventCards
                      events={props.events}
                      centers={props.centers}
                      startDelete={props.startDelete}
                      edit={props.onEdit}
                    />
                  </div>
                </div>
            }
            <ConfirmationModal
              onCancel={props.cancelDelete}
              onOK={props.finishDelete}
            ><span>Are you sure you want to delete this event?</span>
            </ConfirmationModal>
          </div>

        </div>
      </div>
    </div>
    <footer className="d-block d-sm-none mt-5">
      <div className="container text-white text-center py-5">
        <h1>iEvents</h1>
        <p>Copyright &copy; 2017</p>
      </div>
    </footer>
  </div>
);

/* eslint-disable react/forbid-prop-types */
View.propTypes = {
  userName: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  isSuperAdmin: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  deletingEventStarted: PropTypes.bool.isRequired,
  fetchingEventsStarted: PropTypes.bool.isRequired,
  events: PropTypes.array.isRequired,
  centers: PropTypes.array.isRequired,
  startDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  cancelDelete: PropTypes.func.isRequired,
  finishDelete: PropTypes.func.isRequired,
};

export default View;
