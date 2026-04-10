import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api";

// 🔥 GET BANK DETAILS
export const fetchBank = createAsyncThunk(
    "bank/get",
    async (_, { rejectWithValue }) => {
        try {
            const res = await API.get("/admin/getBankDetails");
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data);
        }
    }
);

// 🔥 UPDATE BANK
export const updateBank = createAsyncThunk(
    "bank/update",
    async (data, { rejectWithValue }) => {
        try {
            const res = await API.patch("/admin/updateBankDetails", data);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data);
        }
    }
);

const bankSlice = createSlice({
    name: "bank",
    initialState: {
        data: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchBank.fulfilled, (state, action) => {
            state.data = action.payload;
        });
    },
});

export default bankSlice.reducer;