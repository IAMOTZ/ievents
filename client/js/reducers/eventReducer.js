import _ from 'lodash';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  events: [],
  toEdit: null,
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
    deleted: false,
    deletingError: false,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCHING_EVENTS: {
      return {
        ...state,
        status: {
          ...state.status,
          fetching: true,
          fetched: false,
          error: false,
        },
      };
    }
    case actionTypes.FETCHING_EVENTS_RESOLVED: {
      const { events } = action.payload;
      return {
        ...state,
        events,
        status: {
          ...state.status,
          fetching: false,
          fetched: true,
          error: false,
        },
      };
    }
    case actionTypes.FETCHING_TRANSACTIONS_REJECTED: {
      return {
        ...state,
        status: {
          ...state.status,
          fetching: false,
          error: action.payload,
        },
      };
    }
    case actionTypes.ADDING_EVENT: {
      return {
        ...state,
        status: {
          ...state.status,
          adding: true,
          added: false,
          addingError: false,
        },
      };
    }
    case actionTypes.ADDING_EVENT_RESOLVED: {
      return {
        ...state,
        status: {
          ...state.status,
          adding: false,
          added: true,
          addingError: false,
        },
      };
    }
    case actionTypes.ADDING_EVENT_REJECTED: {
      return {
        ...state,
        status: {
          ...state.status,
          adding: false,
          added: false,
          addingError: action.payload,
        },
      };
    }
    case actionTypes.UPDATING_EVENT: {
      return {
        ...state,
        status: {
          ...state.status,
          updating: true,
          updated: false,
          updatingError: false,
        },
      };
    }
    case actionTypes.UPDATING_EVENT_RESOLVED: {
      return {
        ...state,
        status: {
          ...state.status,
          updating: false,
          updated: true,
          updatingError: false,
        },
      };
    }
    case actionTypes.UPDATING_EVENT_REJECTED: {
      return {
        ...state,
        status: {
          ...state.status,
          updating: false,
          updated: false,
          updatingError: action.payload,
        },
      };
    }
    case actionTypes.DELETING_EVENT: {
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
    case actionTypes.DELETING_EVENT_RESOLVED: {
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
    case actionTypes.DELETING_EVENT_REJECTED: {
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
    case actionTypes.INITIALIZE_EDIT: {
      const event = _.find(state.events, { id: Number(action.payload) });
      return {
        ...state,
        toEdit: event,
      };
    }
    case actionTypes.CLEAR_EVENT_STATUS: {
      switch (action.payload) {
        case ('ALL'): {
          return {
            ...state,
            status: initialState.status,
          };
        }
        case ('DELETE'): {
          return {
            ...state,
            status: {
              ...state.status,
              deleting: initialState.status.deleting,
              deleted: initialState.status.deleted,
              deletingError: initialState.status.deletingError,
            },
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
    case actionTypes.CLEAR_USER: {
      // The action is not fired from the event actions but the user action.
      // It would make sure to clear all the event information when the user logs out.
      return initialState;
    }
    default: {
      return state;
    }
  }
};
