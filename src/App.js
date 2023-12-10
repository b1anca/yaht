import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGetDetailsQuery } from "./app/services/auth/authService";
import { setCredentials } from "./features/auth/authSlice";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProtectedRoute from "./routing/ProtectedRoute";
import HabitsScreen from "./screens/HabitsScreen";
import ProfileScreen from "./screens/ProfileScreen";
import CreateHabitScreen from "./screens/CreateHabitScreen";
import EditHabitScreen from "./screens/EditHabitScreen";
import HabitScreen from "./screens/HabitScreen";

function App() {
  const dispatch = useDispatch();

  const { data } = useGetDetailsQuery("userDetails", {
    pollingInterval: 900000,
  });

  if (localStorage.theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  useEffect(() => {
    if (data) dispatch(setCredentials(data));
  }, [data, dispatch]);

  return (
    <div className="bg-slate-100 dark:bg-[#0D1117] min-h-screen">
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/habits" element={<HabitsScreen />} />
          <Route path="/habits/new" element={<CreateHabitScreen />} />
          <Route path="/habits/:id/edit" element={<EditHabitScreen />} />
          <Route path="/habits/:id" element={<HabitScreen />} />
          <Route path="/user-profile" element={<ProfileScreen />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
