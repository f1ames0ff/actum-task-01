import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { paginationSlice } from "./reducers/pagination.reducer";
import { searchSlice } from "./reducers/search.reducer";

export const appStore = configureStore({
  reducer: combineReducers({
    searchReducer: searchSlice.reducer,
    paginationReducer: paginationSlice.reducer
  })
});
