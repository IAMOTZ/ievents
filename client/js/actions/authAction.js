import axios from 'axios';
import * as actionTypes from './actionTypes';

const apiBaseUrl = process.env.API_BASE_URL;

/**
 * A Thunk modeled action that eventually registers a user.
 * @param {Object} userDetails The details of the user to create.
 * @returns {Function}
 */
export const createUser = userDetails => (dispatch) => {
  dispatch({ type: actionTypes.ADDING_USER_STARTED });
  axios.post(`${apiBaseUrl}/users`, userDetails)
    .then((response) => {
      dispatch({ type: actionTypes.ADDING_USER_RESOLVED, payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: actionTypes.ADDING_USER_REJECTED, payload: err.response.data });
    });
};

/**
 * A Thunk modeled action that eventually authenticates a user.
 * @param {Object} userDetails The details of the user.
 * @returns {Function}
 */
export const loginUser = userDetails => (dispatch) => {
  dispatch({ type: actionTypes.LOGGING_USER_STARTED });
  axios.post(`${apiBaseUrl}/users/login`, userDetails)
    .then((response) => {
      dispatch({ type: actionTypes.LOGGING_USER_RESOLVED, payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: actionTypes.LOGGING_USER_REJECTED, payload: err.response.data });
    });
};

/**
 * Clears the storage that the user info is stored along with his authentication token.
 * This would cause the user to be logged out.
 * @returns {Object}
 */
export const logOut = () => ({ type: actionTypes.LOG_OUT });
