import jwt from 'jsonwebtoken';
import * as actionTypes from '../../actions/actionTypes';

const TOKEN_NAME = 'IEVENTS_USER_TOKEN';
let previousUser;
const previousToken = localStorage.getItem(TOKEN_NAME);
if (previousToken) {
  try {
    previousUser = jwt.verify(previousToken, process.env.JSON_WEB_TOKEN_SECRETE);
    previousUser = { ...previousUser, token: previousToken };
  } catch (e) {
    previousUser = null;
  }
}

const initialState = {
  user: previousUser || null,
  loggingUserStarted: false,
  loggingUserResolved: Boolean(previousUser),
  loggingUserError: null,
};

export default (state = initialState, action) => {
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
      const { token } = action.payload;
      localStorage.setItem(TOKEN_NAME, token);
      let user = jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRETE || 'testToken');
      user = { ...user, token };
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
      const { token } = action.payload;
      localStorage.setItem(TOKEN_NAME, token);
      let user = jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRETE || 'testToken');
      user = { ...user, token };
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
