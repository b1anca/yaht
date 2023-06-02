import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = process.env.REACT_APP_YAHT_API_URL;

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async ({ habitId, completed_at }, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.auth.userToken;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        `${API_URL}/habits/${habitId}/tasks`,
        { completed_at },
        config
      );

      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async ({ habitId, id }, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.auth.userToken;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.delete(`${API_URL}/habits/${habitId}/tasks/${id}`, config);

      return { id, habitId };
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
