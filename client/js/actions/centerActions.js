import axios from 'axios';
import apiBaseUrl from '../url';

// This action contacts the server to get all centers
const getAllCenters = () => {
  return (dispatch) => {
    dispatch({ type: 'GETTING_CENTERS' });
    axios.get(`${apiBaseUrl}/centers`)
      .then((response) => {
        dispatch({ type: 'GETTING_CENTERS_RESOLVED', payload: response.data })
      })
      .catch((err) => {
        dispatch({ type: 'GETTING_CENTERS_REJECTED', payload: err.response.data });
      })
  }
}

export const addCenter = (centerDetails, userToken) => {
  return (dispatch) => {
    dispatch({ type: 'ADDDING_CENTER' });
    const config = {
      headers: {
        "access-token": userToken,
      }
    }
    axios.post(`${apiBaseUrl}/centers`, centerDetails, config)
      .then((response) => {
        dispatch({ type: 'ADDING_CENTER_RESOLVED', payload: response.data, })
      })
      .catch((err) => {
        dispatch({ type: 'ADDING_CENTER_REJECTED', payload: err.response.data, });
      })
  }
}

export const showCenterModal = (centerId) => {
  return {
    type: 'SHOW_CENTER_MODAL',
    payload: centerId,
  }
}

// This action simply reset the status of the center store to its initial state
export const clearStatus = () => {
  return ({ type: 'CLEAR_STATUS', });
}

export default getAllCenters;