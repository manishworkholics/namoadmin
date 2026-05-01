import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../services/api";

export const fetchInventoryItems = createAsyncThunk(
  "inventoryMaster/fetchItems",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/item/list");
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch inventory items"
      );
    }
  }
);

export const uploadInventoryItems = createAsyncThunk(
  "inventoryMaster/uploadItems",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await API.post("/admin/item/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to upload inventory sheet"
      );
    }
  }
);

const inventoryMasterSlice = createSlice({
  name: "inventoryMaster",
  initialState: {
    items: [],
    pagination: null,
    loading: false,
    uploadLoading: false,
    error: null,
    uploadError: null,
    uploadResult: null,
  },
  reducers: {
    clearInventoryUploadResult: (state) => {
      state.uploadError = null;
      state.uploadResult = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInventoryItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInventoryItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload?.items || [];
        state.pagination = action.payload?.pagination || null;
      })
      .addCase(fetchInventoryItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(uploadInventoryItems.pending, (state) => {
        state.uploadLoading = true;
        state.uploadError = null;
        state.uploadResult = null;
      })
      .addCase(uploadInventoryItems.fulfilled, (state, action) => {
        state.uploadLoading = false;
        state.uploadResult = action.payload;
      })
      .addCase(uploadInventoryItems.rejected, (state, action) => {
        state.uploadLoading = false;
        state.uploadError = action.payload;
      });
  },
});

export const { clearInventoryUploadResult } = inventoryMasterSlice.actions;

export default inventoryMasterSlice.reducer;
