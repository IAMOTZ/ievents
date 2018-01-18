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
    case 'FETCHING_TRANSACTIONS': {
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
    case 'FETCHING_TRANSACTIONS_RESOLVED': {
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
    case 'FETCHING_TRANSACTIONS_REJECTED': {
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
    case 'DELETE_TRANSACTION': {
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
    case 'DELETE_TRANSACTION_RESOLVED': {
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
    case 'DELETE_TRANSACTION_REJECTED': {
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
    case 'CLEAR_TRANSACTION_STATUS': {
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
