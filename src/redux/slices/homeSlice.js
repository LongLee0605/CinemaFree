import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchLatestMovies = createAsyncThunk(
  "latestMovies/fetchLatestMovies",
  async (page = 1) => {
    const response = await axios.get(
      `https://phimapi.com/danh-sach/phim-moi-cap-nhat?page=${page}`
    );
    return response.data;
  }
);

const latestMoviesSlice = createSlice({
  name: "latestMovies",
  initialState: {
    items: [],
    status: "idle",
    error: null,
    totalPages: 0,
    currentPage: 1,
    totalItems: 0,
  },
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLatestMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLatestMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.items || [];
        state.totalPages = action.payload.pagination.totalPages || 0;
        state.totalItems = action.payload.pagination.totalItems || 0;
      })
      .addCase(fetchLatestMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setCurrentPage } = latestMoviesSlice.actions;

export default latestMoviesSlice.reducer;
