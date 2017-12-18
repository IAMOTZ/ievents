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

// This actions contacts the server to add a center
export const addCenter = (centerDetails, userToken) => {
  return (dispatch) => {
    dispatch({ type: 'ADDDING_CENTER' });
    const config = {
      headers: {
        'access-token': userToken,
        'Content-type': 'multipart/form-data',
      },
    };
    axios.post(`${apiBaseUrl}/centers`, centerDetails, config)
      .then((response) => {
        dispatch({ type: 'ADDING_CENTER_RESOLVED', payload: response.data, })
      })
      .catch((err) => {
        dispatch({ type: 'ADDING_CENTER_REJECTED', payload: err.response.data, });
      })
  }
}

export const updateCenter = (id, centerDetails, userToken) => {
  return (dispatch) => {
    dispatch({ type: 'UPDATING_CENTER' });
    const config = {
      headers: {
        'access-token': userToken,
        'Content-type': 'multipart/form-data',
      },
    }
    axios.put(`${apiBaseUrl}/centers/${id}`, centerDetails, config)
      .then((response) => {
        dispatch({ type: 'UPDATING_CENTER_RESOLVED', payload: response.data, })
      })
      .catch((err) => {
        dispatch({ type: 'UPDATING_CENTER_REJECTED', payload: err.response.data, });
      })
  }
}

// This action initializes the editing of a center
export const initializeEdit = (id) => {
  return {
    type: 'INITIALIZE_EDIT',
    payload: id,
  };
}

// This action triggers the display of the modal that shows the details of a center
export const showCenterModal = (centerId) => {
  return {
    type: 'SHOW_CENTER_MODAL',
    payload: centerId,
  }
}

// This action reset the status of a specific process in the  center store to its initial state
export const clearStatus = (process) => {
  switch (process) {
    case ('ALL'): {
      return { type: 'CLEAR_ALL_STATUS' }
    }
    case ('IMAGE_UPLOADING'): {
      return { type: 'CLEAR_IMAGE_UPLOADING_STATUS', }
    }
  }
}

export default getAllCenters;