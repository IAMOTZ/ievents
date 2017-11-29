import axios from 'axios';

const createUser = (userDetails) => {
  return (dispatch) => {
    dispatch({ type: 'FETCH_MYUSER' });
    axios.post('http://localhost:3000/api/v1/users', userDetails)
      .then((response) => {
        dispatch({ type: 'FETCH_MYUSER_FUFILED', payload: response.data });
      })
      .catch((err) => {
        dispatch({ type: 'FETCH_MYUSER_REJECTED', payload: err });
      });
  };
};

export default createUser;
