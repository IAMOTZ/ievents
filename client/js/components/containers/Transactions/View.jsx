import React from 'react';
import PropTypes from 'prop-types';
import SideNavigation from '../../common/SideNavigation';
import TransactionCards from '../../common/TransactionCards';
import { ConfirmationModal } from '../../common/Modals';
import { AuthTopNavigation } from '../../common/TopNavigation';
import { LoadingBox, LoadingIcon } from '../../common/LoadingAnimation';

const View = props => (
  <div id="transactions-container">
    <AuthTopNavigation
      name={props.userName}
      title="Transactions"
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
        <div className="col-lg-10 offset-md-2" id="add-event-section">
          <nav className="navbar w-100 mt-3 d-none d-lg-flex justify-content-between">
            <a className="navbar-brand text-white">
              <strong>Transactions</strong>
            </a>
            <button
              className="btn btn-primary pointer-button"
              disabled={props.fetchingTransactionsStarted}
              onClick={props.refresh}
            >Refresh
            </button>
          </nav>
          <div id="transactions" className="mt-lg-0">
            <div id="accordion" role="tablist">
              {
                props.transactions.length === 0 && props.fetchingTransactionsStarted ?
                  <LoadingBox iconSize={4} /> :
                  <div>
                    <div className="text-center d-lg-none">
                      <button
                        className="btn btn-primary"
                        disabled={props.fetchingTransactionsStarted}
                        onClick={props.refresh}
                      >Refresh
                      </button>
                    </div>
                    <LoadingIcon start={props.fetchingTransactionsStarted} size={2} />
                    <TransactionCards
                      centers={props.transactions}
                      startDelete={props.startDelete}
                      toDelete={props.toDelete}
                      deleting={props.deletingTransactionStarted}
                    />
                  </div>
              }
              <ConfirmationModal
                onCancel={props.cancelDelete}
                onOK={props.finishDelete}
              >
                <span>Are you sure you want to cancel this event?</span>
              </ConfirmationModal>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

View.defaultProps = {
  toDelete: null,
};

/* eslint-disable react/forbid-prop-types */
View.propTypes = {
  userName: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  isSuperAdmin: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  fetchingTransactionsStarted: PropTypes.bool.isRequired,
  deletingTransactionStarted: PropTypes.bool.isRequired,
  transactions: PropTypes.array.isRequired,
  refresh: PropTypes.func.isRequired,
  toDelete: PropTypes.number,
  startDelete: PropTypes.func.isRequired,
  cancelDelete: PropTypes.func.isRequired,
  finishDelete: PropTypes.func.isRequired,
};

export default View;
