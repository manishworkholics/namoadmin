import API from "./api";

export const loginAPI = (data) => API.post("/admin/login", data);
export const registerAPI = (data) => API.post("/admin/register", data);

