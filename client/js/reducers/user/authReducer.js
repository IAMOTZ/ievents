import jwtDecode from 'jwt-decode';
import * as actionTypes from '../../actions/actionTypes';

const TOKEN_NAME = 'IEVENTS_USER_TOKEN';
let previousUser;
let previousToken;
try {
  previousToken = localStorage.getItem(TOKEN_NAME);
  previousUser = jwtDecode(previousToken);
  previousUser = Object.assign({}, previousUser, { token: previousToken });
} catch (e) { }

const initailSatate = {
  user: previousUser || null,
  loggingUserStarted: false,
  loggingUserResolved: false,
  loggingUserError: null,
};

export default (state = initailSatate, action) => {
  switch (action.type) {
    case actionTypes.LOGGING_USER_STARTED: {
      return {
        ...state,
        loggingUserStarted: true,
        loggingUserResolved: false,
        loggingUserError: null,
      };
    }
    case actionTypes.LOGGING_USER_RESOLVED: {
      const { user } = action.payload;
      user.token = action.payload.token;
      localStorage.setItem(TOKEN_NAME, action.payload.token);
      return {
        ...state,
        user,
        loggingUserStarted: false,
        loggingUserResolved: true,
        loggingUserError: null,
      };
    }
    case actionTypes.LOGGING_USER_REJECTED: {
      const { message } = action.payload; // Error message.
      return {
        ...state,
        loggingUserStarted: false,
        loggingUserResolved: false,
        loggingUserError: message,
      };
    }
    case actionTypes.ADDING_USER_STARTED: {
      return {
        ...state,
        loggingUserStarted: true,
        loggingUserResolved: false,
        loggingUserError: null,
      };
    }
    case actionTypes.ADDING_USER_RESOLVED: {
      const { user } = action.payload;
      localStorage.setItem(TOKEN_NAME, action.payload.token);
      return {
        ...state,
        user,
        loggingUserStarted: false,
        loggingUserResolved: true,
        loggingUserError: null,
      };
    }
    case actionTypes.ADDING_USER_REJECTED: {
      const { message } = action.payload; // Error message.
      return {
        ...state,
        loggingUserStarted: false,
        loggingUserResolved: false,
        loggingUserError: message,
      };
    }
    case actionTypes.LOG_OUT: {
      localStorage.removeItem(TOKEN_NAME);
      return {
        user: null,
        loggingUserStarted: false,
        loggingUserResolved: false,
        loggingUserError: null,
      };
    }
    case actionTypes.STOP_ASYNC_LOGGING_USER: {
      return {
        ...state,
        loggingUserStarted: false,
        loggingUserError: null,
      };
    }
    case actionTypes.STOP_ASYNC_ADDING_USER: {
      return {
        ...state,
        loggingUserStarted: false,
        loggingUserError: null,
      };
    }
    default: {
      return state;
    }
  }
};
