import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTVShow = createAsyncThunk(
  "tvShow/fetchTVShow",
  async (page = 1) => {
    const response = await axios.get(
      `https://phimapi.com/v1/api/danh-sach/tv-shows?page=${page}`
    );
    return response.data;
  }
);

const tvShowSlice = createSlice({
  name: "tvShow",
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
      .addCase(fetchTVShow.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTVShow.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.data.items || [];
        state.totalPages =
          action.payload.data.params.pagination.totalPages || 0;
      })
      .addCase(fetchTVShow.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const { setCurrentPage } = tvShowSlice.actions;
export default tvShowSlice.reducer;
