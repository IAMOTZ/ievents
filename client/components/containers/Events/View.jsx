import React from 'react';
import PropTypes from 'prop-types';
import SideNavigation from '../../common/SideNavigation';
import Header from '../../common/Header';
import EventCards from '../../common/EventCards';
import { AuthTopNavigation } from '../../common/TopNavigation';
import { ConfirmationModal, EventDetailsModal } from '../../common/Modals';
import { LoadingBox, LoadingIcon } from '../../common/LoadingAnimation';
import Pagination from '../../common/Pagination';
import Footer from '../../common/Footer';

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
          <div className="page-content">
            <LoadingIcon start={props.deletingEventStarted} size={2} />
            {
              props.events.length === 0 && props.fetchingEventsStarted ?
                <LoadingBox iconSize={4} /> :
                <div className="row">
                  <EventCards
                    events={props.events}
                    startDelete={props.startDelete}
                    edit={props.onEdit}
                    createModalContent={props.createModalContent}
                  />
                </div>
            }
            <Pagination
              pageCount={Math.ceil(props.pagination.totalCount / props.pagination.limit)}
              onPageChange={props.updatePagination}
            />
            <ConfirmationModal
              onCancel={props.cancelDelete}
              onOK={props.finishDelete}
            ><span>Are you sure you want to delete this event?</span>
            </ConfirmationModal>
            <EventDetailsModal {...props.modalContent} />
          </div>

        </div>
      </div>
    </div>
    <span className="d-block d-sm-none mt-5">
      <Footer />
    </span>
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
  startDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  cancelDelete: PropTypes.func.isRequired,
  finishDelete: PropTypes.func.isRequired,
  pagination: PropTypes.object.isRequired,
  updatePagination: PropTypes.func.isRequired,
  modalContent: PropTypes.object,
  createModalContent: PropTypes.func.isRequired,
};

View.defaultProps = {
  modalContent: null,
};

export default View;
