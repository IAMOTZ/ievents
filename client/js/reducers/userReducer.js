export default function reducer(state = {
  user: {
    name: null,
    email: null,
    password: null,
    role: null,
  },
  fetching: false,
  fetched: false,
  error: false,
}, action) {
  switch (action.type) {
    case 'FETCH_USER': {
      return { ...state, fetching: true };
    }
    case 'FETCH_MYUSER_FULFILLED': {
      const { name, email, role } = action.payload;
      const newUser = { name, email, role };
      return {
        ...state,
        user: newUser,
        fetching: false,
        fetched: true,
      };
    }
    case 'FETCH_MYUSER_REJECTED': {
      return { ...state, fetching: false, error: action.payload };
    }
    default: {
      return state;
    }
  }
}
