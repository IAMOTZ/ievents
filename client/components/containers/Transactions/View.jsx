import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import SideNavigation from '../../common/SideNavigation';
import Header from '../../common/Header';
import EventCards from '../../common/EventCards';
import { AuthTopNavigation } from '../../common/TopNavigation';
import { ConfirmationModal, EventDetailsModal } from '../../common/Modals';
import { LoadingBox } from '../../common/LoadingAnimation';
import Footer from '../../common/Footer';
import Pagination from '../../common/Pagination';

const View = (props) => {
  const renderAlternateBody = () => {
    if (props.transactions.length === 0 && props.fetchingTransactionsStarted) {
      return <LoadingBox iconSize={4} />;
    } else if (props.transactions.length === 0 && !props.fetchingTransactionsStarted) {
      return (
        <div className="page-content text-center">
          <h1 className="display-3">The center has no transactions</h1>
          <h3 className="font-weight-normal">Back to&nbsp;
            <Link to="/centers/transactions">transactions page</Link>.
          </h3>
        </div>
      );
    } return null;
  };
  return (
    <div id="events-container">
      <AuthTopNavigation
        name={props.userName}
        title="Transaction/Events"
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
            <Header text="Transaction/Events" />
            <div className="page-content">
              {
                renderAlternateBody() ||
                <div className="row">
                  <EventCards
                    events={props.transactions}
                    startEventCancel={props.startEventCancel}
                    stopEventCancel={props.stopEventCancel}
                    finishEventCancel={props.finishEventCancel}
                    cancelingTransactionStarted={props.cancelingTransactionStarted}
                    createModalContent={props.createModalContent}
                    modalContent={props.modalContent}
                    isTransactionsPage
                  />
                </div>
              }
              <Pagination
                pageCount={Math.ceil(props.pagination.totalCount / props.pagination.limit)}
                onPageChange={props.updatePagination}
              />
              <ConfirmationModal
                onCancel={props.stopEventCancel}
                onOK={props.finishEventCancel}
              ><span>Are you sure you want to cancel this event?</span>
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
};

/* eslint-disable react/forbid-prop-types */
View.propTypes = {
  userName: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  isSuperAdmin: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  transactions: PropTypes.array,
  startEventCancel: PropTypes.func.isRequired,
  fetchingTransactionsStarted: PropTypes.bool.isRequired,
  cancelingTransactionStarted: PropTypes.bool.isRequired,
  finishEventCancel: PropTypes.func.isRequired,
  stopEventCancel: PropTypes.func.isRequired,
  createModalContent: PropTypes.func.isRequired,
  modalContent: PropTypes.object,
  pagination: PropTypes.object,
  updatePagination: PropTypes.func.isRequired,
};

View.defaultProps = {
  modalContent: null,
  transactions: [],
  pagination: {},
};

export default View;
