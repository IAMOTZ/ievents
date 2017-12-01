import axios from 'axios';

const getAllCenters = () => {
  return (dispatch) => {
    dispatch({ type: 'GETTING_CENTERS' });
    axios.get('http://localhost:3000/api/v1/centers')
      .then((response) => {
        dispatch({ type: 'GETTING_CENTERS_RESOLVED', payload: response.data })
      })
      .catch((err) => {
        dispatch({ type: 'GETTING_CENTERS_REJECTED', payload: err.response.data });
      })
  }
}

export default getAllCenters;