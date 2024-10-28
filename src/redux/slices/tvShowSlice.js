import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTVShow = createAsyncThunk("tvShow/fetchTVShow", async () => {
  const response = await axios.get(
    "https://phimapi.com/v1/api/danh-sach/tv-shows"
  );
  return response.data.data.items;
});

const tvShowSlice = createSlice({
  name: "tvShow",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTVShow.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTVShow.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchTVShow.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default tvShowSlice.reducer;
