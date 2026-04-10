import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginAPI } from "../../services/authService";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const res = await loginAPI(data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Login failed" });
    }
  }
);

// ✅ Restore from localStorage
const storedUser = localStorage.getItem("admin");
const storedToken = localStorage.getItem("token");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: storedUser ? JSON.parse(storedUser) : null,
    token: storedToken || null,
    loading: false,
    error: null,
  },

  // ✅ ONLY ONE reducers block
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;

      localStorage.removeItem("token");
      localStorage.removeItem("admin");
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null; // reset error
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;

        state.user = action.payload.admindata;
        state.token = action.payload.token;

        localStorage.setItem("token", action.payload.token);
        localStorage.setItem(
          "admin",
          JSON.stringify(action.payload.admindata)
        );
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;