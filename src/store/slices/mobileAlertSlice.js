import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api";

// 🔥 GET ALL
export const fetchMobileAlerts = createAsyncThunk(
  "mobileAlert/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/admin/getalertmobstaff");
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

// 🔥 ADD
export const addMobileAlert = createAsyncThunk(
  "mobileAlert/add",
  async (data, { rejectWithValue }) => {
    try {
      const res = await API.post("/admin/createalertmobstaff", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

// 🔥 UPDATE
export const updateMobileAlert = createAsyncThunk(
  "mobileAlert/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await API.patch(
        `/admin/updatesinglealertmobstaff/${id}`,
        data
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

// 🔥 DELETE
export const deleteMobileAlert = createAsyncThunk(
  "mobileAlert/delete",
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/admin/deletesinglealertmobstaff/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

const mobileAlertSlice = createSlice({
  name: "mobileAlert",
  initialState: {
    data: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMobileAlerts.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(deleteMobileAlert.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (item) => item._id !== action.payload
        );
      });
  },
});

export default mobileAlertSlice.reducer;