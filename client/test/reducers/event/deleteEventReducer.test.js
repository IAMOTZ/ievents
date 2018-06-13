import { deleteEventReducer as reducer } from '../../../reducers/event';
import * as actionTypes from '../../../actions/actionTypes';

const initialState = {
  deletingEventStarted: false,
  deletingEventResolved: false,
  deletingEventError: null,
};

const alterInitialState = newState => ({ ...initialState, ...newState });

describe('Delete Event Reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should update the state when deleting event starts', () => {
    expect(reducer(undefined, {
      type: actionTypes.DELETING_EVENT_STARTED,
    })).toEqual(alterInitialState({ deletingEventStarted: true }));
  });

  it('should update the state when deleting event finishes', () => {
    expect(reducer(undefined, {
      type: actionTypes.DELETING_EVENT_RESOLVED,
    })).toEqual(alterInitialState({ deletingEventResolved: true }));
  });

  it('should update the state when deleting event returns error', () => {
    const errorMessage = 'there was an error';
    expect(reducer(undefined, {
      type: actionTypes.DELETING_EVENT_REJECTED,
      payload: { message: errorMessage },
    })).toEqual(alterInitialState({ deletingEventError: errorMessage }));
  });

  it('should reset the asynchronous process', () => {
    expect(reducer(alterInitialState({ deletingEventError: 'error' }), {
      type: actionTypes.STOP_ASYNC_DELETING_EVENT,
    })).toEqual(initialState);
  });
});
