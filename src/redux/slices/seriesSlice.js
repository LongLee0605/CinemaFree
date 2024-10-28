import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSeries = createAsyncThunk(
  "series/fetchSeries",
  async (page = 1) => {
    const response = await axios.get(
      `https://phimapi.com/v1/api/danh-sach/phim-bo?page=${page}`
    );
    return response.data;
  }
);

const seriesSlice = createSlice({
  name: "series",
  initialState: {
    items: [],
    status: "idle",
    error: null,
    totalPages: 0,
    currentPage: 1,
  },
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSeries.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSeries.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.data.items || [];
        state.totalPages =
          action.payload.data.params.pagination.totalPages || 0;
      })
      .addCase(fetchSeries.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setCurrentPage } = seriesSlice.actions;
export default seriesSlice.reducer;
