import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./Features/search/searchSlice";
import homeReducer from "./Features/home/homeSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    home: homeReducer,
  },
});
