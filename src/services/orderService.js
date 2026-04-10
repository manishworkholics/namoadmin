import API from "./api";

// ✅ Get all orders (web)
export const getAllOrders = (page = 1, limit = 10) =>
  API.get(`/admin/getAllOrderAdmin?page=${page}&limit=${limit}`);

// ✅ Get all orders (mobile)
export const getAllOrdersMobile = () =>
  API.get("/admin/getAllOrderAdmin_Mobile?DETAIL=ALL");

// ✅ Get single order
export const getSingleOrder = (id) =>
  API.get(`/admin/getSingleOrderdetail/${id}`);

// ✅ Get single order (mobile)
export const getSingleOrderMobile = (id) =>
  API.get(`/admin/mobile/getSingleOrderdetail/${id}`);

// ✅ Order history by user
export const getOrderHistoryByUser = (userId) =>
  API.get(`/admin/getOrderStatusHistoryByUserId/${userId}`);

// ✅ Order history by order + user
export const getOrderHistory = (data) =>
  API.post(`/admin/getOrderStatusHistoryByOrderanduserId`, data);

// ✅ Update order status
export const updateOrderStatus = (id, data) =>
  API.put(`/admin/updateOrderStatus/${id}`, data);

// ✅ Update order status mobile
export const updateOrderStatusMobile = (id, data) =>
  API.put(`/admin/updateOrderStatus_Via_mobile/${id}`, data);

// ✅ Update payment status
export const updatePaymentStatus = (id, data) =>
  API.put(`/admin/updatePaymentStatus/${id}`, data);

// ✅ Update payment status mobile
export const updatePaymentStatusMobile = (id, data) =>
  API.put(`/admin/updatePaymentStatus_Via_mobile/${id}`, data);

// ✅ Enable / Disable order
export const toggleOrderStatus = (id, value) =>
  API.get(`/enableDisableOrder/${id}?enable_disable_order=${value}`);

// ✅ Upload courier receipt
export const uploadCourierReceipt = (id, formData) =>
  API.post(`/admin/courierrecept/uploadcourierrecept/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const getOrdersByUser = (id) =>
  API.get(`/users/getAllOrderByUserId/${id}`);