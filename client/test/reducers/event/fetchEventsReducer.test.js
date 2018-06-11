import { fetchEventsReducer as reducer } from '../../../reducers/event';
import * as actionTypes from '../../../actions/actionTypes';

const initialState = {
  events: [],
  pagination: {
    limit: 12,
    offset: 0,
    currentCount: 0,
    totalcount: 0,
  },
  fetchingEventsStarted: false,
  fetchingEventsResolved: false,
  fetchingEventsError: null,
};

const sampleEvents = [
  // The real event object contains more attributes
  { id: 1, title: 'event1' },
  { id: 2, title: 'event2' },
  { id: 3, title: 'event3' },
  { id: 4, title: 'event4' },
];

const samplePaginationInfo = {
  limit: 12,
  offset: 20,
  currentCount: 12,
  totalCount: 32,
};

const alterInitialState = newState => ({ ...initialState, ...newState });

describe('Fetching Events Reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should update the state when fetching events starts', () => {
    expect(reducer(undefined, {
      type: actionTypes.FETCHING_EVENTS_STARTED,
    })).toEqual(alterInitialState({ fetchingEventsStarted: true }));
  });

  it('should update the state when fetching events finishes', () => {
    expect(reducer(undefined, {
      type: actionTypes.FETCHING_EVENTS_RESOLVED,
      payload: { events: sampleEvents, paginationInfo: samplePaginationInfo },
    })).toEqual(alterInitialState({
      events: sampleEvents, pagination: samplePaginationInfo, fetchingEventsResolved: true
    }));
  });

  it('should update the state when fetching events returns error', () => {
    const errorMessage = 'there was an error';
    expect(reducer(undefined, {
      type: actionTypes.FETCHING_EVENTS_REJECTED,
      payload: { message: errorMessage },
    })).toEqual(alterInitialState({ fetchingEventsError: errorMessage }));
  });

  it('should reset the asynchronous process', () => {
    expect(reducer(alterInitialState({ fetchingEventsStarted: true }), {
      type: actionTypes.STOP_ASYNC_FETCHING_EVENTS,
    })).toEqual(initialState);
  });
});

