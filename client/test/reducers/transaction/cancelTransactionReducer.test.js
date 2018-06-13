import { cancelTransactionReducer as reducer } from '../../../reducers/transaction';
import * as actionTypes from '../../../actions/actionTypes';

const initialState = {
  cancelingTransactionStarted: false,
  cancelingTransactionResolved: false,
  cancelingTransactionError: null,
};

const alterInitialState = newState => ({ ...initialState, ...newState });

describe('Cancel Transaction Reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should update the state canceling transaction starts', () => {
    expect(reducer(undefined, {
      type: actionTypes.CANCELING_TRANSACTION_STARTED,
    })).toEqual(alterInitialState({ cancelingTransactionStarted: true }));
  });

  it('should update the state when canceling transaction finishes', () => {
    expect(reducer(undefined, {
      type: actionTypes.CANCELING_TRANSACTION_RESOLVED,
    })).toEqual(alterInitialState({ cancelingTransactionResolved: true }));
  });

  it('should update the state when canceling transaction returns error', () => {
    const errorMessage = 'there was an error';
    expect(reducer(undefined, {
      type: actionTypes.CANCELING_TRANSACTION_REJECTED,
      payload: { message: errorMessage },
    })).toEqual(alterInitialState({ cancelingTransactionError: errorMessage }));
  });

  it('should reset the asynchronous process', () => {
    expect(reducer(alterInitialState({ cancelingTransactionResolved: 'error' }), {
      type: actionTypes.STOP_ASYNC_CANCELING_TRANSACTION,
    })).toEqual(initialState);
  });
});
