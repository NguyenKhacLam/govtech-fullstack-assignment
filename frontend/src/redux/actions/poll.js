import api from "../../services/api";
import { setAlert } from "./alert";
import { ADD_POLL, GET_POLL, GET_POLLS, POLL_ERROR } from "./types";

export const getPolls = (page, limit) => async (dispatch) => {
  try {
    const res = await api.get("/polls", { params: { page, limit } });
    dispatch({
      type: GET_POLLS,
      payload: res.data.data.data,
    });
  } catch (err) {
    dispatch({
      type: POLL_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getPoll = (pollId) => async (dispatch) => {
  try {
    const res = await api.get(`/polls/${pollId}`);
    dispatch({
      type: GET_POLL,
      payload: res.data.data.data,
    });
  } catch (err) {
    dispatch({
      type: POLL_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addPoll = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/polls", formData);

    dispatch({
      type: ADD_POLL,
      payload: res.data,
    });

    dispatch(setAlert("Poll created", "success"));
  } catch (err) {
    dispatch({
      type: POLL_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
