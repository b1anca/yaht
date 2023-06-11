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
  extraReducers: (builder) => {
    builder.addCase(createHabit.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createHabit.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.habits = state.habits.concat(payload);
    });
    builder.addCase(createHabit.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(createTask.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createTask.fulfilled, (state, { payload }) => {
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
    });
    builder.addCase(createTask.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(updateHabit.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateHabit.fulfilled, (state, { payload }) => {
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
    });
    builder.addCase(updateHabit.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(fetchHabits.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchHabits.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.habits = payload;
    });
    builder.addCase(fetchHabits.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(deleteTask.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteTask.fulfilled, (state, { payload }) => {
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
    });
    builder.addCase(deleteTask.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export default habitSlice.reducer;
