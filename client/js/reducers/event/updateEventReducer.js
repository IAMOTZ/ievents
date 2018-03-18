import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  eventToUpdate: null,
  updatingEventStarted: false,
  updatingEventResolved: false,
  updatingEventError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATING_EVENT_STARTED: {
      return {
        ...state,
        updatingEventStarted: true,
        updatingEventResolved: false,
        updatingEventError: null,
      };
    }
    case actionTypes.UPDATING_EVENT_RESOLVED: {
      return {
        ...state,
        updatingEventStarted: false,
        updatingEventResolved: true,
        updatingEventError: null,
      };
    }
    case actionTypes.UPDATING_EVENT_REJECTED: {
      const { message } = action.payload; // Error message.
      return {
        ...state,
        updatingEventStarted: false,
        updatingEventResolved: false,
        updatingEventError: message,
      };
    }
    case actionTypes.STOP_ASYNC_UPDATING_EVENT: {
      return {
        ...state,
        updatingEventStarted: false,
        updatingEventResolved: false,
        updatingEventError: null,
      };
    }
    case actionTypes.SET_EVENT_TO_UPDATE: {
      const { eventId } = action.payload;
      return {
        ...state,
        eventToUpdate: Number(eventId),
      };
    }
    default: {
      return state;
    }
  }
};
