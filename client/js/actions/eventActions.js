import axios from 'axios';

const apiBaseUrl = process.env.API_BASE_URL;

// This action contacts the server to get all of a users event
export const getAllEvents = userToken => (dispatch) => {
  dispatch({ type: 'FETCHING_EVENTS' });
  const config = {
    headers: {
      'access-token': userToken,
    },
  };
  axios.get(`${apiBaseUrl}/events`, config)
    .then((response) => {
      dispatch({ type: 'FETCHING_EVENTS_RESOLVED', payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: 'FETCHING_EVENTS_REJECTED', payload: err.response.data });
    });
};

// This action adds an event for a user
export const addEvent = (eventDetails, userToken) => (dispatch) => {
  dispatch({ type: 'ADDDING_EVENT' });
  const config = {
    headers: {
      'access-token': userToken,
    },
  };
  axios.post(`${apiBaseUrl}/events`, eventDetails, config)
    .then((response) => {
      dispatch({ type: 'ADDING_EVENT_RESOLVED', payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: 'ADDING_EVENT_REJECTED', payload: err.response.data });
    });
};

// This action updates an event after it has beed edited
export const updateEvent = (id, eventDetails, userToken) => (dispatch) => {
  dispatch({ type: 'UPDATING_EVENT' });
  const config = {
    headers: {
      'access-token': userToken,
    },
  };
  axios.put(`${apiBaseUrl}/events/${id}`, eventDetails, config)
    .then((response) => {
      dispatch({ type: 'UPDATING_EVENT_RESOLVED', payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: 'UPDATING_EVENT_REJECTED', payload: err.response.data });
    });
};

// This action contacts the server to delete an event
export const deleteEvent = (id, userToken) => (dispatch) => {
  dispatch({ type: 'DELETING_EVENT' });
  const config = {
    headers: {
      'access-token': userToken,
    },
  };
  axios.delete(`${apiBaseUrl}/events/${id}`, config)
    .then((response) => {
      dispatch({ type: 'DELETING_EVENT_RESOLVED', payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: 'DELETING_EVENT_REJECTED', payload: err.response.data });
    });
};

export const initializeEdit = id => ({ type: 'INITIALIZE_EDIT', payload: id });

// This action reset the status of a specific process in the  center store to its initial state
export const clearStatus = process => ({ type: 'CLEAR_EVENT_STATUS', payload: process });
