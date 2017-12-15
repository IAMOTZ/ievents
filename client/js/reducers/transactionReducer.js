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
    allowing: false,
    allowed: false,
    allowingError: false,
    canceling: false,
    canceled: false,
    cancelingError: false,
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
    case 'ALLOW_TRANSACTION': {
      return {
        ...state,
        status: {
          ...state.status,
          allowing: true,
          allowed: false,
          allowingError: false,
        }
      }
    }
    case 'ALLOW_TRANSACTION_RESOLVED': {
      return {
        ...state,
        status: {
          ...state.status,
          allowing: false,
          allowed: true,
          allowingError: false,
        }
      }
    }
    case 'ALLOW_TRANSACTION_REJECTED': {
      return {
        ...state,
        status: {
          ...state.status,
          allowing: false,
          allowed: false,
          allowingError: action.payload,
        }
      }
    }
    case 'CANCEL_TRANSACTION': {
      return {
        ...state,
        status: {
          ...state.status,
          canceling: true,
          canceled: false,
          cancelingError: false,
        }
      }
    }
    case 'CANCEL_TRANSACTION_RESOLVED': {
      return {
        ...state,
        status: {
          ...state.status,
          canceling: false,
          canceled: true,
          cancelingError: false,
        }
      }
    }
    case 'CANCEL_TRANSACTION_REJECTED': {
      return {
        ...state,
        status: {
          ...state.status,
          canceling: false,
          canceled: false,
          cancelingError: action.payload,
        }
      }
    }
    case 'DELETE_TRANSACTION': {
      return {
        ...state,
        status: {
          ...state.status,
          deleting: true,
          deleted: false,
          deletingError: false,
        }
      }
    }
    case 'DELETE_TRANSACTION_RESOLVED': {
      return {
        ...state,
        status: {
          ...state.status,
          deleting: false,
          deleted: true,
          deletingError: false,
        }
      }
    }
    case 'DELETE_TRANSACTION_REJECTED': {
      return {
        ...state,
        status: {
          ...state.status,
          deleting: false,
          deleted: false,
          deletingError: action.payload,
        }
      }
    }
    case 'CLEAR_TRANSACTION_STATUS': {
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