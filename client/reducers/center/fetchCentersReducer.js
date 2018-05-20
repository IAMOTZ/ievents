import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  centers: [],
  fetchingCenterStarted: false,
  fetchingCenterResolved: false,
  fetchingCenterError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCHING_CENTERS_STARTED: {
      return {
        ...state,
        fetchingCenterStarted: true,
        fetchingCenterResolved: false,
        fetchingCenterError: null,
      };
    }
    case actionTypes.FETCHING_CENTERS_RESOLVED: {
      const { centers } = action.payload;
      return {
        ...state,
        centers,
        fetchingCenterStarted: false,
        fetchingCenterResolved: true,
        fetchingCenterError: null,
      };
    }
    case actionTypes.FETCHING_CENTERS_REJECTED: {
      const { message } = action.payload; // Error message.
      return {
        ...state,
        fetchingCenterStarted: false,
        fetchingCenterResolved: false,
        fetchingCenterError: message,
      };
    }
    case actionTypes.STOP_ASYNC_FETCHING_CENTERS: {
      return {
        ...state,
        fetchingCenterStarted: false,
        fetchingCenterResolved: false,
        fetchingCenterError: null,
      };
    }
    default: {
      return state;
    }
  }
};
