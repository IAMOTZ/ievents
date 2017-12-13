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
    })
  }
} 

export const clearStatus = () => {
  return { type: 'CLEAR_STATUS', }
}