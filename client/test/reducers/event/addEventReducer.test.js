import { addEventReducer as reducer } from '../../../reducers/event';
import * as actionTypes from '../../../actions/actionTypes';

const initialState = {
  centerToBook: null,
  addingEventStarted: false,
  addingEventResolved: false,
  addingEventError: null,
};

const alterInitialState = newState => ({ ...initialState, ...newState });

describe('Add Event Reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should update the state when adding event starts', () => {
    expect(reducer(undefined, {
      type: actionTypes.ADDING_EVENT_STARTED,
    })).toEqual(alterInitialState({ addingEventStarted: true }));
  });

  it('should update the state when adding event finishes', () => {
    expect(reducer(undefined, {
      type: actionTypes.ADDING_EVENT_RESOLVED,
    })).toEqual(alterInitialState({ addingEventResolved: true }));
  });

  it('should update the state when adding event returns error', () => {
    const errorMessage = 'there was an error';
    expect(reducer(undefined, {
      type: actionTypes.ADDING_EVENT_REJECTED,
      payload: { message: errorMessage },
    })).toEqual(alterInitialState({ addingEventError: errorMessage }));
  });

  it('shoud update the state when a center is set to be booked', () => {
    const centerId = 5;
    expect(reducer(undefined, {
      type: actionTypes.SET_CENTER_TO_BOOK,
      payload: { centerId }
    })).toEqual(alterInitialState({ centerToBook: centerId }));
  });

  it('should reset the asynchronous process', () => {
    expect(reducer(alterInitialState({ addingEventStarted: true }), {
      type: actionTypes.STOP_ASYNC_ADDING_EVENT,
    })).toEqual(initialState);
  });
});
