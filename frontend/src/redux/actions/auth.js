import api from "../../services/api";
import { setAlert } from "./alert";
import {
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
} from "./types";

export const register = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/users/signup", formData);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    // dispatch(loadUser());
  } catch (err) {
    console.log(err);
    const error = err.response.data.message;
    dispatch(setAlert(error, "error"));

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  const body = { email, password };

  try {
    const res = await api.post("/users/login", body);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const error = err.response.data.message;
    dispatch(setAlert(error, "error"));

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const logout = () => ({ type: LOGOUT });

export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get("/users/me");
    console.log(res.data);

    dispatch({
      type: USER_LOADED,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
