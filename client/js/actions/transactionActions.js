import axios from 'axios';

const apiBaseUrl = process.env.API_BASE_URL;

export const getAllTransactions = userToken => (dispatch) => {
  dispatch({ type: 'FETCHING_TRANSACTIONS' });
  const config = {
    headers: {
      'access-token': userToken,
    },
  };
  axios.get(`${apiBaseUrl}/transactions`, config)
    .then((response) => {
      dispatch({ type: 'FETCHING_TRANSACTIONS_RESOLVED', payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: 'FETCHING_TRANSACTIONS_REJECTED', payload: err.response.data });
    });
};

export const deleteTransaction = (userToken, id) => (dispatch) => {
  dispatch({ type: 'DELETE_TRANSACTION' });
  const config = {
    headers: {
      'access-token': userToken,
    },
  };
  axios.delete(`${apiBaseUrl}/transactions/${id}`, config)
    .then((response) => {
      dispatch({ type: 'DELETE_TRANSACTION_RESOLVED', payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: 'DELETE_TRANSACTION_REJECTED', payload: err.response.data });
    });
};

export const clearStatus = process => ({ type: 'CLEAR_TRANSACTION_STATUS', payload: process });
