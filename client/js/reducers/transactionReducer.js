import * as actionTypes from '../actions/actionTypes';

const initialState = {
  centers: [],
  status: {
    fetching: false,
    fetched: false,
    fetchingError: false,
    deleting: false,
    daleted: false,
    deletingError: false,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCHING_TRANSACTIONS: {
      return {
        ...state,
        status: {
          ...state.status,
          fetching: true,
          fetched: false,
          fetchingError: false,
        },
      };
    }
    case actionTypes.FETCHING_TRANSACTIONS_RESOLVED: {
      return {
        ...state,
        centers: action.payload,
        status: {
          ...state.status,
          fetching: false,
          fetched: true,
          fetchingError: false,
        },
      };
    }
    case actionTypes.FETCHING_TRANSACTIONS_REJECTED: {
      return {
        ...state,
        status: {
          ...state.status,
          fetching: false,
          fetched: false,
          fetchingError: action.payload,
        },
      };
    }
    case actionTypes.DELETING_TRANSACTION: {
      return {
        ...state,
        status: {
          ...state.status,
          deleting: true,
          deleted: false,
          deletingError: false,
        },
      };
    }
    case actionTypes.DELETING_TRANSACTION_RESOLVED: {
      return {
        ...state,
        status: {
          ...state.status,
          deleting: false,
          deleted: true,
          deletingError: false,
        },
      };
    }
    case actionTypes.DELETING_TRANSACTION_REJECTED: {
      return {
        ...state,
        status: {
          ...state.status,
          deleting: false,
          deleted: false,
          deletingError: action.payload,
        },
      };
    }
    case actionTypes.CLEAR_TRANSACTION_STATUS: {
      switch (action.payload) {
        case ('ALL'): {
          return {
            ...state,
            status: initialState.status,
          };
        }
        default: {
          return {
            ...state,
            status: {
              ...state.status,
            },
          };
        }
      }
    }
    default: {
      return state;
    }
  }
};
