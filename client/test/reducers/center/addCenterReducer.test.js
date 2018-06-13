import { addCenterReducer as reducer } from '../../../reducers/center';
import * as actionTypes from '../../../actions/actionTypes';

const initialState = {
  addingCenterStarted: false,
  addingCenterResolved: false,
  addingCenterError: null,
};

const alterInitialState = newState => ({ ...initialState, ...newState });

describe('Add Center Reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should update addingCenterStarted value to true', () => {
    expect(reducer(undefined, {
      type: actionTypes.ADDING_CENTER_STARTED,
    })).toEqual(alterInitialState({ addingCenterStarted: true }));
  });

  it('should update addingCenterResolved value to true', () => {
    expect(reducer(undefined, {
      type: actionTypes.ADDING_CENTER_RESOLVED,
    })).toEqual(alterInitialState({ addingCenterResolved: true }));
  });

  it('should update addingCenterError value some error message', () => {
    const errorMessage = 'there was an error';
    expect(reducer(undefined, {
      type: actionTypes.ADDING_CENTER_REJECTED,
      payload: { message: errorMessage },
    })).toEqual(alterInitialState({ addingCenterError: errorMessage }));
  });

  it('should reset the asynchronous process', () => {
    expect(reducer(alterInitialState({ addingCenterStarted: true }), {
      type: actionTypes.STOP_ASYNC_ADDING_CENTER,
    })).toEqual(initialState);
  });
});
