import axios from "axios";

import {
  GET_USER_STATS,
  GET_LEADERBOARD_STATS,
  STATS_LOADING,
  SEARCH_LOADING,
  GET_USER_BY_NAME,
  GET_DATES,
  UPDATE_LAST_VISITED,
  DATES_LOADING,
} from "./types";
import { returnErrors } from "./errorActions";

// export const getUserStats = (userId) => (dispatch) => {
//   axios.get(`/api/stats/allstats/${userId}`).then((res) => {
//     dispatch({
//       type: GET_USER_STATS,
//       payload: res.data,
//     });
//   });
// };

export const getUserStats = (userId) => (dispatch) => {
  dispatch(setStatsLoading());
  axios.get(`/api/stats/allstats/${userId}`).then((res) => {
    dispatch({
      type: GET_USER_STATS,
      payload: res.data,
    });
  });
};

export const getLeaderBoardStats = () => (dispatch) => {
  dispatch(setStatsLoading());
  axios.get("/api/stats/leaderboard/").then((res) => {
    dispatch({
      type: GET_LEADERBOARD_STATS,
      payload: res.data,
    });
  });
};

export const getPlayerByName = (name) => (dispatch) => {
  dispatch(setSearchLoading());
  axios.get(`/api/stats/id/${name}/`).then((res) => {
    dispatch({
      type: GET_USER_BY_NAME,
      payload: res.data,
    });
  });
};

export const getDates = (userId) => (dispatch) => {
  dispatch(setDatesLoading());
  axios.get(`/api/users/${userId}`).then((res) => {
    dispatch({
      type: GET_DATES,
      payload: res.data,
    });
  });
};

export const updateLastVisited = (userId) => (dispatch) => {
  axios
    .put(`/api/users/visited/${userId}`)
    .then((res) =>
      dispatch({
        type: UPDATE_LAST_VISITED,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setSearchLoading = () => {
  return {
    type: SEARCH_LOADING,
  };
};

export const setDatesLoading = () => {
  return {
    type: DATES_LOADING,
  };
};

export const setStatsLoading = () => {
  return {
    type: STATS_LOADING,
  };
};
