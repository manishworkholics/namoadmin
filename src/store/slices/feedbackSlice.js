import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api";

// 🔥 GET ALL
export const fetchFeedbacks = createAsyncThunk(
  "feedback/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/admin/getfeedbacks");
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

// 🔥 MARK AS READ
export const markFeedbackRead = createAsyncThunk(
  "feedback/read",
  async (id, { rejectWithValue }) => {
    try {
      await API.patch(`/admin/updatefeedback_readstatus/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

const feedbackSlice = createSlice({
  name: "feedback",
  initialState: {
    data: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedbacks.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(markFeedbackRead.fulfilled, (state, action) => {
        const id = action.payload;
        state.data = state.data.map((item) =>
          item._id === id ? { ...item, readstatus: true } : item
        );
      });
  },
});

export default feedbackSlice.reducer;