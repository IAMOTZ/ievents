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

export const showCenterModal = (centerId) => {
  return {
    type: 'SHOW_CENTER_MODAL',
    payload: centerId,
  }
}

export default getAllCenters;