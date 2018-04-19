import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  changingPasswordStarted: false,
  changingPasswordResolved: false,
  changingPasswordError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGING_PASSWORD_STARTED: {
      return {
        changingPasswordStarted: true,
        changingPasswordResolved: false,
        changingPasswordError: null,
      };
    }
    case actionTypes.CHANGING_PASSWORD_RESOLVED: {
      return {
        changingPasswordStarted: false,
        changingPasswordResolved: true,
        changingPasswordError: null,
      };
    }
    case actionTypes.CHANGING_PASSWORD_REJECTRED: {
      const { message } = action.payload; // Error message.
      return {
        changingPasswordStarted: false,
        changingPasswordResolved: false,
        changingPasswordError: message,
      };
    }
    case actionTypes.STOP_ASYNC_CHANGING_PASSWORD: {
      return {
        changingPasswordStarted: false,
        changingPasswordResolved: false,
        changingPasswordError: null,
      };
    }
    default: {
      return state;
    }
  }
};
