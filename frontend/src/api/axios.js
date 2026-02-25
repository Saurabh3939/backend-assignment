import axios from "axios";

const API = axios.create({
  baseURL: "https://backend-assignment-yr8c.onrender.com/api/v1",
  withCredentials: true,
});

export default API;
