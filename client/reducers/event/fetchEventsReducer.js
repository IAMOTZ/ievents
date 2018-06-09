import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  events: [],
  pagination: {
    limit: 12,
    offset: 0,
    currentCount: 0,
    totalcount: 0,
  },
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
      const { events, paginationInfo } = action.payload;
      const {
        limit, offset, currentCount, totalCount
      } = paginationInfo;
      const pagination = {
        limit, offset, currentCount, totalCount
      };
      return {
        ...state,
        events,
        pagination,
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
