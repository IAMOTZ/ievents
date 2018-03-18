import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  centerToBook: null,
  addingEventStarted: false,
  addingEventResolved: false,
  addingEventError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADDING_EVENT_STARTED: {
      return {
        ...state,
        addingEventStarted: true,
        addingEventResolved: false,
        addingEventError: null,
      };
    }
    case actionTypes.ADDING_EVENT_RESOLVED: {
      return {
        ...state,
        addingEventStarted: false,
        addingEventResolved: true,
        addingEventError: null,
      };
    }
    case actionTypes.ADDING_EVENT_REJECTED: {
      const { message } = action.payload; // Error message.
      return {
        ...state,
        addingEventStarted: false,
        addingEventResolved: false,
        addingEventError: message,
      };
    }
    case actionTypes.SET_CENTER_TO_BOOK: {
      const { centerId } = action.payload;
      return {
        ...state,
        centerToBook: centerId,
      };
    }
    case actionTypes.STOP_ASYNC_ADDING_EVENT: {
      return {
        ...state,
        addingEventStarted: false,
        addingEventResolved: false,
        addingEventError: null,
      };
    }
    default: {
      return state;
    }
  }
};
