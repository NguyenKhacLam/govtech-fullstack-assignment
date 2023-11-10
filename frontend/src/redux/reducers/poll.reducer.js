import {
  DELETE_POLL,
  GET_POLL,
  GET_POLLS,
  POLL_ERROR,
  RECEIVE_VOTE,
  VOTE,
} from "../actions/types";

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
        polls: payload.polls,
        loading: false,
      };

    case GET_POLL:
      return {
        ...state,
        poll: payload,
        loading: false,
      };

    case DELETE_POLL:
      return {
        ...state,
        polls: state.polls.filter((i) => i !== payload.pollId),
        poll: null,
        loading: false,
      };

    case RECEIVE_VOTE:
      const votedOption = state.poll.options.find(
        (option) => option.id === action.payload.optionId
      );

      if (votedOption) {
        return {
          ...state,
          poll: {
            ...state.poll,
            totalVote: state.poll.totalVote + 1,
            options: state.poll.options.map((option) =>
              option.id === action.payload.optionId
                ? { ...option, count: option.count + 1 }
                : option
            ),
          },
        };
      }
      break;

    case VOTE:
      const vote = state.poll.options.find(
        (option) => option.id === action.payload.optionId
      );

      // If the option exists, update the count and totalVote
      if (vote) {
        return {
          ...state,
          poll: {
            ...state.poll,
            userCanVote: false,
            totalVote: state.poll.totalVote + 1,
            options: state.poll.options.map((option) =>
              option.id === action.payload.optionId
                ? { ...option, count: option.count + 1 }
                : option
            ),
          },
        };
      }
      // If the option does not exist, return the current state
      return state;
    case POLL_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}

export default pollReducer;
