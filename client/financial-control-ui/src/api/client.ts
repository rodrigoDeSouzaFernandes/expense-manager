import axios from "axios";

const FIVE_SECONDS = 5000;

export const client = axios.create({
  baseURL: "http://localhost:5280/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: FIVE_SECONDS,
});
