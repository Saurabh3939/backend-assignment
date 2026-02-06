import axios from "axios";

const API = axios.create({
  baseURL: "https://backend-assignment-yr8c.onrender.com",
  withCredentials: true,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = ` Bearer ${token}`;
  }
  return req;
});

export default API;
