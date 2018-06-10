import reducer from '../authReducer';
import * as actionTypes from '../../actions/actionTypes';

let previousUser;
const sampleUser = {
  name: 'test',
  email: 'test@gmail.com',
  role: 'user',
  id: 1,
};
const token = 'justATestToken';

const initialState = {
  user: previousUser || {
    name: null,
    email: null,
    role: null,
    id: null,
    token: null,
  },
  status: {
    fetching: false,
    fetched: Boolean(previousUser),
    error: false,
    addingAdmin: false,
    adminAdded: false,
    addingAdminError: false,
    changingPassword: false,
    changingPasswordResolved: false,
    changingPasswordRejected: false,
    deletingUser: false,
    deletingUserResolved: false,
    deletingUserRejected: false,
  },
};
const alterInitialState = (newUser, newStatus) => ({
  user: { ...initialState.user, ...newUser },
  status: { ...initialState.status, ...newStatus },
});

const errorMessage = 'there was an error';
const TOKEN_NAME = 'IEVENTS_USER_TOKEN';

describe('Auth Reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  describe('Signing up a user', () => {
    it('should update the fetching status to true', () => {
      expect(reducer(undefined, {
        type: actionTypes.ADDING_USER,
      })).toEqual(alterInitialState({}, { fetching: true }));
    });
    it('should update the user info and store a token', () => {
      expect(reducer(undefined, {
        type: actionTypes.ADDING_USER_RESOLVED,
        payload: { user: sampleUser, token },
      })).toEqual(alterInitialState({ ...sampleUser, token }, { fetched: true }));
      expect(localStorage.getItem(TOKEN_NAME)).toEqual(token);
    });
    it('should update the error status with some error message', () => {
      expect(reducer(undefined, {
        type: actionTypes.ADDING_USER_REJECTED,
        payload: errorMessage,
      })).toEqual(alterInitialState({}, { error: errorMessage }));
    });
  });

  describe('Logging in a user', () => {
    it('should update the fetching status to true', () => {
      expect(reducer(undefined, {
        type: actionTypes.LOGGING_USER,
      })).toEqual(alterInitialState({}, { fetching: true }));
    });
    it('should update the user info and store a token', () => {
      expect(reducer(undefined, {
        type: actionTypes.LOGGING_USER_RESOLVED,
        payload: { user: sampleUser, token },
      })).toEqual(alterInitialState({ ...sampleUser, token }, { fetched: true }));
      expect(localStorage.getItem(TOKEN_NAME)).toEqual(token);
    });
    it('should update the error status with some error message', () => {
      expect(reducer(undefined, {
        type: actionTypes.LOGGING_USER_REJECTED,
        payload: errorMessage,
      })).toEqual(alterInitialState({}, { error: errorMessage }));
    });
  });

  describe('Signing up an Admin', () => {
    it('should update the addingAdmin status to true', () => {
      expect(reducer(undefined, {
        type: actionTypes.ADDING_ADMIN,
      })).toEqual(alterInitialState({}, { addingAdmin: true }));
    });
    it('should update adminAdded status to true', () => {
      expect(reducer(undefined, {
        type: actionTypes.ADDING_ADMIN_RESOLVED,
      })).toEqual(alterInitialState({}, { adminAdded: true }));
    });
    it('should update the addingAdminError status with some error message', () => {
      expect(reducer(undefined, {
        type: actionTypes.ADDING_ADMIN_REJECTED,
        payload: errorMessage,
      })).toEqual(alterInitialState({}, { addingAdminError: errorMessage }));
    });
  });

  describe('Deleting User', () => {
    it('should update the deletingUser status to true', () => {
      expect(reducer(undefined, {
        type: actionTypes.DELETING_USER,
      })).toEqual(alterInitialState({}, { deletingUser: true }));
    });
    it('should update the deletingUserResolved status to true', () => {
      expect(reducer(undefined, {
        type: actionTypes.DELETING_USER_RESOLVED,
      })).toEqual(alterInitialState({}, { deletingUserResolved: true }));
    });
    it('should update the deletingUserRejected status with some error message', () => {
      expect(reducer(undefined, {
        type: actionTypes.DELETING_USER_REJECTED,
        payload: errorMessage,
      })).toEqual(alterInitialState({}, { deletingUserRejected: errorMessage }));
    });
  });

  describe('Changing Password', () => {
    it('should update the changingPassword status to true', () => {
      expect(reducer(undefined, {
        type: actionTypes.CHANGING_PASSWORD,
      })).toEqual(alterInitialState({}, { changingPassword: true }));
    });
    it('should update the changingPasswordResolved status to true', () => {
      expect(reducer(undefined, {
        type: actionTypes.CHANGING_PASSWORD_RESOLVED,
      })).toEqual(alterInitialState({}, { changingPasswordResolved: true }));
    });
    it('should update the changingPasswordRejected status with some error message', () => {
      expect(reducer(undefined, {
        type: actionTypes.CHANGING_PASSWORD_REJECTRED,
        payload: errorMessage,
      })).toEqual(alterInitialState({}, { changingPasswordRejected: errorMessage }));
    });
  });

  describe('Clearing all or part of the state', () => {
    it('should clear all the error status', () => {
      expect(reducer(alterInitialState({}, { fetching: true, error: errorMessage }), {
        type: actionTypes.CLEAR_USER_STATUS,
        payload: 'ERROR',
      })).toEqual(alterInitialState({}, { fetching: true }));
    });
    it('should clear all the admin related status', () => {
      expect(reducer(alterInitialState({}, { fetching: true, adminAdded: true }), {
        type: actionTypes.CLEAR_USER_STATUS,
        payload: 'ADD_ADMIN',
      })).toEqual(alterInitialState({}, { fetching: true }));
    });
    it('should clear all the changing pasword related status', () => {
      expect(reducer(alterInitialState({}, { fetching: true, changingPassword: true }), {
        type: actionTypes.CLEAR_USER_STATUS,
        payload: 'CHANGING_PASSWORD',
      })).toEqual(alterInitialState({}, { fetching: true }));
    });
    it('should clear all the deleting account related status', () => {
      expect(reducer(alterInitialState({}, { fetching: true, deletingUser: true }), {
        type: actionTypes.CLEAR_USER_STATUS,
        payload: 'DELETING_USER',
      })).toEqual(alterInitialState({}, { fetching: true }));
    });
    it('should not clear any status', () => {
      expect(reducer(alterInitialState({}, { fetching: true }), {
        type: actionTypes.CLEAR_USER_STATUS,
        payload: '',
      })).toEqual(alterInitialState({}, { fetching: true }));
    });
    it('should reinitialize the user state', () => {
      expect(reducer(alterInitialState({ ...sampleUser, token }, { fetched: true }), {
        type: actionTypes.CLEAR_USER,
      })).toEqual(initialState);
      expect(localStorage.getItem(TOKEN_NAME)).toEqual(null);
    });
  });
});
