import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_BE_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
