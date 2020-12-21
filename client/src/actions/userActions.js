import axios from "axios";
import { returnErrors } from "./errorActions";
import { USERS_LOADING, GET_USERS } from "./types";

export const getUsers = () => (dispatch) => {
  dispatch(setUsersLoading());
  axios
    .get("/api/users/username")
    .then((res) =>
      dispatch({
        type: GET_USERS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setUsersLoading = () => {
  return {
    type: USERS_LOADING,
  };
};
