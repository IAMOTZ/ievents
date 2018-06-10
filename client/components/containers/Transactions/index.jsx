/* global $ */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  getAllTransactions, deleteTransaction,
} from '../../../actions/transactionActions';
import { stopAsyncProcess } from '../../../actions/commonActions';
import * as asyncProcess from '../../../actions/asyncProcess';
import View from './View';

@connect((store) => {
  const { user } = store.authReducer;
  return {
    userName: user.name,
    userToken: user.token,
    isAdmin: user.role === 'admin',
    isSuperAdmin: user.role === 'admin' || user.role === 'superAdmin',
    centerToTransact: store.updateCenterReducer.centerToTransact,
    transactions: store.fetchTransactionsReducer.transactions,
    pagination: store.fetchTransactionsReducer.pagination,
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
      modalContent: null,
    };
  }

  componentWillMount() {
    if (this.props.centerToTransact) {
      this.props.dispatch(getAllTransactions(
        this.props.userToken,
        this.props.centerToTransact,
        {
          limit: this.props.pagination.limit,
          offset: this.props.pagination.offset,
        }
      ));
    }
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
    this.props.dispatch(getAllTransactions(
      this.props.userToken,
      this.props.centerToTransact,
      {
        limit: this.props.pagination.limit,
        offset: this.props.pagination.offset,
      }
    ));
  }

  /**
   * It updates the state about an event that is to be canceled.
   * @param {Event} event The event object.
   */
  startEventCancel = (event) => {
    this.setState({
      toDelete: event.currentTarget.id,
    });
  }

  /**
   * It eventually deletes the event.
   */
  finishEventCancel = () => {
    this.props.dispatch(deleteTransaction(this.props.userToken, this.state.toDelete));
    $('#confirmation-modal').modal('hide');
  }

  /**
   * It stops the canceling of an event.
   */
  stopEventCancel = () => {
    this.setState({ toDelete: null });
  }

  /**
   * Compose the content to be displayed in the event details modal.
   * @param {Object} event The event whose details is to be displayed.
   */
  createModalContent = (event) => {
    const { title, description } = event;
    const state = { ...this.state };
    state.modalContent = {
      eventTitle: title,
      eventDescription: description,
    };
    this.setState(state);
  }

  /**
   * Updates the pagination for the events.
   * @param {Object} pageData The current page data.
   */
  updatePagination = (pageData) => {
    const nextOffset = pageData.selected * this.props.pagination.limit;
    this.props.dispatch(getAllTransactions(
      this.props.userToken,
      this.props.centerToTransact,
      {
        limit: this.props.pagination.limit,
        offset: nextOffset,
      }
    ));
  }

  render() {
    if (!this.props.centerToTransact) {
      return <Redirect to="/centers/transactions" />;
    }
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
        toCancel={this.state.toCancel}
        startEventCancel={this.startEventCancel}
        stopEventCancel={this.stopEventCancel}
        finishEventCancel={this.finishEventCancel}
        createModalContent={this.createModalContent}
        modalContent={this.state.modalContent}
        isTransactionsPage
        pagination={this.props.pagination}
        updatePagination={this.updatePagination}
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
  dispatch: () => { },
  pagination: {},
  centerToTransact: null,
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
  centerToTransact: PropTypes.number,
  pagination: PropTypes.object,
};

export default Transactions;
