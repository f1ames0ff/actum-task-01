import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export const paginationSlice = createSlice({
  name: 'pagination',

  initialState: {
    value: 1,
  },

  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    setPage(state, action: PayloadAction<number>) {
      state.value = action.payload;
    }
  }
});

export const { increment, decrement, setPage } = paginationSlice.actions;
