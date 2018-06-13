import { addAdminReducer as reducer } from '../../../reducers/user';
import * as actionTypes from '../../../actions/actionTypes';

const initialState = {
  addingAdminStarted: false,
  addingAdminResolved: false,
  addingAdminError: null,
};

const alterInitialState = newState => ({ ...initialState, ...newState });

describe('Add Admin Reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should update the state when adding admin starts', () => {
    expect(reducer(undefined, {
      type: actionTypes.ADDING_ADMIN_STARTED,
    })).toEqual(alterInitialState({ addingAdminStarted: true }));
  });

  it('should update the state when adding admin finishes', () => {
    expect(reducer(undefined, {
      type: actionTypes.ADDING_ADMIN_RESOLVED,
    })).toEqual(alterInitialState({ addingAdminResolved: true }));
  });

  it('should update the state when adding admin returns error', () => {
    const errorMessage = 'there was an error';
    expect(reducer(undefined, {
      type: actionTypes.ADDING_ADMIN_REJECTED,
      payload: { message: errorMessage },
    })).toEqual(alterInitialState({ addingAdminError: errorMessage }));
  });

  it('should reset the asynchronous process', () => {
    expect(reducer(alterInitialState({ addingAdminResolved: true }), {
      type: actionTypes.STOP_ASYNC_ADDING_ADMIN,
    })).toEqual(initialState);
  });
});
