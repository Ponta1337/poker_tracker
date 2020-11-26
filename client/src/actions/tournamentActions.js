import axios from "axios";
import {
  GET_TOURNAMENTS,
  GET_TOURNAMENTS_BY_USERID,
  ADD_TOURNAMENT,
  DELETE_TOURNAMENT,
  TOURNAMENTS_LOADING,
} from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getTournamentsByUserId = (userId) => (dispatch) => {
  console.log("action called");
  dispatch(setTournamentsLoading());
  axios
    .get(`/api/tournaments/${userId}`)
    .then((res) =>
      dispatch({
        type: GET_TOURNAMENTS_BY_USERID,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
export const getTournaments = () => (dispatch) => {
  dispatch(setTournamentsLoading());
  axios
    .get("/api/tournaments")
    .then((res) =>
      dispatch({
        type: GET_TOURNAMENTS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addTournament = (tournament) => (dispatch, getState) => {
  axios
    .post("/api/tournaments", tournament, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: ADD_TOURNAMENT,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteTournament = (id) => (dispatch, getState) => {
  axios
    .delete(`/api/tournaments/${id}`, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: DELETE_TOURNAMENT,
        payload: id,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setTournamentsLoading = () => {
  return {
    type: TOURNAMENTS_LOADING,
  };
};
