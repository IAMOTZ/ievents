import axios from 'axios';
import * as actionTypes from './actionTypes';

const apiBaseUrl = process.env.API_BASE_URL;

/**
 * A Thunk modeled action that eventually gets all the transaction in the app.
 * Transactions are events that belong to the same center
 * @param {String} userToken The token of the user that wants the transaction.
 * @param {Number} centerId The ID of the center.
 * @param {Object} pagination Description of how to paginate the request.
 * @returns {Function} Actions wrapped in a function.
 */
export const getAllTransactions = (userToken, centerId, pagination = {}) => (dispatch) => {
  dispatch({ type: actionTypes.FETCHING_TRANSACTIONS_STARTED });
  const config = {
    headers: {
      'access-token': userToken,
    },
  };
  return axios.get(`${apiBaseUrl}/centers/${centerId}/events?limit=${pagination.limit}&&offset=${pagination.offset}`, config)
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
 * @returns {Function} Actions wrapped in a function.
 */
export const cancelTransaction = (userToken, id) => (dispatch) => {
  dispatch({ type: actionTypes.CANCELING_TRANSACTION_STARTED });
  const config = {
    headers: {
      'access-token': userToken,
    },
  };
  return axios.post(`${apiBaseUrl}/events/${id}/cancel`, {}, config)
    .then((response) => {
      dispatch({ type: actionTypes.CANCELING_TRANSACTION_RESOLVED, payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: actionTypes.CANCELING_TRANSACTION_REJECTED, payload: err.response.data });
    });
};

