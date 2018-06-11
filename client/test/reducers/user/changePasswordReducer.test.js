import { changePasswordReducer as reducer } from '../../../reducers/user';
import * as actionTypes from '../../../actions/actionTypes';

const initialState = {
  changingPasswordStarted: false,
  changingPasswordResolved: false,
  changingPasswordError: null,
};

const alterInitialState = newState => ({ ...initialState, ...newState });

describe('Change Password Reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should update the state when changing password starts', () => {
    expect(reducer(undefined, {
      type: actionTypes.CHANGING_PASSWORD_STARTED,
    })).toEqual(alterInitialState({ changingPasswordStarted: true }));
  });

  it('should update the state when changing password finishes', () => {
    expect(reducer(undefined, {
      type: actionTypes.CHANGING_PASSWORD_RESOLVED,
    })).toEqual(alterInitialState({ changingPasswordResolved: true }));
  });

  it('should update the state when changing password returns error', () => {
    const errorMessage = 'there was an error';
    expect(reducer(undefined, {
      type: actionTypes.CHANGING_PASSWORD_REJECTRED,
      payload: { message: errorMessage },
    })).toEqual(alterInitialState({ changingPasswordError: errorMessage }));
  });

  it('should reset the asynchronous process', () => {
    expect(reducer(alterInitialState({ changingPasswordResolved: false }), {
      type: actionTypes.STOP_ASYNC_CHANGING_PASSWORD,
    })).toEqual(initialState);
  });
});
