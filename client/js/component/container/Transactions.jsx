import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import {
  getAllTransactions,
  deleteTransaction,
  clearStatus
} from '../../actions/transactionActions';

import UserSideNav from '../common/SideNavigation.jsx';
import TransactionCards from '../common/TransactionCards.jsx';
import { ConfirmModal } from '../common/Modal';
import { UserTopNav } from '../common/TopNavigation.jsx';
import { WarningAlert } from '../common/Alert';
import { LoadingContainer, LoadingIcon } from '../common/LoadingAnimation.jsx';

@connect((store) => {
  return {
    user: store.user.user,
    authenticated: store.user.status.fetched,
    transactions: store.transactions,
    status: {
      fetching: store.transactions.status.fetching,
      deleting: store.transactions.status.deleting
    }
  }
})

export default class Transactions extends React.Component {
  constructor() {
    super();
    this.state = {
      toDelete: null,
      confirmModalVisible: false,
    }
  }

  componentWillMount() {
    this.props.dispatch(getAllTransactions(this.props.user.token));
  }

  refresh = () => {
    this.props.dispatch(clearStatus('ALL'));
    this.props.dispatch(getAllTransactions(this.props.user.token));
  }

  componentDidUpdate() {
    if (this.props.transactions.status.deleted) {
      this.setState({
        toDelete: null,
      });
      this.refresh();
    }
  }

  startDelete = (e) => {
    this.setState({
      toDelete: e.target.dataset.transactionId,
      confirmModalVisible: !this.state.confirmModalVisible
    });
  }

  finishDelete = () => {
    this.props.dispatch(deleteTransaction(this.props.user.token, this.state.toDelete));
    this.setState({
      confirmModalVisible: !this.state.confirmModalVisible,
    })
  }

  cancelDelete = () => {
    this.setState({
      toDelete: null,
      confirmModalVisible: !this.state.confirmModalVisible,
    });
  }

  render() {
    if (!this.props.authenticated) {
      return (<Redirect to="/users/login" />)
    } else {
      return (
        <div id="transactions-container">
          {/* Top navigation on small screen */}
          <UserTopNav name={this.props.user.name} title='Transactions' />
          <div class="container-fluid">
            <div class="row">
              {/*  Side navigation on large screen */}
              <UserSideNav userName={this.props.user.name} />
              {/* Main content */}
              <div class="col-lg-10 offset-md-2" id="add-event-section">
                {/* Content Header(navigation) on large screen */}
                <nav className="navbar w-100 mt-3 d-none d-lg-flex justify-content-between">
                  <a className="navbar-brand text-white">
                    <strong>Transactions</strong>
                  </a>
                  <button className="btn btn-primary" disabled={this.props.status.fetching} onClick={this.refresh}>Refresh</button>
                </nav>
                <div id="transactions" class="mt-lg-0">
                  <div id="accordion" role="tablist">
                    {
                      this.props.transactions.centers.length === 0 && this.props.status.fetching ? <LoadingContainer iconSize={4} /> :
                        <div>
                          <div className="text-center d-lg-none">
                            <button className="btn btn-primary" disabled={this.props.status.fetching} onClick={this.refresh}>Refresh</button>
                          </div>
                          <LoadingIcon start={this.props.status.fetching} size={2} />
                          <TransactionCards
                            centers={this.props.transactions.centers}
                            onCancel={this.startDelete}
                            toDelete={this.state.toDelete}
                            deleting={this.props.status.deleting} />
                        </div>
                    }
                    <ConfirmModal visible={this.state.confirmModalVisible}
                      onCancel={this.cancelDelete}
                      onOK={this.finishDelete}
                      children="Are you sure you want to cancel this event?" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}