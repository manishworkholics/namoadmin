import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api";

// GET ALL
export const fetchPdf = createAsyncThunk(
  "pdf/fetchPdf",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/admin/getAllFiles");
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// ADD
export const addPdf = createAsyncThunk(
  "pdf/addPdf",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await API.post("/upload_files", formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// UPDATE
export const updatePdf = createAsyncThunk(
  "pdf/updatePdf",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await API.patch(`/upload_files&update/${id}`, formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// DELETE
export const deletePdf = createAsyncThunk(
  "pdf/deletePdf",
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/admin/deletefile/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const pdfSlice = createSlice({
  name: "pdf",
  initialState: {
    data: [],
    loading: false,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchPdf.fulfilled, (state, action) => {
        state.data = action.payload;
      })

      .addCase(deletePdf.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (item) => item._id !== action.payload
        );
      });
  },
});

export default pdfSlice.reducer;