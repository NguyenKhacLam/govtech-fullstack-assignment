import api from "../../services/api";
import { setAlert } from "./alert";
import {
  ADD_POLL,
  DELETE_POLL,
  GET_POLL,
  GET_POLLS,
  RECEIVE_VOTE,
  VOTE,
} from "./types";

export const getPolls = (page, limit) => async (dispatch) => {
  try {
    const res = await api.get("/polls", { params: { page, limit } });
    dispatch({
      type: GET_POLLS,
      payload: res.data.data,
    });
  } catch (err) {
    const error = err.response.data.message;
    dispatch(setAlert(error, "error"));
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
    const error = err.response.data.message;
    dispatch(setAlert(error, "error"));
  }
};

export const addPoll = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/polls", formData);

    dispatch({
      type: ADD_POLL,
      payload: res.data.data,
    });

    dispatch(setAlert("Poll created", "success"));
  } catch (err) {
    const error = err.response.data.message;
    dispatch(setAlert(error, "error"));
  }
};

export const votePoll = (pollId, optionId) => async (dispatch) => {
  try {
    const res = await api.post(`/votes/${pollId}/${optionId}`);

    dispatch({
      type: VOTE,
      payload: res.data.data.pollId,
    });

    dispatch(setAlert("You have voted", "success"));
  } catch (err) {
    const error = err.response.data.message;
    dispatch(setAlert(error, "error"));
  }
};

export const deletePoll = (pollId) => async (dispatch) => {
  try {
    const res = await api.delete(`/polls/${pollId}`);
    console.log(res);
    dispatch({
      type: DELETE_POLL,
      payload: res.data.pollId,
    });

    dispatch(setAlert("Poll deleted", "success"));
  } catch (err) {
    const error = err.response.data.message;
    dispatch(setAlert(error, "error"));
  }
};

export const receiveVote = (vote) => ({ type: RECEIVE_VOTE, payload: vote });
