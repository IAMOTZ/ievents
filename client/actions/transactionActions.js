import axios from 'axios';
import * as actionTypes from './actionTypes';

const apiBaseUrl = process.env.API_BASE_URL;

/**
 * A Thunk modeled action that eventually gets all the transaction in the app.
 * @param {String} userToken The token of the user that wants the transaction.
 * @returns {Function}
 */
export const getAllTransactions = (userToken, centerId, pagination = {}) => (dispatch) => {
  dispatch({ type: actionTypes.FETCHING_TRANSACTIONS_STARTED });
  const config = {
    headers: {
      'access-token': userToken,
    },
  };
  axios.get(`${apiBaseUrl}/centers/${centerId}/events?limit=${pagination.limit}&&offset=${pagination.offset}`, config)
    .then((response) => {
      dispatch({ type: actionTypes.FETCHING_TRANSACTIONS_RESOLVED, payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: actionTypes.FETCHING_TRANSACTIONS_REJECTED, payload: err.response.data });
    });
};

/**
 * A Thunk modeled acion that eventuallly deletes a transaction.
 * @param {String} userToken The token of the user that wants to delete the transaction.
 * @param {Number} id The ID of the transaction.
 * @returns {Function}
 */
export const deleteTransaction = (userToken, id) => (dispatch) => {
  dispatch({ type: actionTypes.DELETING_TRANSACTION_STARTED });
  const config = {
    headers: {
      'access-token': userToken,
    },
  };
  axios.delete(`${apiBaseUrl}/transactions/${id}`, config)
    .then((response) => {
      dispatch({ type: actionTypes.DELETING_TRANSACTION_RESOLVED, payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: actionTypes.DELETING_TRANSACTION_REJECTED, payload: err.response.data });
    });
};

