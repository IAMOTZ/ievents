import axios from 'axios';

const createUser = (userDetails) => {
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

export default createUser;
