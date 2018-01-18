import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
// Actions.
import {
  getAllTransactions, deleteTransaction, clearStatus,
} from '../../actions/transactionActions';
// Common components.
import UserSideNav from '../common/SideNavigation.jsx';
import TransactionCards from '../common/TransactionCards.jsx';
import { ConfirmModal } from '../common/Modal';
import { UserTopNav } from '../common/TopNavigation.jsx';
import { LoadingContainer, LoadingIcon } from '../common/LoadingAnimation.jsx';

@connect(store => (
  {
    user: store.user.user,
    authenticated: store.user.status.fetched,
    transactions: store.transactions,
    status: {
      fetching: store.transactions.status.fetching,
      deleting: store.transactions.status.deleting,
    },
  }
))
export default class Transactions extends React.Component {
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
    if (this.props.transactions.status.deleted) {
      this.setState({ toDelete: null });
      this.refresh();
    }
  }

  /**
   * Refresh the page by clearing all created info eg Error Messages.
   */
  refresh = () => {
    this.props.dispatch(clearStatus('ALL'));
    this.props.dispatch(getAllTransactions(this.props.user.token));
  }

  /**
   * It updates the state about a transaction that is to be deleted/canceled.
   * It also initiates the confirmation modal.
   * @param {Event} e The event object.
   */
  startDelete = (e) => {
    this.setState({
      toDelete: e.target.dataset.transactionId,
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
    let component;
    if (!this.props.authenticated) {
      component = (<Redirect to="/users/login" />);
    } else {
      component = (
        <div id="transactions-container">
          {/* Top navigation on small screen */}
          <UserTopNav name={this.props.user.name} title="Transactions" />
          <div className="container-fluid">
            <div className="row">
              {/*  Side navigation on large screen */}
              <UserSideNav userName={this.props.user.name} />
              {/* Main content */}
              <div className="col-lg-10 offset-md-2" id="add-event-section">
                {/* Content Header(navigation) on large screen */}
                <nav className="navbar w-100 mt-3 d-none d-lg-flex justify-content-between">
                  <a className="navbar-brand text-white">
                    <strong>Transactions</strong>
                  </a>
                  <button
                    className="btn btn-primary"
                    disabled={this.props.status.fetching}
                    onClick={this.refresh}
                  >Refresh
                  </button>
                </nav>
                <div id="transactions" className="mt-lg-0">
                  <div id="accordion" role="tablist">
                    {
                      this.props.transactions.centers.length === 0 && this.props.status.fetching ?
                        <LoadingContainer iconSize={4} /> :
                        <div>
                          <div className="text-center d-lg-none">
                            <button
                              className="btn btn-primary"
                              disabled={this.props.status.fetching}
                              onClick={this.refresh}
                            >Refresh
                            </button>
                          </div>
                          <LoadingIcon start={this.props.status.fetching} size={2} />
                          <TransactionCards
                            centers={this.props.transactions.centers}
                            onCancel={this.startDelete}
                            toDelete={this.state.toDelete}
                            deleting={this.props.status.deleting}
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
    return component;
  }
}
