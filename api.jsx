/** @format */

import axios from "axios";

const baseURL = process.env.REACT_APP_base_url;

const api = axios.create({
  baseURL,
  // Other axios configurations can be added here
});

export default api;
