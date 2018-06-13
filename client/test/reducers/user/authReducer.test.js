import jwt from 'jsonwebtoken';
import { authReducer as reducer } from '../../../reducers/user';
import * as actionTypes from '../../../actions/actionTypes';

const initialState = {
  user: null,
  loggingUserStarted: false,
  loggingUserResolved: false,
  loggingUserError: null,
};

const sampleUserData = { email: 'tester@gmail.com' }; // A real user has more data
const JWTSecrete = 'testToken';
const token = jwt.sign(sampleUserData, JWTSecrete);
const decodedToken = jwt.verify(token, JWTSecrete);

const alterInitialState = newState => ({ ...initialState, ...newState });

describe('Authentication Reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  describe('Logging a user', () => {
    it('should update the state when logging user starts', () => {
      expect(reducer(undefined, {
        type: actionTypes.LOGGING_USER_STARTED,
      })).toEqual(alterInitialState({ loggingUserStarted: true }));
    });

    it('should update the state when logging user finishes', () => {
      expect(reducer(undefined, {
        type: actionTypes.LOGGING_USER_RESOLVED,
        payload: { token }
      })).toEqual(alterInitialState({
        loggingUserResolved: true, user: { ...decodedToken, token }
      }));
    });

    it('should update the state when logging user returns error', () => {
      const errorMessage = 'there was an error';
      expect(reducer(undefined, {
        type: actionTypes.LOGGING_USER_REJECTED,
        payload: { message: errorMessage },
      })).toEqual(alterInitialState({ loggingUserError: errorMessage }));
    });

    it('should reset the asynchronous process', () => {
      expect(reducer(alterInitialState({ loggingUserStarted: true }), {
        type: actionTypes.STOP_ASYNC_LOGGING_USER,
      })).toEqual(initialState);
    });
  });

  describe('Adding a user', () => {
    it('should update the state when adding user starts', () => {
      expect(reducer(undefined, {
        type: actionTypes.ADDING_USER_STARTED,
      })).toEqual(alterInitialState({ loggingUserStarted: true }));
    });

    it('should update the state when adding user finishes', () => {
      expect(reducer(undefined, {
        type: actionTypes.ADDING_USER_RESOLVED,
        payload: { token }
      })).toEqual(alterInitialState({
        loggingUserResolved: true, user: { ...decodedToken, token }
      }));
    });

    it('should update the state when adding user returns error', () => {
      const errorMessage = 'there was an error';
      expect(reducer(undefined, {
        type: actionTypes.ADDING_USER_REJECTED,
        payload: { message: errorMessage },
      })).toEqual(alterInitialState({ loggingUserError: errorMessage }));
    });

    it('should reset the asynchronous process', () => {
      expect(reducer(alterInitialState({ loggingUserStarted: true }), {
        type: actionTypes.STOP_ASYNC_ADDING_USER,
      })).toEqual(initialState);
    });
  });

  describe('Logging out a user', () => {
    it('should reset the state', () => {
      expect(reducer(undefined, {
        type: actionTypes.LOG_OUT
      })).toEqual(initialState);
    });
  });
});
