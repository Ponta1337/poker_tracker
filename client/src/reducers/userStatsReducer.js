import {
  GET_LEADERBOARD_STATS,
  GET_USER_STATS,
  STATS_LOADING,
  GET_USER_BY_NAME,
} from "../actions/types";

const initialState = {
  loading: true,
  numberOfPlyaedTournaments: null,
  stats: [],
  userSearch: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USER_STATS:
      return {
        ...state,
        loading: false,
        stats: action.payload,
      };
    case GET_LEADERBOARD_STATS:
      return {
        ...state,
        loading: false,
        stats: action.payload,
      };

    case GET_USER_BY_NAME:
      return {
        ...state,
        userSearch: action.payload,
        loading: false,
      };
    case STATS_LOADING:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
}
