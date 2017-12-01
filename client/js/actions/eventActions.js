import axios from 'axios';

// This action contacts the server to add an event for a user
export const addEvent = (eventDetails, userToken) => {
  return (dispatch) => {
    dispatch({ type: 'ADDDING_EVENT' });
    const config = {
      headers: {
        "access-token": userToken
      }
    }
    axios.post('http://localhost:3000/api/v1/events', eventDetails, config)
      .then((response) => {
        dispatch({ type: 'ADDING_EVENT_RESOLVED', payload: response.data, })
      })
      .catch((err) => {
        dispatch({ type: 'ADDING_EVENT_REJECTED', payload: err.response.data, });
      })
  }
};

// This action contacts the server to get all of a users event
export const getAllEvents = (userToken) => {
  return (dispatch) => {
    dispatch({ type: 'FETCHING_EVENTS' });
    const config = {
      headers: {
        "access-token": userToken
      }
    }
    axios.get('http://localhost:3000/api/v1/events', config)
      .then((response) => {
        dispatch({ type: 'FETCHING_EVENTS_RESOLVED', payload: response.data, });
      })
      .catch((err) => {
        dispatch({ type: 'FETCHING_EVENTS_REJECTED', payload: err.response.data, });
      })
  }
}