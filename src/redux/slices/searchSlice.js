// redux/slices/searchSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSearchResults = createAsyncThunk(
  "search/fetchSearchResults",
  async ({ keyword, limit = 20, page = 1 }) => {
    const response = await axios.get(
      `https://phimapi.com/v1/api/tim-kiem?keyword=${keyword}&limit=${limit}&page=${page}`
    );
    return {
      items: response.data.data.items,
      totalItems: response.data.data.params.pagination.totalItems,
      totalPages: response.data.data.params.pagination.totalPages,
      currentPage: response.data.data.params.pagination.currentPage,
    };
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    results: [],
    status: "idle",
    isFetchingMore: false,
    error: null,
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
  },
  reducers: {
    clearSearchResults(state) {
      state.results = [];
      state.currentPage = 1;
      state.totalItems = 0;
      state.totalPages = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state, action) => {
        if (action.meta.arg.page > 1) {
          state.isFetchingMore = true;
        } else {
          state.status = "loading";
        }
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isFetchingMore = false;
        state.results = state.results.concat(action.payload.items);
        state.totalItems = action.payload.totalItems;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.status = "failed";
        state.isFetchingMore = false;
        state.error = action.error.message;
      });
  },
});

export const { clearSearchResults } = searchSlice.actions;

export default searchSlice.reducer;
