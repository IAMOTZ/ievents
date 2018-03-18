import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  events: [],
  fetchingEventsStarted: false,
  fetchingEventsResolved: false,
  fetchingEventsError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCHING_EVENTS_STARTED: {
      return {
        ...state,
        fetchingEventsStarted: true,
        fetchingEventsResolved: false,
        fetchingEventsError: null,
      };
    }
    case actionTypes.FETCHING_EVENTS_RESOLVED: {
      const { events } = action.payload;
      return {
        ...state,
        events,
        fetchingEventsStarted: false,
        fetchingEventsResolved: true,
        fetchingEventsError: null,
      };
    }
    case actionTypes.FETCHING_EVENTS_REJECTED: {
      const { message } = action.payload; // Error massage.
      return {
        ...state,
        fetchingEventsStarted: false,
        fetchingEventsResolved: false,
        fetchingEventsError: message,
      };
    }
    case actionTypes.STOP_ASYNC_FETCHING_EVENTS: {
      return {
        ...state,
        fetchingEventsStarted: false,
        fetchingEventsResolved: false,
        fetchingEventsError: null,
      };
    }
    default: {
      return state;
    }
  }
};
