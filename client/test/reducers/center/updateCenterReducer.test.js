import { updateCenterReducer as reducer } from '../../../reducers/center';
import * as actionTypes from '../../../actions/actionTypes';

const initialState = {
  centerToUpdate: null,
  centerToTransact: null,
  updatingCenterStarted: false,
  updatingCenterResolved: false,
  updatingCenterError: null,
};

const alterInitialState = newState => ({ ...initialState, ...newState });

describe('Update Center Reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should update the state when a center is chosen to update', () => {
    const centerId = 4;
    expect(reducer(undefined, {
      type: actionTypes.SET_CENTER_TO_UPDATE,
      payload: { centerId },
    })).toEqual(alterInitialState({ centerToUpdate: centerId }));
  });

  it('should update the state when updating center starts', () => {
    expect(reducer(undefined, {
      type: actionTypes.UPDATING_CENTER_STARTED,
    })).toEqual(alterInitialState({ updatingCenterStarted: true }));
  });

  it('should update the state when updating center finishes', () => {
    expect(reducer(undefined, {
      type: actionTypes.UPDATING_CENTER_RESOLVED,
    })).toEqual(alterInitialState({ updatingCenterResolved: true }));
  });

  it('should update the state when updating center returns error', () => {
    const errorMessage = 'there was an error';
    expect(reducer(undefined, {
      type: actionTypes.UPDATING_CENTER_REJECTED,
      payload: { message: errorMessage },
    })).toEqual(alterInitialState({ updatingCenterError: errorMessage }));
  });
  it('should reset the asynchronous process', () => {
    expect(reducer(alterInitialState({ updatingCenterError: 'error' }), {
      type: actionTypes.STOP_ASYNC_UPDATING_CENTER,
    })).toEqual(initialState);
  });
  it('should update the state when a center is set to transact', () => {
    const centerId = 10;
    expect(reducer(undefined, {
      type: actionTypes.SET_CENTER_TO_TRANSACT,
      payload: { centerId },
    })).toEqual(alterInitialState({ centerToTransact: centerId }));
  });
});
