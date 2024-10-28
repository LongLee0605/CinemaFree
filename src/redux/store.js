import { configureStore } from "@reduxjs/toolkit";
import phimLeReducer from "./slices/singleSlice";
import phimBoReducer from "./slices/seriesSlice";
import hoatHinhReducer from "./slices/cartoonSlice";
import tvShowsReducer from "./slices/tvShowSlice";
import searchReducer from "./slices/searchSlice";

const store = configureStore({
  reducer: {
    phimLe: phimLeReducer,
    phimBo: phimBoReducer,
    hoatHinh: hoatHinhReducer,
    tvShows: tvShowsReducer,
    search: searchReducer,
  },
});

export default store;
