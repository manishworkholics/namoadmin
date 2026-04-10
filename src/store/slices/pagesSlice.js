import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api";

// 🔥 GET ALL
export const fetchPages = createAsyncThunk(
  "pages/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/admin/pages/getallPages");
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

// 🔥 ADD
export const addPage = createAsyncThunk(
  "pages/add",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await API.post("/admin/pages/createPages", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

// 🔥 UPDATE
export const updatePage = createAsyncThunk(
  "pages/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await API.patch(
        `/admin/pages/updatePage/${id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

const pagesSlice = createSlice({
  name: "pages",
  initialState: {
    data: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPages.fulfilled, (state, action) => {
        state.data = action.payload;
      });
  },
});

export default pagesSlice.reducer;