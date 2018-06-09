import axios from 'axios';
import * as actionTypes from './actionTypes';

const apiBaseUrl = process.env.API_BASE_URL;

/**
 * A Thunk modeled action that eventually retrieves all the events of a user.
 * @param {String} userToken The token of the user.
 * @param {Object} pagination Description of how to paginate the request.
 * @returns {Function} Actions wrapped in a function.
 */
export const getAllEvents = (userToken, pagination = {}) => (dispatch) => {
  dispatch({ type: actionTypes.FETCHING_EVENTS_STARTED });
  const config = {
    headers: {
      'access-token': userToken,
    },
  };
  axios.get(`${apiBaseUrl}/events/?limit=${pagination.limit}&&offset=${pagination.offset}`, config)
    .then((response) => {
      dispatch({ type: actionTypes.FETCHING_EVENTS_RESOLVED, payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: actionTypes.FETCHING_EVENTS_REJECTED, payload: err.response.data });
    });
};

/**
 * A Thunk modeled action that eventually adds an event.
 * @param {Object} eventDetails The details of the event to add.
 * @param {String} userToken The token of the user.
 * @returns {Function} Actions wrapped in a function.
 */
export const addEvent = (eventDetails, userToken) => (dispatch) => {
  dispatch({ type: actionTypes.ADDING_EVENT_STARTED });
  const config = {
    headers: {
      'access-token': userToken,
    },
  };
  axios.post(`${apiBaseUrl}/events`, eventDetails, config)
    .then((response) => {
      dispatch({ type: actionTypes.ADDING_EVENT_RESOLVED, payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: actionTypes.ADDING_EVENT_REJECTED, payload: err.response.data });
    });
};

/**
 * A Thunk modeled action that eventually updates an event.
 * @param {Number} id The event ID.
 * @param {Object} eventDetails The details of the event to be updated.
 * @param {String} userToken The token of the user.
 * @returns {Function} Actions wrapped in a function.
 */
export const updateEvent = (id, eventDetails, userToken) => (dispatch) => {
  dispatch({ type: actionTypes.UPDATING_EVENT_STARTED });
  const config = {
    headers: {
      'access-token': userToken,
    },
  };
  axios.put(`${apiBaseUrl}/events/${id}`, eventDetails, config)
    .then((response) => {
      dispatch({ type: actionTypes.UPDATING_EVENT_RESOLVED, payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: actionTypes.UPDATING_EVENT_REJECTED, payload: err.response.data });
    });
};

/**
 * A Thunk modeled action that eventually deletes an event.
 * @param {Number} id The event ID.
 * @param {String} userToken The token of the user.
 * @returns {Function} Actions wrapped in a function.
 */
export const deleteEvent = (id, userToken) => (dispatch) => {
  dispatch({ type: actionTypes.DELETING_EVENT_STARTED });
  const config = {
    headers: {
      'access-token': userToken,
    },
  };
  axios.delete(`${apiBaseUrl}/events/${id}`, config)
    .then((response) => {
      dispatch({ type: actionTypes.DELETING_EVENT_RESOLVED, payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: actionTypes.DELETING_EVENT_REJECTED, payload: err.response.data });
    });
};

/**
 * It informs the reducer about an event that is about to be updated/edited.
 * @param {Number} eventId The event ID.
 * @returns {Object} The action.
 */
export const setEventToUpdate = eventId => (
  { type: actionTypes.SET_EVENT_TO_UPDATE, payload: { eventId } }
);

/**
 * It informs the reducer about a center that is about to be booked.
 * @param {Number} centerId The ID of the center to be booked.
 * @returns {Object} The action.
 */
export const setCenterToBook = centerId => (
  { type: actionTypes.SET_CENTER_TO_BOOK, payload: { centerId } }
);
