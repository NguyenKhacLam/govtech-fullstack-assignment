import api from "../../services/api";
import { GET_POLL, GET_POLLS, POLL_ERROR } from "./types";

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
  console.log(12314123);
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
