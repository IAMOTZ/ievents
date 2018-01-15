import axios from 'axios';

const apiBaseUrl = process.env.API_BASE_URL;

// This action contacts the server to create a user
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

// This action contacts the server to log in a user
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

// This action reset the status of a specific process in the  user store to its initial state
export const clearStatus = process => ({ type: 'CLEAR_USER_STATUS', payload: process });

// This action wipes the user store
export const clearUser = () => ({ type: 'CLEAR_USER' });
