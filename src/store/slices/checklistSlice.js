import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api";

const normalizeTemplate = (checklist) => ({
  _id: checklist?._id,
  title: checklist?.title || "Untitled Checklist",
  description: checklist?.description || "",
  tasks: (checklist?.description || "")
    .split(",")
    .map((task) => task.trim())
    .filter(Boolean),
});

export const getChecklists = createAsyncThunk(
  "checklist/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/admin/checklist/list");
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const deleteChecklist = createAsyncThunk(
  "checklist/delete",
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/admin/checklist/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const createChecklistTemplate = createAsyncThunk(
  "checklist/createTemplate",
  async (formData, { rejectWithValue }) => {
    try {
      const { title, tasks } = formData;

      const res = await API.post("/admin/checklist/create", {
        title,
        description: tasks.join(", "),
        isPhotoRequired: false,
      });

      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const assignChecklist = createAsyncThunk(
  "checklist/assign",
  async (formData, { rejectWithValue }) => {
    try {
      const { checklistId, role, branch } = formData;

      const res = await API.post("/admin/checklist/assign", {
        checklistId,
        storeId: branch,
        role,
      });

      return res.data?.data || formData;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const getChecklistReport = createAsyncThunk(
  "checklist/report",
  async ({ storeId, date }, { rejectWithValue }) => {
    try {
      const res = await API.get("/admin/checklist/report", {
        params: {
          storeId,
          date,
        },
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const checklistSlice = createSlice({
  name: "checklist",
  initialState: {
    loading: false,
    success: false,
    list: [],
    templates: [],
    report: {
      summary: {
        totalTasks: 0,
        completed: 0,
        pending: 0,
        completionPercent: 0,
      },
      branchPerformance: [],
      data: [],
    },
    reportLoading: false,
    reportError: null,
    error: null,
  },
  reducers: {
    resetChecklistState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.reportLoading = false;
      state.reportError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChecklists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getChecklists.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload || [];
        state.templates = Array.from(
          new Map(
            (action.payload || [])
              .filter((item) => item.checklistId?._id)
              .map((item) => [
                item.checklistId._id,
                normalizeTemplate(item.checklistId),
              ])
          ).values()
        );
      })
      .addCase(getChecklists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createChecklistTemplate.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createChecklistTemplate.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        const template = normalizeTemplate(action.payload);
        const exists = state.templates.some((item) => item._id === template._id);

        if (!exists) {
          state.templates.unshift(template);
        }
      })
      .addCase(createChecklistTemplate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(assignChecklist.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(assignChecklist.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(assignChecklist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getChecklistReport.pending, (state) => {
        state.reportLoading = true;
        state.reportError = null;
      })
      .addCase(getChecklistReport.fulfilled, (state, action) => {
        state.reportLoading = false;
        state.report = {
          summary: action.payload?.summary || {
            totalTasks: 0,
            completed: 0,
            pending: 0,
            completionPercent: 0,
          },
          branchPerformance: action.payload?.branchPerformance || [],
          data: action.payload?.data || [],
        };
      })
      .addCase(getChecklistReport.rejected, (state, action) => {
        state.reportLoading = false;
        state.reportError = action.payload;
      })
      .addCase(deleteChecklist.fulfilled, (state, action) => {
        state.list = state.list.filter((item) => item._id !== action.payload);
      })
      .addCase(deleteChecklist.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { resetChecklistState } = checklistSlice.actions;
export default checklistSlice.reducer;
