import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api";

// GET ALL
export const fetchItems = createAsyncThunk(
  "item/fetchItems",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/admin/getAllItems");
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// ADD
export const addItem = createAsyncThunk(
  "item/addItem",
  async (data, { rejectWithValue }) => {
    try {
      const res = await API.post("/admin/createitem", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// UPDATE
export const updateItem = createAsyncThunk(
  "item/updateItem",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await API.patch(`/admin/updateitem/${id}`, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// DELETE
export const deleteItem = createAsyncThunk(
  "item/deleteItem",
  async (id, { rejectWithValue }) => {
    try {
      await API.patch(`/admin/deleteitem/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const itemSlice = createSlice({
  name: "item",
  initialState: {
    items: [],
    loading: false,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.items = action.payload;
      })

      .addCase(deleteItem.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item._id !== action.payload
        );
      });
  },
});

export default itemSlice.reducer;