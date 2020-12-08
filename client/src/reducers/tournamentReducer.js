import {
  GET_TOURNAMENTS,
  ADD_TOURNAMENT,
  DELETE_TOURNAMENT,
  TOURNAMENTS_LOADING,
  USER_STATS,
  GET_TOURNAMENTS_BY_USERID,
  GET_TOURNAMENTS_BY_USERID_EMPTY,
} from "../actions/types";

const initialState = {
  tournaments: [],
  loading: false,
  isEmpty: false,
  tournamentsByUserIdisLoaded: false,
  userStats: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TOURNAMENTS:
      return {
        ...state,
        tournaments: action.payload,
        loading: false,
      };
    case GET_TOURNAMENTS_BY_USERID:
      return {
        ...state,
        tournaments: action.payload,
        loading: false,
        tournamentsByUserIdisLoaded: true,
      };
    case GET_TOURNAMENTS_BY_USERID_EMPTY:
      return {
        ...state,
        tournaments: [{}],
        isEmpty: true,
        loading: false,
      };

    case DELETE_TOURNAMENT:
      return {
        ...state,
        tournaments: state.tournaments.filter(
          (tournament) => tournament._id !== action.payload
        ),
      };
    case ADD_TOURNAMENT:
      return {
        ...state,
        tournaments: [action.payload, ...state.tournaments],
        isEmpty: false,
        tournamentsByUserIdisLoaded: true,
      };
    case TOURNAMENTS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case USER_STATS:
      return {
        ...state,
        userStats: true,
      };
    default:
      return state;
  }
}
