import React from 'react';
import PropTypes from 'prop-types';
import { LoadingIcon } from '../LoadingAnimation';

const TransactionTable = props => (
  <table className="table table-striped table-responsive-md">
    <thead>
      <tr>
        <th scope="col" className="d-none d-lg-table-cell">#</th>
        <th scope="col">Client Email</th>
        <th scope="col">Date</th>
        <th scope="col">Decision</th>
      </tr>
    </thead>
    <tbody>
      {
        props.transactions.map((transaction, index) => (
          <tr key={transaction.id}>
            <th scope="row" className="d-none d-lg-table-cell">{index + 1}</th>
            <td>{transaction.event.user.email}
              <a
                href=""
                className="d-block d-lg-inline ml-lg-2"
                data-toggle="modal"
                data-target="#eventModal"
                data-event-title={transaction.event.title}
                data-event-description={transaction.event.description}
                onClick={props.btnAction}
              >event details
              </a>
            </td>
            <td>{transaction.event.date}</td>
            <td>
              <div className="d-flex">
                <button
                  className="btn btn-outline-danger p-1"
                  onClick={props.onCancelEvent}
                  data-transaction-id={transaction.id}
                  disabled={props.deleting}
                  data-toggle="modal"
                  data-target="#confirmation-modal"
                >Cancel
                </button>
                <LoadingIcon
                  start={props.deleting && transaction.id === Number(props.toDelete)}
                  size={1}
                />
              </div>
            </td>
          </tr>
        ))
      }
    </tbody>
  </table>
);

TransactionTable.defaultProps = {
  deleting: false,
  toDelete: null,
};
/* eslint-disable react/forbid-prop-types */
TransactionTable.propTypes = {
  transactions: PropTypes.array.isRequired,
  btnAction: PropTypes.func.isRequired,
  onCancelEvent: PropTypes.func.isRequired,
  deleting: PropTypes.bool,
  toDelete: PropTypes.number,
};

export default TransactionTable;
