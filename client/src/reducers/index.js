import { combineReducers } from "redux";
import tournamentReducer from "./tournamentReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import userStatsReducer from "./userStatsReducer";

export default combineReducers({
  tournament: tournamentReducer,
  error: errorReducer,
  auth: authReducer,
  userStats: userStatsReducer,
});
