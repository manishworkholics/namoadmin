import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllOrders,
  getSingleOrder,
  updateOrderStatus,
  getOrdersByUser
} from "../../services/orderService";

// ✅ Get all orders
export const fetchOrders = createAsyncThunk(
  "order/fetchOrders",
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const res = await getAllOrders(page, limit);

      return {
        data: res.data.data,
        total: res.data.totalOrders,
        page,
        limit,
      };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// ✅ Get single order
export const fetchSingleOrder = createAsyncThunk(
  "order/fetchSingleOrder",
  async (id, { rejectWithValue }) => {
    try {
      const res = await getSingleOrder(id);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// ✅ Update order status
export const changeOrderStatus = createAsyncThunk(
  "order/changeOrderStatus",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await updateOrderStatus(id, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchOrdersByUser = createAsyncThunk(
  "order/fetchByUser",
  async (id, { rejectWithValue }) => {
    try {
      const res = await getOrdersByUser(id);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    userOrders: [],
    singleOrder: null,
    loading: false,
    error: null,
    total: 0,
    page: 1,
    limit: 8,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder

      // 🔹 Get Orders
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.data;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 Single Order
      .addCase(fetchSingleOrder.fulfilled, (state, action) => {
        state.singleOrder = action.payload.data;
      })

      .addCase(fetchOrdersByUser.fulfilled, (state, action) => {
        state.userOrders = action.payload;
      })
      // 🔹 Update Status
      .addCase(changeOrderStatus.fulfilled, (state) => {
        state.loading = false;
      });


  },
});

export default orderSlice.reducer;