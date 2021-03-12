import {
  GET_LEADERBOARD_STATS,
  GET_USER_STATS,
  STATS_LOADING,
  GET_USER_BY_NAME,
  SEARCH_LOADING,
  GET_DATES,
  DATES_LOADING,
  UPDATE_LAST_VISITED,
} from "../actions/types";

const initialState = {
  loading: false,
  numberOfPlyaedTournaments: null,
  stats: [],
  userSearch: [],
  searchLoading: false,
  dates: null,
  datesLoading: false,
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
    case UPDATE_LAST_VISITED:
      return {
        ...state,
      };
    case GET_DATES:
      return {
        ...state,
        dates: action.payload,
      };

    case STATS_LOADING:
      return {
        ...state,
        loading: true,
      };

    case DATES_LOADING:
      return {
        ...state,
        datesLoading: true,
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
