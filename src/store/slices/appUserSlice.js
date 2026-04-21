import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api";

// 🔥 GET APP USERS (actually staff API)
export const fetchAppUsers = createAsyncThunk(
  "appUsers/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/admin/staff"); // 🔥 same staff API
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Error");
    }
  }
);

// 🔥 CREATE APP USER (STAFF)
export const createAppUser = createAsyncThunk(
  "appUsers/create",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await API.post("/admin/create-staff", payload);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Error");
    }
  }
);

// 🔥 UPDATE APP USER
export const updateAppUser = createAsyncThunk(
  "appUsers/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await API.put(`/admin/staff/${id}`, data);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Error");
    }
  }
);

// 🔥 UPDATE STATUS
export const updateUserStatus = createAsyncThunk(
  "appUsers/status",
  async ({ id, value }, { rejectWithValue }) => {
    try {
      await API.patch(`/admin/staff/status/${id}`, {
        value,
      });
      return { id, value };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Error");
    }
  }
);

// 🔥 DELETE APP USER
export const deleteAppUser = createAsyncThunk(
  "appUsers/delete",
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/admin/staff/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Error");
    }
  }
);

const appUserSlice = createSlice({
  name: "appUser",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder

      // 🔄 FETCH
      .addCase(fetchAppUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(fetchAppUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ➕ CREATE
      .addCase(createAppUser.fulfilled, (state, action) => {
        state.users.unshift(action.payload);
      })

      // ✏️ UPDATE
      .addCase(updateAppUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (u) => u._id === action.payload._id
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })

      // 🔁 STATUS UPDATE
      .addCase(updateUserStatus.fulfilled, (state, action) => {
        const user = state.users.find(
          (u) => u._id === action.payload.id
        );
        if (user) {
          user.enable_disable_order = action.payload.value;
        }
      })

      // ❌ DELETE
      .addCase(deleteAppUser.fulfilled, (state, action) => {
        state.users = state.users.filter(
          (u) => u._id !== action.payload
        );
      });
  },
});

export default appUserSlice.reducer;