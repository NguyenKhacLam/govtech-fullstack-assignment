import { GET_POLL, GET_POLLS } from "../actions/types";

const initialState = {
  polls: [],
  poll: null,
  loading: true,
  error: {},
};

function pollReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POLLS:
      return {
        ...state,
        polls: payload,
        loading: false,
      };

    case GET_POLL:
      return {
        ...state,
        poll: payload,
        loading: false,
      };

    default:
      return state;
  }
}

export default pollReducer;
