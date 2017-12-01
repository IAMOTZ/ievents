let initialState = {
  event: [],
  status: {
    fetching: false,
    fetched: false,
    error: false,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADDDING_EVENT': {
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
    case 'ADDING_EVENT_RESOLVED': {
      const { title, description, date, center } = action.payload.event;
      const newEvent = { title, description, date, center };
      return {
        ...state,
        event: [...state.event, newEvent],
        status: {
          ...state.status,
          fetching: false,
          fetched: true,
        },
      };
    }
    case 'ADDING_EVENT_REJECTED': {
      return {
        ...state,
        status: {
          ...state.status,
          fetching: false,
          error: action.payload,
        },
      };
    }
    default: {
      return state;
    }
  }
}