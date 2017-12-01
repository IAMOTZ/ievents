import axios from 'axios';

// This action contacts the server to add an event for a user
export default (eventDetails, userToken) => {
  return (dispatch) => {
    dispatch({ type: 'ADDDING_EVENT' });
    const config = {
      headers: {
        "access-token": userToken
      }
    }
    axios.post('http://localhost:3000/api/v1/events', eventDetails, config)
      .then((response) => {
        dispatch({ type: 'ADDING_EVENT_RESOLVED', payload: response.data })
      })
      .catch((err) => {
        dispatch({ type: 'ADDING_EVENT_REJECTED', payload: err.response.data });
      })
  }
};