import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../services/api";

export const createIssue = createAsyncThunk(
  "issue/create",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await API.post("/issue/create", payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create issue"
      );
    }
  }
);

export const fetchIssues = createAsyncThunk(
  "issue/list",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/issue/list");
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch issue history"
      );
    }
  }
);

const issueSlice = createSlice({
  name: "issue",
  initialState: {
    issues: [],
    pagination: null,
    loading: false,
    createLoading: false,
    error: null,
    createError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIssues.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIssues.fulfilled, (state, action) => {
        state.loading = false;
        state.issues = action.payload?.issues || [];
        state.pagination = action.payload?.pagination || null;
      })
      .addCase(fetchIssues.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createIssue.pending, (state) => {
        state.createLoading = true;
        state.createError = null;
      })
      .addCase(createIssue.fulfilled, (state, action) => {
        state.createLoading = false;
        if (action.payload?.data) {
          state.issues.unshift(action.payload.data);
        }
      })
      .addCase(createIssue.rejected, (state, action) => {
        state.createLoading = false;
        state.createError = action.payload;
      });
  },
});

export default issueSlice.reducer;
