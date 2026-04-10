import API from "./api";

// GET ALL
export const getAllFranchise = () =>
  API.get("/users/getAllUser");

// ENABLE / DISABLE ORDER
export const toggleFranchiseOrder = (id, value) =>
  API.patch(`/admin/enableDisableOrder/${id}?enable_disable_order=${value}`);

// CLEAR TOKEN
export const clearDeviceToken = (id) =>
  API.patch(`/admin/cleardevicetoken/${id}`);

export const getSingleFranchise = (id) =>
  API.get(`/users/getSingleUser/${id}`);

export const updateFranchise = (id, data) =>
  API.patch(`/users/updateSingleUser/${id}`, data);

export const getConsumption = (id, month) =>
  API.get(`/admin/getconsumptionrecord/${id}/${month}`);

export const createFranchise = (data) =>
  API.post("/users/register", data, {
    headers: { "content-type": "multipart/form-data" },
  });