import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  deletingEventStarted: false,
  deletingEventResolved: false,
  deletingEventError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DELETING_EVENT_STARTED: {
      return {
        deletingEventStarted: true,
        deletingEventResolved: false,
        deletingEventError: null,
      };
    }
    case actionTypes.DELETING_EVENT_RESOLVED: {
      return {
        deletingEventStarted: false,
        deletingEventResolved: true,
        deletingEventError: null,
      };
    }
    case actionTypes.DELETING_EVENT_REJECTED: {
      const { message } = action.payload; // Error message.
      return {
        deletingEventStarted: false,
        deletingEventResolved: false,
        deletingEventError: message,
      };
    }
    case actionTypes.STOP_ASYNC_DELETING_EVENT: {
      return {
        deletingEventStarted: false,
        deletingEventResolved: false,
        deletingEventError: null,
      };
    }
    default: {
      return state;
    }
  }
};
