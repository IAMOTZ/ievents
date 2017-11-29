import axios from 'axios';

export const createUser = (userDetails) => {
  return (dispatch) => {
    dispatch({ type: 'FETCH_USER' });
    axios.post('http://localhost:3000/api/v1/users', userDetails)
      .then((response) => {
        dispatch({ type: 'FETCH_USER_RESOLVED', payload: response.data });
      })
      .catch((err) => {
        dispatch({ type: 'FETCH_USER_REJECTED', payload: err.response.data });
      });
  };
};

export const loginUser = (userDetails) => {
  return (dispatch) => {
    dispatch({ type: 'LOGGING_USER' });
    axios.post('http://localhost:3000/api/v1/users/login', userDetails)
      .then((response) => {
        dispatch({ type: 'LOGGING_USER_RESOLVED', payload: response.data });
      })
      .catch((err) => {
        dispatch({ type: 'LOGGING_USER_REJECTED', payload: err.response.data });
      });
  };
}
