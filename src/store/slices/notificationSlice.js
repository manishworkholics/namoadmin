import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api";

// 🔥 GET ALL
export const fetchNotifications = createAsyncThunk(
  "notification/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get(`/admin/notification/getallnotification`);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error");
    }
  }
);

// 🔥 ADD
export const addNotification = createAsyncThunk(
  "notification/add",
  async (formData, { rejectWithValue }) => {
    try {
      const isSingle = formData.get("userid");

      const url = isSingle
        ? `/admin/notification/createnotification_Single`
        : `/admin/notification/createnotification`;

      const res = await API.post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error");
    }
  }
);


export const updateNotification = createAsyncThunk(
  "notification/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const isSingle = formData.get("userid");

      const url = isSingle
        ? `/admin/notification/updatenotification_Single/${id}`
        : `/admin/notification/updatenotification/${id}`;

      const res = await API.patch(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error");
    }
  }
);

// 🔥 DELETE
export const deleteNotification = createAsyncThunk(
  "notification/delete",
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/admin/notification/deletenotification/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error");
    }
  }
);

// 🔥 SLICE
const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // FETCH
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateNotification.fulfilled, (state, action) => {
        const updated = action.meta.arg; // {id, formData}

        state.data = state.data.map((item) =>
          item._id === updated.id
            ? { ...item, ...Object.fromEntries(updated.formData) }
            : item
        );
      })
      // ADD
      .addCase(addNotification.fulfilled, (state) => {
        state.loading = false;
      })

      // DELETE
      .addCase(deleteNotification.fulfilled, (state, action) => {
        state.data = state.data.filter((item) => item._id !== action.payload);
      });
  },
});

export default notificationSlice.reducer;