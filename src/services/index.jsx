import axios from "axios";

export const API = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_ENDPOINT,
});

export const setAuth = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};
