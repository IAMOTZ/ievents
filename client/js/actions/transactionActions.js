import axios from 'axios';
import apiBaseUrl from '../url';

export const getAllTransactions = (userToken) => {
  return (dispatch) => {
    dispatch({ type: 'FETCHING_TRANSACTIONS', });
    const config = {
      headers: {
        "access-token": userToken,
      }
    }
    axios.get(`${apiBaseUrl}/transactions`, config)
      .then((response) => {
        dispatch({ type: 'FETCHING_TRANSACTIONS_RESOLVED', payload: response.data, });
      })
      .catch((err) => {
        dispatch({ type: 'FETCHING_TRANSACTIONS_REJECTED', payload: err.response.data, });
      });
  }
}

export const cancelTransaction = (userToken, id) => {
  return (dispatch) => {
    dispatch({ type: 'CANCEL_TRANSACTION' })
    const config = {
      headers: {
        "access-token": userToken,
      }
    }
    axios.put(`${apiBaseUrl}/transactions/${id}?decision=cancel`, {}, config)
      .then((response) => {
        dispatch({ type: 'CANCEL_TRANSACTION_RESOLVED', payload: response.data, });
      })
      .catch((err) => {
        dispatch({ type: 'CANCEL_TRANSACTION_REJECTED', payload: err.response.data, });
      });
  }
}

export const allowTransaction = (userToken, id) => {
  return (dispatch) => {
    dispatch({ type: 'ALLOW_TRANSACTION' });
    const config = {
      headers: {
        "access-token": userToken
      }
    };
    axios.put(`${apiBaseUrl}/transactions/${id}?decision=allow`, {}, config)
      .then((response) => {
        dispatch({ type: 'ALLOW_TRANSACTION_RESOLVED', payload: response.data, });
      })
      .catch((err) => {
        dispatch({ type: 'ALLOW_TRANSACTION_REJECTED', payload: err.response.data, });
      });
  }
}

export const clearTransactionStatus = () => {
  return { type: 'CLEAR_TRANSACTION_STATUS', }
}