import { GET_POLL, GET_POLLS, RECEIVE_VOTE, VOTE } from "../actions/types";

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

    case VOTE:
    case RECEIVE_VOTE:
      const { optionId } = action.payload;

      // Find the option that the user voted for
      const votedOption = state.poll.options.find(
        (option) => option.id === optionId
      );

      // If the option exists, update the count and totalVote
      if (votedOption) {
        return {
          ...state,
          poll: {
            ...state.poll,
            totalVote: state.poll.totalVote + 1,
            options: state.poll.options.map((option) =>
              option.id === optionId
                ? { ...option, count: option.count + 1 }
                : option
            ),
          },
        };
      }
      // If the option does not exist, return the current state
      return state;

    default:
      return state;
  }
}

export default pollReducer;
