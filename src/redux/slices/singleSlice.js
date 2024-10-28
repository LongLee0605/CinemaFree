import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSingle = createAsyncThunk(
  "single/fetchSingle",
  async (page = 1) => {
    const response = await axios.get(
      `https://phimapi.com/v1/api/danh-sach/phim-le?page=${page}`
    );
    return response.data;
  }
);
const singleSlice = createSlice({
  name: "single",
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
      .addCase(fetchSingle.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSingle.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.data.items || [];
        state.totalPages =
          action.payload.data.params.pagination.totalPages || 0;
      })
      .addCase(fetchSingle.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setCurrentPage } = singleSlice.actions;

export default singleSlice.reducer;
