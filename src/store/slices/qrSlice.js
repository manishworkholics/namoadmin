import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api";

// 🔥 GET QR
export const fetchQr = createAsyncThunk(
  "qr/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/admin/getallQr");
      return res.data.data[0]; // single QR
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

// 🔥 UPDATE QR
export const updateQr = createAsyncThunk(
  "qr/update",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await API.patch("/admin/qr/updateQr", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

const qrSlice = createSlice({
  name: "qr",
  initialState: {
    data: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQr.fulfilled, (state, action) => {
        state.data = action.payload;
      });
  },
});

export default qrSlice.reducer;