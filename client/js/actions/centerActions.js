import axios from 'axios';
import * as actionTypes from './actionTypes';

const apiBaseUrl = process.env.API_BASE_URL;

/**
 * A Thunk modeled action that eventually retrieves all the centers in the app.
 * @returns {Function}
 */
export const getAllCenters = () => (dispatch) => {
  dispatch({ type: actionTypes.FETCHING_CENTERS });
  axios.get(`${apiBaseUrl}/centers`)
    .then((response) => {
      dispatch({ type: actionTypes.FETCHING_CENTERS_RESOLVED, payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: actionTypes.FETCHING_CENTERS_REJECTED, payload: err.response.data });
    });
};

/**
 * A Thunk modeled action that eventually adds a center.
 * @param {Object} centerDetails The details of the center to be added.
 * @param {String} userToken The token of the user that wants to add the center.
 * @returns {Function}
 */
export const addCenter = (centerDetails, userToken) => (dispatch) => {
  dispatch({ type: actionTypes.ADDING_CENTER });
  const config = {
    headers: {
      'access-token': userToken,
      'Content-type': 'multipart/form-data',
    },
  };
  axios.post(`${apiBaseUrl}/centers`, centerDetails, config)
    .then((response) => {
      dispatch({ type: actionTypes.ADDING_CENTER_RESOLVED, payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: actionTypes.ADDING_CENTER_REJECTED, payload: err.response.data });
    });
};

/**
 * A Thunk modeled action that eventually updates a center.
 * @param {Number} id The ID of the center to update.
 * @param {Object} centerDetails The details of the center to update.
 * @param {String} userToken The token of the user that wants to update the center.
 * @returns {Function}
 */
export const updateCenter = (id, centerDetails, userToken) => (dispatch) => {
  dispatch({ type: actionTypes.UPDATING_CENTER });
  const config = {
    headers: {
      'access-token': userToken,
      'Content-type': 'multipart/form-data',
    },
  };
  axios.put(`${apiBaseUrl}/centers/${id}`, centerDetails, config)
    .then((response) => {
      dispatch({ type: actionTypes.UPDATING_CENTER_RESOLVED, payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: actionTypes.UPDATING_CENTER_REJECTED, payload: err.response.data });
    });
};

/**
 * It informs a reducer to update the store about a center that is to be edited.
 * @param {Number} centerId The ID of the center to be edited.
 * @returns {Object}
 */
export const initializeEdit = centerId => (
  { type: actionTypes.INITIALIZE_EDIT, payload: centerId }
);

/**
 * It informs a reducer to update the store with the details of a center to be shown on a modal.
 * @param {Number} centerId The center ID.
 * @returns {Object}
 */
export const showCenterModal = centerId => (
  { type: actionTypes.SHOW_CENTER_MODAL, payload: centerId }
);

/**
 * It informs a reducer to update the store about a center that is about to be booked.
 * @param {Number} centerId The ID of the center.
 * @returns {Object}
 */
export const book = centerId => ({ type: actionTypes.BOOK, payload: centerId });

/**
 * It informs a reducer to Clear the status variables tracking a particular center process.
 * @param {String} process The process to be cleared.
 * @returns {Object}
 */
export const clearStatus = process => ({ type: actionTypes.CLEAR_CENTER_STATUS, payload: process });

