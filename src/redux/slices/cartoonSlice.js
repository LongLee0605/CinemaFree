import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCartoon = createAsyncThunk(
  "cartoon/fetchCartoon",
  async (page = 1) => {
    const response = await axios.get(
      `https://phimapi.com/v1/api/danh-sach/hoat-hinh?page=${page}`
    );
    return response.data;
  }
);

const cartoonSlice = createSlice({
  name: "cartoon",
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
      .addCase(fetchCartoon.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartoon.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.data.items || [];
        state.totalPages = action.payload.data.params.pagination.totalPages || 0;
      })
      .addCase(fetchCartoon.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const { setCurrentPage } = cartoonSlice.actions;
export default cartoonSlice.reducer;
