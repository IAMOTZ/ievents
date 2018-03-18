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
 * A Thunk modeled action that eventually adds an admin.
 * SuperAdmin: This is the only user that can add admin.
 * @param {String} email The email of the admin to be added.
 * @param {String} superAdminToken The token of the superAdmin.
 * @returns {Function}
 */
export const addAdmin = (email, superAdminToken) => (dispatch) => {
  dispatch({ type: actionTypes.ADDING_ADMIN_STARTED });
  const config = {
    headers: {
      'access-token': superAdminToken,
    },
  };
  axios.post(`${apiBaseUrl}/users/admin`, { email }, config)
    .then((response) => {
      dispatch({ type: actionTypes.ADDING_ADMIN_RESOLVED, payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: actionTypes.ADDING_ADMIN_REJECTED, payload: err.response.data });
    });
};

/**
 * A Thnk modeled action that eventually change the password of a user.
 * @param {Object} passwordDetails The detials needed for changing the password.
 * @param {String} userToken The token of the user.
 * @returns {Function}
 */
export const changePassword = (passwordDetails, userToken) => (dispatch) => {
  dispatch({ type: actionTypes.CHANGING_PASSWORD_STARTED });
  const config = {
    headers: {
      'access-token': userToken,
    },
  };
  axios.put(`${apiBaseUrl}/users/changePassword`, passwordDetails, config)
    .then((response) => {
      dispatch({ type: actionTypes.CHANGING_PASSWORD_RESOLVED, payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: actionTypes.CHANGING_PASSWORD_REJECTRED, payload: err.response.data });
    });
};

export const deleteUser = (userPassword, userToken) => (dispatch) => {
  dispatch({ type: actionTypes.DELETING_ACCOUNT_STARTED });
  const config = {
    headers: {
      'access-token': userToken,
    },
  };
  axios.post(`${apiBaseUrl}/users/deleteUser`, { password: userPassword }, config)
    .then((response) => {
      dispatch({ type: actionTypes.DELETING_ACCOUNT_RESOLVED, payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: actionTypes.DELETING_ACCOUNT_REJECTED, payload: err.response.data });
    });
};

/**
 * Clears the storage that the user info is stored along with his authentication token.
 * This would cause the user to be logged out.
 * @returns {Object}
 */
export const clearUser = () => ({ type: actionTypes.LOG_OUT });
