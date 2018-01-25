import _ from 'lodash';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  centers: [],
  modalContent: null,
  toEdit: null,
  toBook: null,
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
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCHING_CENTERS: {
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
    case actionTypes.FETCHING_CENTERS_RESOLVED: {
      const { centers } = action.payload;
      return {
        ...state,
        centers,
        status: {
          ...state.status,
          fetching: false,
          fetched: true,
          fetchingError: false,
        },
      };
    }
    case actionTypes.FETCHING_CENTERS_REJECTED: {
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
    case actionTypes.ADDING_CENTER: {
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
    case actionTypes.ADDING_CENTER_RESOLVED: {
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
    case actionTypes.ADDING_CENTER_REJECTED: {
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
    case actionTypes.UPDATING_CENTER: {
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
    case actionTypes.UPDATING_CENTER_RESOLVED: {
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
    case actionTypes.UPDATING_CENTER_REJECTED: {
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
    case actionTypes.INITIALIZE_EDIT: {
      const center = _.find(state.centers, { id: Number(action.payload) });
      return {
        ...state,
        toEdit: center,
      };
    }
    case actionTypes.SHOW_CENTER_MODAL: {
      const modalContent = _.find(state.centers, { id: Number(action.payload) });
      return {
        ...state,
        modalContent,
      };
    }
    case actionTypes.BOOK: {
      return {
        ...state,
        toBook: action.payload,
      };
    }
    case actionTypes.CLEAR_CENTER_STATUS: {
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
