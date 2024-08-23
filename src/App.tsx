import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp"; // Ensure SignUp is correctly imported
import OTPScreen from "./pages/auth/OTPScreen";
import ForgetPassword from "./pages/auth/ForgetPassword";
import ForgetChangePassword from "./pages/auth/ForgetChangePassword";
import Task from "./pages/auth/Task";
import CalendarMeeting from "./pages/auth/CalendarMeeting";

import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Dashboard />} /> */}
        <Route path="/" element={<CalendarMeeting />} />
        {/* <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/otp" element={<OTPScreen />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route
          path="/forgetchangepassword"
          element={<ForgetChangePassword />}
        /> */}
      </Routes>
    </Router>
  );
};

export default App;
