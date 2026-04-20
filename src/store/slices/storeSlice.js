import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api";

// 🔥 GET ALL STORES
export const getStores = createAsyncThunk(
  "store/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/admin/store/list");
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

// 🔥 CREATE STORE
export const createStore = createAsyncThunk(
  "store/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await API.post("/admin/store/create", data);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

// 🔥 UPDATE STORE
export const updateStore = createAsyncThunk(
  "store/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await API.put(`/admin/store/${id}`, data);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

// 🔥 DELETE STORE
export const deleteStore = createAsyncThunk(
  "store/delete",
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/admin/store/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

const storeSlice = createSlice({
  name: "store",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // GET
      .addCase(getStores.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStores.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(getStores.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE
      .addCase(createStore.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      })

      // UPDATE
      .addCase(updateStore.fulfilled, (state, action) => {
        state.list = state.list.map((s) =>
          s._id === action.payload._id ? action.payload : s
        );
      })

      // DELETE
      .addCase(deleteStore.fulfilled, (state, action) => {
        state.list = state.list.filter((s) => s._id !== action.payload);
      });
  },
});

export default storeSlice.reducer;