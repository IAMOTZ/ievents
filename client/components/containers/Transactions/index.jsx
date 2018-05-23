/* global $ */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getAllTransactions, deleteTransaction,
} from '../../../actions/transactionActions';
import { stopAsyncProcess } from '../../../actions/commonActions';
import * as asyncProcess from '../../../actions/asyncProcess';
import './styles.scss';
import View from './View';

@connect((store) => {
  const { user } = store.authReducer;
  return {
    userName: user.name,
    userToken: user.token,
    isAdmin: user.role === 'admin' || user.role === 'superAdmin',
    isSuperAdmin: user.role === 'superAdmin',
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
    };
  }

  componentWillMount() {
    this.props.dispatch(getAllTransactions(this.props.userToken));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.deletingTransactionResolved) {
      this.setState({ toDelete: null });
      this.refresh();
    }
  }

  /**
   * Refresh the page by clearing all created info eg Error Messages.
   */
  refresh = () => {
    this.props.dispatch(stopAsyncProcess(asyncProcess.DELETING_TRANSACTION));
    this.props.dispatch(getAllTransactions(this.props.userToken));
  }

  /**
   * It updates the state about a transaction that is to be deleted/canceled.
   * @param {Event} event The event object.
   */
  startDelete = (event) => {
    this.setState({
      toDelete: event.target.dataset.transactionId,
    });
  }

  /**
   * It eventually deletes the event.
   */
  finishDelete = () => {
    this.props.dispatch(deleteTransaction(this.props.userToken, this.state.toDelete));
    $('#confirmation-modal').modal('hide');
  }

  /**
   * It cancels the deleting of a transaction.
   */
  cancelDelete = () => {
    this.setState({ toDelete: null });
  }

  render() {
    return (
      <View
        userName={this.props.userName}
        isAdmin={this.props.isAdmin}
        isSuperAdmin={this.props.isSuperAdmin}
        dispatch={this.props.dispatch}
        fetchingTransactionsStarted={this.props.fetchingTransactionsStarted}
        deletingTransactionStarted={this.props.deletingTransactionStarted}
        transactions={this.props.transactions}
        refresh={this.refresh}
        toDelete={this.state.toDelete}
        startDelete={this.startDelete}
        cancelDelete={this.cancelDelete}
        finishDelete={this.finishDelete}
      />
    );
  }
}

Transactions.defaultProps = {
  userName: '',
  userToken: '',
  isAdmin: false,
  isSuperAdmin: false,
  transactions: [],
  fetchingTransactionsStarted: false,
  deletingTransactionStarted: false,
  deletingTransactionResolved: false,
  dispatch: () => {},
};

/* eslint-disable react/forbid-prop-types */
Transactions.propTypes = {
  userName: PropTypes.string,
  userToken: PropTypes.string,
  isAdmin: PropTypes.bool,
  isSuperAdmin: PropTypes.bool,
  transactions: PropTypes.array,
  fetchingTransactionsStarted: PropTypes.bool,
  deletingTransactionStarted: PropTypes.bool,
  deletingTransactionResolved: PropTypes.bool,
  dispatch: PropTypes.func,
};

export default Transactions;
