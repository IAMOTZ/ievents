import _ from 'lodash';

let initialState = {
  centers: [],
  modalContent: null,
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
  },
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GETTING_CENTERS': {
      return {
        ...state,
        status: {
          ...state.status,
          fetching: true,
          fetched: false,
          fetchingError: false
        },
      };
    }
    case 'GETTING_CENTERS_RESOLVED': {
      const { centers } = action.payload;
      return {
        ...state,
        centers: centers,
        status: {
          ...state.status,
          fetching: false,
          fetched: true,
          fetchingError: false,
        },
      };
    }
    case 'GETTING_CENTERS_REJECTED': {
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
    case 'ADDING_CENTER': {
      return {
        ...state,
        status: {
          ...state.status,
          adding: true,
          added: false,
          addingError: false
        },
      };
    }
    case 'ADDING_CENTER_RESOLVED': {
      return {
        ...state,
        status: {
          ...state.status,
          adding: false,
          added: true,
          addingError: false,
        },
      }
    }
    case 'ADDING_CENTER_REJECTED': {
      return {
        ...state,
        status: {
          ...state.status,
          adding: false,
          added: false,
          addingError: action.payload,
        },
      }
    }
    case 'UPDATING_CENTER': {
      return {
        ...state,
        status: {
          ...state.status,
          updating: true,
          updated: false,
          updatingError: false,
        },
      }
    }
    case 'UPDATING_CENTER_RESOLVED': {
      return {
        ...state,
        status: {
          ...state.status,
          updating: false,
          updated: true,
          updatingError: false,
        },
      }
    }
    case 'UPDATING_CENTER_REJECTED': {
      return {
        ...state,
        status: {
          ...state.status,
          updating: false,
          updated: false,
          updatingError: action.payload,
        },
      }
    }
    case 'INITIALIZE_EDIT': {
      const center = _.find(state.centers, { id: Number(action.payload) });
      return {
        ...state,
        toEdit: center,
      }
    }
    case 'SHOW_CENTER_MODAL': {
      const modalContent = _.find(state.centers, { id: Number(action.payload) });
      return {
        ...state,
        modalContent: modalContent,
      }
    }
    case 'CLEAR_ALL_STATUS': {
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