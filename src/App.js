import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProtectedRoute from "./routing/ProtectedRoute";
import DashboardScreen from "./screens/DashboardScreen";
import HabitsScreen from "./screens/HabitsScreen";
import ProfileScreen from "./screens/ProfileScreen";
import CreateHabitScreen from "./screens/CreateHabitScreen";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardScreen />} />
          <Route path="/habits" element={<HabitsScreen />} />
          <Route path="/habits/new" element={<CreateHabitScreen />} />
          <Route path="/user-profile" element={<ProfileScreen />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
