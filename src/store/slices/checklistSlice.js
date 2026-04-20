import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api";

// 🔥 GET ALL (FIXED)
export const getChecklists = createAsyncThunk(
  "checklist/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/admin/checklist/list"); // ✅ FIXED
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

// 🔥 DELETE
export const deleteChecklist = createAsyncThunk(
  "checklist/delete",
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/admin/checklist/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

// 🔥 CREATE
export const createChecklist = createAsyncThunk(
  "checklist/create",
  async (formData, { rejectWithValue }) => {
    try {
      const { title, tasks, role, branch } = formData;

      const res1 = await API.post("/admin/checklist/create", {
        title,
        description: tasks.join(", "),
        isPhotoRequired: false,
      });

      const checklistId = res1.data.data._id;

      await API.post("/admin/checklist/assign", {
        checklistId,
        storeId: branch,
        role,
      });

      return true; // 🔥 important
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

// 🔥 UPDATE (NEW)
export const updateChecklist = createAsyncThunk(
  "checklist/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const { title, tasks, role, branch } = formData;

      await API.put(`/admin/checklist/${id}`, {
        title,
        description: tasks.join(", "),
        role,
        storeId: branch,
      });

      return true;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

const checklistSlice = createSlice({
  name: "checklist",
  initialState: {
    loading: false,
    success: false,
    list: [],
    error: null,
  },
  reducers: {
    resetChecklistState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // 🔥 GET
      .addCase(getChecklists.pending, (state) => {
        state.loading = true;
      })
      .addCase(getChecklists.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(getChecklists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔥 CREATE
      .addCase(createChecklist.pending, (state) => {
        state.loading = true;
      })
      .addCase(createChecklist.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })

      // 🔥 UPDATE
      .addCase(updateChecklist.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateChecklist.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })

      // 🔥 DELETE
      .addCase(deleteChecklist.fulfilled, (state, action) => {
        state.list = state.list.filter((i) => i._id !== action.payload);
      });
  },
});

export const { resetChecklistState } = checklistSlice.actions;
export default checklistSlice.reducer;