import axios from 'axios';
import dotEnv from 'dotenv';

dotEnv.config();

export default addEvent = (eventDetails, userToken) => {
  return (dispatch) => {
    dispatch({ type: 'ADDDING_EVENT' });
    const config = {
      headers: {
        "access-token": userToken
      }
    }
    axios.post(`${process.env.BASE_URL}/events`, eventDetails, config)
      .then((response) => {
        dispatch({ type: 'ADDING_EVENT_RESOLVED', payload: response.data })
      })
      .catch((err) => {
        dispatch({ type: 'ADDING_EVENT_REJECTED', payload: err.response.data });
      })
  }
};