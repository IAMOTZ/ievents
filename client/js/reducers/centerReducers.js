import _ from 'lodash';

let initialState = {
  centers: [],
  modalContent: null,
  status: {
    fetching: false,
    fetched: false,
    error: false,
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
          error: false
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
          error: false,
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
          error: action.payload,
        },
      };
    }
    case 'SHOW_CENTER_MODAL': {
      const modalContent = _.find(state.centers, {id: Number(action.payload)});
      return {
        ...state,
        modalContent: modalContent,
      }
    }
    default: {
      return state; 
    }
  }
}