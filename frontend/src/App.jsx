
import ForgotPassword from "./components/auth/ForgotPassword"
import Login from "./components/auth/Login"
import OTPVerification from "./components/auth/OTPVerification"
import ResetPassword from "./components/auth/ResetPassword"
import Dashboard from "./components/dashboard/Dashboard"
import PageNotFound from "./components/dashboard/PageNotFound"
import "./index.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom'

export default function App() {
  return (
    <main className="dark:bg-slate-900">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="forgotPassword" element={<ForgotPassword />} />
          <Route path="otpVerification" element={<OTPVerification />} />
          <Route path="resetPassword" element={<ResetPassword />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </main>
  )
}