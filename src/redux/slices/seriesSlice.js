import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSeries = createAsyncThunk("series/fetchSeries", async () => {
  const response = await axios.get(
    "https://phimapi.com/v1/api/danh-sach/phim-bo"
  );
  return response.data.data.items;
});

const seriesSlice = createSlice({
  name: "series",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSeries.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSeries.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchSeries.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default seriesSlice.reducer;
