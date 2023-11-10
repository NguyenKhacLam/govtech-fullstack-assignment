import { combineReducers } from "redux";
import alerts from "./alert.reducer";
import auth from "./auth.reducer";
import polls from "./poll.reducer";

export default combineReducers({
  auth,
  alerts,
  polls,
});
