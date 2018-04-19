import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  getAllTransactions, deleteTransaction,
} from '../../actions/transactionActions';
import { stopAsyncProcess } from '../../actions/commonActions';
import * as asyncProcess from '../../actions/asyncProcess';
import UserSideNav from '../common/SideNavigation';
import TransactionCards from '../common/TransactionCards';
import { ConfirmModal } from '../common/Modal';
import { UserTopNav } from '../common/TopNavigation';
import { LoadingContainer, LoadingIcon } from '../common/LoadingAnimation';

@connect((store) => {
  const { user } = store.authReducer;
  return {
    user,
    isAdmin: user.role === 'admin',
    isSuperAdmin: user.role === 'admin' || user.role === 'superAdmin',
    isUserAuthenticaed: store.authReducer.loggingUserResolved,
    transactions: store.fetchTransactionsReducer.transactions,
    fetchingTransactionsStarted: store.fetchTransactionsReducer.fetchingTransactionsStarted,
    deletingTransactionStarted: store.deleteTransactionReducer.deletingTransactionStarted,
    deletingTransactionResolved: store.deleteTransactionReducer.deletingTransactionResolved,
  };
})
class Transactions extends React.Component {
  constructor() {
    super();
    this.state = {
      toDelete: null,
      confirmModalVisible: false,
    };
  }

  componentWillMount() {
    this.props.dispatch(getAllTransactions(this.props.user.token));
  }

  componentDidUpdate() {
    if (this.props.deletingTransactionResolved) {
      this.setState({ toDelete: null });
      this.refresh();
    }
  }

  /**
   * Refresh the page by clearing all created info eg Error Messages.
   */
  refresh = () => {
    this.props.dispatch(stopAsyncProcess(asyncProcess.DELETING_TRANSACTION));
    this.props.dispatch(getAllTransactions(this.props.user.token));
  }

  /**
   * It updates the state about a transaction that is to be deleted/canceled.
   * It also initiates the confirmation modal.
   * @param {Event} event The event object.
   */
  startDelete = (event) => {
    this.setState({
      toDelete: event.target.dataset.transactionId,
      confirmModalVisible: !this.state.confirmModalVisible,
    });
  }

  /**
   * It eventually deletes the event and hides back the modal.
   */
  finishDelete = () => {
    this.props.dispatch(deleteTransaction(this.props.user.token, this.state.toDelete));
    this.setState({ confirmModalVisible: !this.state.confirmModalVisible });
  }

  /**
   * It cancels the deleting and also hides back the modal.
   */
  cancelDelete = () => {
    this.setState({
      toDelete: null,
      confirmModalVisible: !this.state.confirmModalVisible,
    });
  }

  render() {
    if (!this.props.isUserAuthenticaed) {
      return (<Redirect to="/users/login" />);
    }
    return (
      <div id="transactions-container">
        {/* Top navigation on small screen */}
        <UserTopNav
          name={this.props.user.name}
          title="Transactions"
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
              <nav className="navbar w-100 mt-3 d-none d-lg-flex justify-content-between">
                <a className="navbar-brand text-white">
                  <strong>Transactions</strong>
                </a>
                <button
                  className="btn btn-primary pointer-button"
                  disabled={this.props.fetchingTransactionsStarted}
                  onClick={this.refresh}
                >Refresh
                </button>
              </nav>
              <div id="transactions" className="mt-lg-0">
                <div id="accordion" role="tablist">
                  {
                    this.props.transactions.length === 0 &&
                      this.props.fetchingTransactionsStarted ?
                        <LoadingContainer iconSize={4} /> :
                        <div>
                          <div className="text-center d-lg-none">
                            <button
                              className="btn btn-primary"
                              disabled={this.props.fetchingTransactionsStarted}
                              onClick={this.refresh}
                            >Refresh
                            </button>
                          </div>
                          <LoadingIcon start={this.props.fetchingTransactionsStarted} size={2} />
                          <TransactionCards
                            centers={this.props.transactions}
                            onCancel={this.startDelete}
                            toDelete={this.state.toDelete}
                            deleting={this.props.deletingTransactionStarted}
                          />
                        </div>
                  }
                  <ConfirmModal
                    visible={this.state.confirmModalVisible}
                    onCancel={this.cancelDelete}
                    onOK={this.finishDelete}
                  >
                    <span>Are you sure you want to cancel this event?</span>
                  </ConfirmModal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Transactions;
