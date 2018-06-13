import axios from 'axios';
import * as actionTypes from './actionTypes';

const apiBaseUrl = process.env.API_BASE_URL;

/**
 * A Thunk modeled action that eventually adds an admin.
 * SuperAdmin: This is the only user that can add admin.
 * @param {String} email The email of the admin to be added.
 * @param {String} superAdminToken The token of the superAdmin.
 * @returns {Function} Actions wrapped in a function.
 */
export const addAdmin = (email, superAdminToken) => (dispatch) => {
  dispatch({ type: actionTypes.ADDING_ADMIN_STARTED });
  const config = {
    headers: {
      'access-token': superAdminToken,
    },
  };
  return axios.post(`${apiBaseUrl}/users/admin`, { email }, config)
    .then((response) => {
      dispatch({ type: actionTypes.ADDING_ADMIN_RESOLVED, payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: actionTypes.ADDING_ADMIN_REJECTED, payload: err.response.data });
    });
};

/**
 * A Thunk modeled action that eventually change the password of a user.
 * @param {Object} passwordDetails The detials needed for changing the password.
 * @param {String} userToken The token of the user.
 * @returns {Function} Actions wrapped in a function.
 */
export const changePassword = (passwordDetails, userToken) => (dispatch) => {
  dispatch({ type: actionTypes.CHANGING_PASSWORD_STARTED });
  const config = {
    headers: {
      'access-token': userToken,
    },
  };
  return axios.put(`${apiBaseUrl}/users/changePassword`, passwordDetails, config)
    .then((response) => {
      dispatch({ type: actionTypes.CHANGING_PASSWORD_RESOLVED, payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: actionTypes.CHANGING_PASSWORD_REJECTRED, payload: err.response.data });
    });
};

/**
 * A Thunk modeled action that eventually deletes the account of a user.
 * @param {String} userPassword The password of the user.
 * @param {String} userToken The token of the user.
 * @returns {Function} Actions wrapped in a function.
 */
export const deleteAccount = (userPassword, userToken) => (dispatch) => {
  dispatch({ type: actionTypes.DELETING_ACCOUNT_STARTED });
  const config = {
    headers: {
      'access-token': userToken,
    },
  };
  return axios.post(`${apiBaseUrl}/users/deleteUser`, { password: userPassword }, config)
    .then((response) => {
      dispatch({ type: actionTypes.DELETING_ACCOUNT_RESOLVED, payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: actionTypes.DELETING_ACCOUNT_REJECTED, payload: err.response.data });
    });
};
