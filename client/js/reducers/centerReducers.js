let initialState = {
  centers: [],
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
    default: {
      return state;
    }
  }
}