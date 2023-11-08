import { combineReducers } from "redux";
import alerts from "./alert.reducer";
import auth from "./auth.reducer";

export default combineReducers({
  auth,
  alerts,
});
