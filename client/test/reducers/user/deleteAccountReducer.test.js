import { deleteAccountReducer as reducer } from '../../../reducers/user';
import * as actionTypes from '../../../actions/actionTypes';

const initialState = {
  deletingAccountStarted: false,
  deletingAccountResolved: false,
  deletingAccountError: null,
};

const alterInitialState = newState => ({ ...initialState, ...newState });

describe('Delete Account Reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should update the state when deleting account starts', () => {
    expect(reducer(undefined, {
      type: actionTypes.DELETING_ACCOUNT_STARTED,
    })).toEqual(alterInitialState({ deletingAccountStarted: true }));
  });

  it('should update the state when deleting account finishes', () => {
    expect(reducer(undefined, {
      type: actionTypes.DELETING_ACCOUNT_RESOLVED,
    })).toEqual(alterInitialState({ deletingAccountResolved: true }));
  });

  it('should update the state when deleting account returns error', () => {
    const errorMessage = 'there was an error';
    expect(reducer(undefined, {
      type: actionTypes.DELETING_ACCOUNT_REJECTED,
      payload: { message: errorMessage },
    })).toEqual(alterInitialState({ deletingAccountError: errorMessage }));
  });

  it('should reset the asynchronous process', () => {
    expect(reducer(alterInitialState({ deletingAccountError: 'error' }), {
      type: actionTypes.STOP_ASYNC_DELETING_ACCOUNT,
    })).toEqual(initialState);
  });
});
