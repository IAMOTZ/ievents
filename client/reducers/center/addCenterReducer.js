import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  addingCenterStarted: false,
  addingCenterResolved: false,
  addingCenterError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADDING_CENTER_STARTED: {
      return {
        addingCenterStarted: true,
        addingCenterResolved: false,
        addingCenterError: null,
      };
    }
    case actionTypes.ADDING_CENTER_RESOLVED: {
      return {
        addingCenterStarted: false,
        addingCenterResolved: true,
        addingCenterError: null,
      };
    }
    case actionTypes.ADDING_CENTER_REJECTED: {
      const { message } = action.payload; // Error message.
      return {
        addingCenterStarted: false,
        addingCenterResolved: false,
        addingCenterError: message,
      };
    }
    case actionTypes.STOP_ASYNC_ADDING_CENTER: {
      return {
        addingCenterStarted: false,
        addingCenterResolved: false,
        addingCenterError: null,
      };
    }
    default: {
      return state;
    }
  }
};
