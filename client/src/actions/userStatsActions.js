import axios from "axios";

import {
  GET_USER_STATS,
  GET_LEADERBOARD_STATS,
  STATS_LOADING,
  GET_USER_BY_NAME,
} from "./types";
import { returnErrors } from "./errorActions";

export const getUserStats = (userId) => (dispatch) => {
  axios.get(`/api/stats/allstats/${userId}`).then((res) => {
    dispatch({
      type: GET_USER_STATS,
      payload: res.data,
    });
  });
};

export const getLeaderBoardStats = () => (dispatch) => {
  // dispatch(setStatsLoading());
  axios.get("/api/stats/leaderboard/").then((res) => {
    dispatch({
      type: GET_LEADERBOARD_STATS,
      payload: res.data,
    });
  });
};

export const getPlayerByName = (name) => (dispatch) => {
  // dispatch(setStatsLoading());
  axios.get(`/api/users/${name}/`).then((res) => {
    dispatch({
      type: GET_USER_BY_NAME,
      payload: res.data,
    });
  });
};

export const setStatsLoading = () => {
  return {
    type: STATS_LOADING,
  };
};
