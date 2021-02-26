import {
  GET_LEADERBOARD_STATS,
  GET_USER_STATS,
  STATS_LOADING,
  GET_USER_BY_NAME,
  SEARCH_LOADING,
} from "../actions/types";

const initialState = {
  loading: false,
  numberOfPlyaedTournaments: null,
  stats: [],
  userSearch: [],
  searchLoading: false,
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
        searchLoading: false,
      };
    case STATS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SEARCH_LOADING:
      return {
        ...state,
        searchLoading: true,
      };

    default:
      return state;
  }
}
