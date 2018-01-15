import axios from 'axios';

const apiBaseUrl = process.env.API_BASE_URL;

/**
 * A Thunk modeled action that eventually retrieves all the events of a user.
 * @param {String} userToken The token of the user.
 * @returns {Function}
 */
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

/**
 * A Thunk modeled action that eventually adds an event.
 * @param {Object} eventDetails The details of the event to add.
 * @param {String} userToken The token of the user.
 * @returns {Function}
 */
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

/**
 * A Thunk modeled action that eventually updates an event.
 * @param {Number} id The event ID.
 * @param {Object} eventDetails The details of the event to be updated.
 * @param {String} userToken The token of the user.
 * @returns {Function}
 */
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

/**
 * A Thunk modeled action that eventually deletes an event.
 * @param {Number} id The event ID.
 * @param {String} userToken The token of the user.
 * @returns {Function}
 */
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

/**
 * It informs a reducer to update the store about an event that is to be edited.
 * @param {Number} id The ID of the event.
 * @returns {Object}
 */
export const initializeEdit = id => ({ type: 'INITIALIZE_EDIT', payload: id });

/**
 * It informs a reducer to Clear the status variables tracking a particular event process.
 * @param {String} process The process to be cleared.
 * @returns {Object}
 */
export const clearStatus = process => ({ type: 'CLEAR_EVENT_STATUS', payload: process });
