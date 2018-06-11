import { updateEventReducer as reducer } from '../../../reducers/event';
import * as actionTypes from '../../../actions/actionTypes';

const initialState = {
  eventToUpdate: null,
  updatingEventStarted: false,
  updatingEventResolved: false,
  updatingEventError: null,
};

const alterInitialState = newState => ({ ...initialState, ...newState });

describe('Update Event Reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should update the state when an event is chosen to update', () => {
    const eventId = 4;
    expect(reducer(undefined, {
      type: actionTypes.SET_EVENT_TO_UPDATE,
      payload: { eventId },
    })).toEqual(alterInitialState({ eventToUpdate: eventId }));
  });

  it('should update the state when updating event starts', () => {
    expect(reducer(undefined, {
      type: actionTypes.UPDATING_EVENT_STARTED,
    })).toEqual(alterInitialState({ updatingEventStarted: true }));
  });

  it('should update the state when updating event finishes', () => {
    expect(reducer(undefined, {
      type: actionTypes.UPDATING_EVENT_RESOLVED,
    })).toEqual(alterInitialState({ updatingEventResolved: true }));
  });

  it('should update the state when updating event returns error', () => {
    const errorMessage = 'there was an error';
    expect(reducer(undefined, {
      type: actionTypes.UPDATING_EVENT_REJECTED,
      payload: { message: errorMessage },
    })).toEqual(alterInitialState({ updatingEventError: errorMessage }));
  });

  it('should reset the asynchronous process', () => {
    expect(reducer(alterInitialState({ updatingEventError: 'error' }), {
      type: actionTypes.STOP_ASYNC_UPDATING_EVENT,
    })).toEqual(initialState);
  });
});
