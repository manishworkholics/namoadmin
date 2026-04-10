import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createFranchise,
  getAllFranchise,
  toggleFranchiseOrder,
  clearDeviceToken,
  updateFranchise,
  getSingleFranchise,
  getConsumption
} from "../../services/franchiseService";


export const addFranchise = createAsyncThunk(
  "franchise/add",
  async (data, { rejectWithValue }) => {
    try {
      const res = await createFranchise(data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// 🔥 FETCH
export const fetchFranchise = createAsyncThunk(
  "franchise/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAllFranchise();
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// 🔥 TOGGLE ORDER
export const updateFranchiseOrder = createAsyncThunk(
  "franchise/updateOrder",
  async ({ id, value }, { dispatch }) => {
    await toggleFranchiseOrder(id, value);
    dispatch(fetchFranchise()); // auto refresh
  }
);

// 🔥 CLEAR TOKEN
export const clearFranchiseToken = createAsyncThunk(
  "franchise/clearToken",
  async (id, { dispatch }) => {
    await clearDeviceToken(id);
    dispatch(fetchFranchise());
  }
);


export const fetchSingleFranchise = createAsyncThunk(
  "franchise/fetchSingle",
  async (id, { rejectWithValue }) => {
    try {
      const res = await getSingleFranchise(id);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateSingleFranchise = createAsyncThunk(
  "franchise/updateSingle",
  async ({ id, data }, { dispatch }) => {
    await updateFranchise(id, data);
    dispatch(fetchFranchise());
  }
);

export const fetchConsumption = createAsyncThunk(
  "franchise/consumption",
  async ({ id, month }, { rejectWithValue }) => {
    try {
      const res = await getConsumption(id, month);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const franchiseSlice = createSlice({
  name: "franchise",

  initialState: {
    data: [],
    consumption: [],
    single: null,
    loading: false,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchFranchise.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFranchise.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSingleFranchise.fulfilled, (state, action) => {
        state.single = action.payload;
      })
      .addCase(fetchConsumption.fulfilled, (state, action) => {
        state.consumption = action.payload;
      })
      .addCase(fetchFranchise.rejected, (state) => {
        state.loading = false;
      });

  },
});

export default franchiseSlice.reducer;