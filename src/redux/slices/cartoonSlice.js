import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCartoon = createAsyncThunk(
  "cartoon/fetchCartoon",
  async () => {
    const response = await axios.get(
      "https://phimapi.com/v1/api/danh-sach/hoat-hinh"
    );
    return response.data.data.items;
  }
);

const cartoonSlice = createSlice({
  name: "cartoon",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartoon.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartoon.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCartoon.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default cartoonSlice.reducer;
