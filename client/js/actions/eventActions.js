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
    axios.post(`${apiBaseUrl}/events`, eventDetails, config)
      .then((response) => {
        dispatch({ type: 'ADDING_EVENT_RESOLVED', payload: response.data, })
      })
      .catch((err) => {
        dispatch({ type: 'ADDING_EVENT_REJECTED', payload: err.response.data, });
      })
  }
};

// This action contacts the server to update an event after it has beed edited
export const updateEvent = (id, eventDetails, userToken) => {
  return (dispatch) => {
    dispatch({ type: 'UPDATING_EVENT' });
    const config = {
      headers: {
        "access-token": userToken
      }
    };
    axios.put(`${apiBaseUrl}/events/${id}`, eventDetails, config)
      .then((response) => {
        dispatch({ type: 'UPDATING_EVENT_RESOLVED', payload: response.data, });
      })
      .catch((err) => {
        dispatch({ type: 'UPDATING_EVENT_REJECTED', payload: err.response.data, });
      });
  };
}

// This action contacts the server to get all of a users event
export const getAllEvents = (userToken) => {
  return (dispatch) => {
    dispatch({ type: 'FETCHING_EVENTS' });
    const config = {
      headers: {
        "access-token": userToken
      }
    }
    axios.get(`${apiBaseUrl}/events`, config)
      .then((response) => {
        dispatch({ type: 'FETCHING_EVENTS_RESOLVED', payload: response.data, });
      })
      .catch((err) => {
        dispatch({ type: 'FETCHING_EVENTS_REJECTED', payload: err.response.data, });
      })
  }
}

// This action contacts the server to delete an event
export const deleteEvent = (id, userToken) => {
  return (dispatch) => {
    dispatch({ type: 'DELETING_EVENT' });
    const config = {
      headers: {
        "access-token": userToken
      }
    };
    axios.delete(`${apiBaseUrl}/events/${id}`, config)
      .then((response) => {
        dispatch({ type: 'DELETING_EVENT_RESOLVED', payload: response.data, });
      })
      .catch((err) => {
        dispatch({ type: 'DELETING_EVENT_REJECTED', payload: err.response.data, });
      });
  };
}

export const initializeEdit = (id) => {
  return ({ type: 'INITIALIZE_EDIT', payload: id, });
}

// This action simply reset the status of the event store to its initial state
export const clearStatus = () => {
  return ({ type: 'CLEAR_STATUS', });
}