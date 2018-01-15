import axios from 'axios';

const apiBaseUrl = process.env.API_BASE_URL;

// This action get all centers
export const getAllCenters = () => (dispatch) => {
  dispatch({ type: 'GETTING_CENTERS' });
  axios.get(`${apiBaseUrl}/centers`)
    .then((response) => {
      dispatch({ type: 'GETTING_CENTERS_RESOLVED', payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: 'GETTING_CENTERS_REJECTED', payload: err.response.data });
    });
};

// This action adds a center
export const addCenter = (centerDetails, userToken) => (dispatch) => {
  dispatch({ type: 'ADDING_CENTER' });
  const config = {
    headers: {
      'access-token': userToken,
      'Content-type': 'multipart/form-data',
    },
  };
  axios.post(`${apiBaseUrl}/centers`, centerDetails, config)
    .then((response) => {
      dispatch({ type: 'ADDING_CENTER_RESOLVED', payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: 'ADDING_CENTER_REJECTED', payload: err.response.data });
    });
};

export const updateCenter = (id, centerDetails, userToken) => (dispatch) => {
  dispatch({ type: 'UPDATING_CENTER' });
  const config = {
    headers: {
      'access-token': userToken,
      'Content-type': 'multipart/form-data',
    },
  };
  axios.put(`${apiBaseUrl}/centers/${id}`, centerDetails, config)
    .then((response) => {
      dispatch({ type: 'UPDATING_CENTER_RESOLVED', payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: 'UPDATING_CENTER_REJECTED', payload: err.response.data });
    });
};

// This action initializes the editing of a center using its center id
export const initializeEdit = centerId => ({ type: 'INITIALIZE_EDIT', payload: centerId });

// This action triggers the display of the modal that shows the details of a center
export const showCenterModal = centerId => ({ type: 'SHOW_CENTER_MODAL', payload: centerId });

// This action updates the state about a center that is about to be booked
export const book = centerId => ({ type: 'BOOK', payload: centerId });

// This action reset the status of a specific process in the center store to its initial state
export const clearStatus = process => ({ type: 'CLEAR_CENTER_STATUS', payload: process });

