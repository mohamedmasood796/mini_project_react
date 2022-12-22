import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Button } from "antd";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Profile from "./pages/Profile";
import UserList from "./pages/admin/UserList";

function App() {
  const {loading}=useSelector(state=>state.alerts)
  return (
    <Router>
      {loading && (
        <div className="spinner-parent">
        <div class="spinner-border text-primary" role="status">
        </div>
      </div>
      )}
      
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/login" element={
          <PublicRoute><Login /></PublicRoute>
        } />
        <Route path="/register" element={
          <PublicRoute><Register /></PublicRoute>
        } />
        <Route path="/" element={
          <ProtectedRoute><Home /></ProtectedRoute>
        } />
         <Route path="/profile" element={
          <ProtectedRoute><Profile /></ProtectedRoute>
        } />
          <Route path="/admin/userslist" element={
          <ProtectedRoute><UserList /></ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
