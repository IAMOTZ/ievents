import { fetchCentersReducer as reducer } from '../../../reducers/center';
import * as actionTypes from '../../../actions/actionTypes';

const initialState = {
  centers: [],
  pagination: {
    limit: 12,
    offset: 0,
    currentCount: 0,
    totalcount: 0,
  },
  fetchingCenterStarted: false,
  fetchingCenterResolved: false,
  fetchingCenterError: null,
};

const sampleCenters = [
  // The real center object contains more attributes
  { id: 1, name: 'center1' },
  { id: 2, name: 'center2' },
  { id: 3, name: 'center2' },
  { id: 4, name: 'center4' },
];

const samplePaginationInfo = {
  limit: 12,
  offset: 20,
  currentCount: 12,
  totalCount: 32,
};

const alterInitialState = newState => ({ ...initialState, ...newState });

describe('Fetch Centers Reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should update the state when fetching centers starts', () => {
    expect(reducer(undefined, {
      type: actionTypes.FETCHING_CENTERS_STARTED,
    })).toEqual(alterInitialState({ fetchingCenterStarted: true }));
  });

  it('should update the state when fetching centers finishes', () => {
    expect(reducer(undefined, {
      type: actionTypes.FETCHING_CENTERS_RESOLVED,
      payload: { centers: sampleCenters, paginationInfo: samplePaginationInfo },
    })).toEqual(alterInitialState({
      centers: sampleCenters, pagination: samplePaginationInfo, fetchingCenterResolved: true
    }));
  });

  it('should update the state when fetching centers returns error', () => {
    const errorMessage = 'there was an error';
    expect(reducer(undefined, {
      type: actionTypes.FETCHING_CENTERS_REJECTED,
      payload: { message: errorMessage },
    })).toEqual(alterInitialState({ fetchingCenterError: errorMessage }));
  });

  it('should reset the asynchronous process', () => {
    expect(reducer(alterInitialState({ fetchingCenterResolved: true }), {
      type: actionTypes.STOP_ASYNC_FETCHING_CENTERS,
    })).toEqual(initialState);
  });
});
