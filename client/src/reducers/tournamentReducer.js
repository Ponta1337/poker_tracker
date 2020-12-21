import {
  GET_TOURNAMENTS,
  ADD_TOURNAMENT,
  DELETE_TOURNAMENT,
  EDIT_TOURNAMENT,
  TOURNAMENTS_LOADING,
  GET_TOURNAMENTS_BY_USERID,
  GET_TOURNAMENTS_BY_USERNAME,
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
    case GET_TOURNAMENTS_BY_USERNAME:
    case GET_TOURNAMENTS_BY_USERID:
      return {
        ...state,
        tournaments: action.payload,
        loading: false,
        tournamentsByUserIdisLoaded: true,
      };

    case DELETE_TOURNAMENT:
      return {
        ...state,
        tournaments: state.tournaments.filter(
          (tournament) => tournament._id !== action.payload
        ),
      };

    case EDIT_TOURNAMENT:
      return {
        ...state,
        tournaments: [
          action.payload,
          ...state.tournaments.filter(
            (tournament) => tournament._id !== action.payload._id
          ),
        ],
        // tournaments: state.tournaments.filter(
        //   (tournament) => tournament._id !== action.payload._id
        // ),
        // tournaments: [...state.tournaments, action.payload],
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

    default:
      return state;
  }
}
