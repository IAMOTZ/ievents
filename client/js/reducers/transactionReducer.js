let initialState = {
  centers: [],
  status: {
    fetching: false,
    fetched: false,
    fetchingError: false,
    adding: false,
    added: false,
    addingError: false,
    updating: false,
    updated: false,
    updatingError: false,
    deleting: false,
    daleted: false,
    deletingError: false,
  },
}

export default (state = initialState, action) => {
  switch(action.type) {
    case 'FETCHING_TRANSACTIONS': {
      return {
        ...state,
        status: {
          ...state.status,
          fetching: true,
          fetched: false,
          fetchingError: false,
        }
      }
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
        }
      }
    }
    case 'FETCHING_TRANSACTIONS_REJECTED': {
      return {
        ...state,
        status: {
          ...state.status,
          fetching: false,
          fetched: false,
          fetchingError: action.payload,
        }
      }
    }
    case 'CLEAR_STATUS': {
      return {
        ...state,
        status: initialState.status,
      }
    }
    default: {
      return state;
    }
  }
}