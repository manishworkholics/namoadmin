import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api";

// 🔥 GET ALL STAFF
export const fetchStaff = createAsyncThunk(
  "staff/fetchStaff",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/admin/getAllStaff");
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// 🔥 UPDATE STATUS
export const updateStaffStatus = createAsyncThunk(
  "staff/updateStatus",
  async ({ id, value }, { rejectWithValue }) => {
    try {
      const res = await API.patch(
        `/admin/changeAdminStatus/${id}`,
        { isBlocked: value }
      );
      return { id, value };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);


// 🔥 ADD STAFF
export const addStaff = createAsyncThunk(
  "staff/addStaff",
  async (data, { rejectWithValue }) => {
    try {
      const res = await API.post("/admin/register", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// 🔥 GET SINGLE STAFF
export const getSingleStaff = createAsyncThunk(
  "staff/getSingleStaff",
  async (id, { rejectWithValue }) => {
    try {
      const res = await API.get(`/admin/getSingleSubStaff/${id}`);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// 🔥 UPDATE STAFF
export const updateStaff = createAsyncThunk(
  "staff/updateStaff",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await API.patch(`/admin/updateSubStaff/${id}`, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const staffSlice = createSlice({
  name: "staff",
  initialState: {
    staff: [],
    loading: false,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchStaff.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStaff.fulfilled, (state, action) => {
        state.loading = false;
        state.staff = action.payload;
      })
      .addCase(fetchStaff.rejected, (state) => {
        state.loading = false;
      })

      .addCase(updateStaffStatus.fulfilled, (state, action) => {
        const { id, value } = action.payload;

        const index = state.staff.findIndex((s) => s._id === id);
        if (index !== -1) {
          state.staff[index].isBlocked = value;
        }
      });
  },
});

export default staffSlice.reducer;