import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import ForgotPassword from "./components/auth/ForgotPassword";
import OTPVerification from "./components/auth/OTPVerification";
import ResetPassword from "./components/auth/ResetPassword";
import Dashboard from "./components/dashboard/Dashboard";
import PageNotFound from "./components/dashboard/PageNotFound";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { store } from "./store";
import { loadUser } from "./actions/userAction";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import Profile from "./components/user/Profile";
import EditProfile from "./components/user/EditProfile";
import ChangePassword from "./components/user/ChangePassword";
import ListUsers from "./components/user/ListUsers";

export default function App() {
  useEffect(() => {
    store.dispatch(loadUser);
  }, []);

  return (
    <main className="dark:bg-slate-900">
      <BrowserRouter>
        <HelmetProvider>
          <ToastContainer theme="dark" />

          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="forgotPassword" element={<ForgotPassword />} />
            <Route path="otpVerification" element={<OTPVerification />} />
            <Route path="resetPassword" element={<ResetPassword />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/:id"
              element={
                <ProtectedRoute>
                  <EditProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/changePassword/:id"
              element={
                <ProtectedRoute>
                  <ChangePassword />
                </ProtectedRoute>
              }
            />
            <Route
              path="/allUsers"
              element={
                <ProtectedRoute>
                  <ListUsers />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </HelmetProvider>
      </BrowserRouter>
    </main>
  );
}
