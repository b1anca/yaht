import { createSlice } from "@reduxjs/toolkit";
import { createHabit, fetchHabits } from "./habitActions";

const initialState = {
  loading: false,
  habits: [],
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "habit",
  initialState,
  extraReducers: {
    [createHabit.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [createHabit.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.habits = state.habits.concat(payload);
    },
    [createHabit.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [fetchHabits.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchHabits.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.habits = payload;
    },
    [fetchHabits.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default authSlice.reducer;
