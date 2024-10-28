import { configureStore } from "@reduxjs/toolkit";
import phimLeReducer from "./slices/singleSlice";
import phimBoReducer from "./slices/seriesSlice";
import hoatHinhReducer from "./slices/cartoonSlice";
import tvShowsReducer from "./slices/tvShowSlice";

const store = configureStore({
  reducer: {
    phimLe: phimLeReducer,
    phimBo: phimBoReducer,
    hoatHinh: hoatHinhReducer,
    tvShows: tvShowsReducer,
  },
});

export default store;
