import axios from "axios";

const API = axios.create({
  baseURL: "http://206.189.130.102:9009/api/v1", 
});

// Token attach
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;