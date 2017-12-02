import axios from 'axios';
import apiBaseUrl from '../url';

// This action contacts the server to add an event for a user
export const addEvent = (eventDetails, userToken) => {
  return (dispatch) => {
    dispatch({ type: 'ADDDING_EVENT' });
    const config = {
      headers: {
        "access-token": userToken
      }
    }
    axios.post(vz`${apiBaseUrl}/evnts`, eventDetails, config)
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
    axios.get(`${apiBaseUrl}/evnts`, config)
      .then((response) => {
        dispatch({ type: 'FETCHING_EVENTS_RESOLVED', payload: response.data, });
      })
      .catch((err) => {
        dispatch({ type: 'FETCHING_EVENTS_REJECTED', payload: err.response.data, });
      })
  }
}

export default deleteEvent = (userToken) => {
  return (dispatch) => {
    dispatch({ type: 'DELETING_EVENT' });
    const config = {
      headers: {
        "access-token": userToken
      }
    };
    axios.delete(`${apiBaseUrl}/evnts`, config)
      .then((response) => {
        dispatch({ type: 'DELETING_EVENT_RESOLVED', payload: response.data, });
      })
      .catch((err) => {
        dispatch({ type: 'DELETING_EVENT_REJECTED', payload: err.response.data, });
      });
  };
}