import axios from 'axios';

const apiBaseUrl = process.env.API_BASE_URL;

/**
 * A Thunk modeled action that eventually registers a user.
 * @param {Object} userDetails The details of the user to create.
 * @returns {Function}
 */
export const createUser = userDetails => (dispatch) => {
  dispatch({ type: 'ADDING_USER' });
  axios.post(`${apiBaseUrl}/users`, userDetails)
    .then((response) => {
      dispatch({ type: 'ADDING_USER_RESOLVED', payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: 'ADDING_USER_REJECTED', payload: err.response.data });
    });
};

/**
 * A Thunk modeled action that eventually authenticates a user.
 * @param {Object} userDetails The details of the user.
 * @returns {Function}
 */
export const loginUser = userDetails => (dispatch) => {
  dispatch({ type: 'LOGGING_USER' });
  axios.post(`${apiBaseUrl}/users/login`, userDetails)
    .then((response) => {
      dispatch({ type: 'LOGGING_USER_RESOLVED', payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: 'LOGGING_USER_REJECTED', payload: err.response.data });
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
  dispatch({ type: 'ADDING_ADMIN' });
  const config = {
    headers: {
      'access-token': superAdminToken,
    },
  };
  axios.post(`${apiBaseUrl}/users/admin`, { email }, config)
    .then((response) => {
      dispatch({ type: 'ADDING_ADMIN_RESOLVED', payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: 'ADDING_ADMIN_REJECTED', payload: err.response.data });
    });
};

/**
 * Clears the status variables tracking a particular user process.
 * @param {String} process The process to be cleared.
 * @returns {Object}
 */
export const clearStatus = process => ({ type: 'CLEAR_USER_STATUS', payload: process });

/**
 * Clears the storage that the user info is stored along with his authentication token.
 * This would cause the user to be logged out.
 * @returns {Object}
 */
export const clearUser = () => ({ type: 'CLEAR_USER' });
