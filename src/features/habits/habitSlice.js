import { createSlice } from "@reduxjs/toolkit";
import { createHabit, fetchHabits, updateHabit } from "./habitActions";
import { createTask, deleteTask } from "../tasks/taskActions";

const initialState = {
  loading: false,
  habits: [],
  error: null,
  success: false,
};

const habitSlice = createSlice({
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
    [createTask.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [createTask.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.habits = state.habits.map((habit) => {
        if (habit.id === payload.habit_id) {
          return {
            ...habit,
            tasks: [...habit.tasks, payload],
          };
        } else {
          return habit;
        }
      });
    },
    [createTask.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [updateHabit.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [updateHabit.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.habits = state.habits.map((habit) => {
        if (habit.id === payload.habit_id) {
          return {
            ...habit,
            ...payload,
          };
        } else {
          return habit;
        }
      });
    },
    [updateHabit.rejected]: (state, { payload }) => {
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
    [deleteTask.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [deleteTask.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.habits = state.habits.map((habit) => {
        if (habit.id === payload.habitId) {
          return {
            ...habit,
            tasks: habit.tasks.filter((task) => task.id !== payload.id),
          };
        } else {
          return habit;
        }
      });
    },
    [deleteTask.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default habitSlice.reducer;
