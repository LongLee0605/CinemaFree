import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSingle = createAsyncThunk("single/fetchSingle", async () => {
  const response = await axios.get(
    "https://phimapi.com/v1/api/danh-sach/phim-le"
  );
  return response.data.data.items;
});

const singleSlice = createSlice({
  name: "single",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingle.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSingle.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchSingle.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default singleSlice.reducer;
