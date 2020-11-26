import {
  GET_TOURNAMENTS,
  ADD_TOURNAMENT,
  DELETE_TOURNAMENT,
  TOURNAMENTS_LOADING,
  GET_TOURNAMENTS_BY_USERID,
} from "../actions/types";

const initialState = {
  tournaments: [],
  loading: false,
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
        // tournaments: state.tournaments.filter(
        //   (tournament) => tournament.userId === action.payload
        // ),
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
