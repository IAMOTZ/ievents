import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  centerToUpdate: null,
  updatingCenterStarted: false,
  updatingCenterResolved: false,
  updatingCenterError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATING_CENTER_STARTED: {
      return {
        ...state,
        updatingCenterStarted: true,
        updatingCenterResolved: false,
        updatingCenterError: null,
      };
    }
    case actionTypes.UPDATING_CENTER_RESOLVED: {
      return {
        ...state,
        updatingCenterStarted: false,
        updatingCenterResolved: true,
        updatingCenterError: null,
      };
    }
    case actionTypes.UPDATING_CENTER_REJECTED: {
      const { message } = action.payload; // Error message.
      return {
        ...state,
        updatingCenterStarted: false,
        updatingCenterResolved: false,
        updatingCenterError: message,
      };
    }
    case actionTypes.STOP_ASYNC_UPDATING_CENTER: {
      return {
        ...state,
        updatingCenterStarted: false,
        updatingCenterResolved: false,
        updatingCenterError: null,
      };
    }
    case actionTypes.SET_CENTER_TO_UPDATE: {
      const centerId = action.payload;
      return {
        ...state,
        centerToUpdate: Number(centerId),
      };
    }
    default: {
      return state;
    }
  }
};
