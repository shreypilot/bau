import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/context/AuthContext";
import RegistrationForm from "./components/registration/RegistrationForm";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home/Home";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import LoginForm from "./components/login/LoginForm";
import ForgetPassword from "./components/forgetPassword/ForgetPassword";
import Dashboard from "./components/dashboard/Dashboard";
import EditDashboard from "./components/editDashboard/EditDashboard";
import ProtectedRoute from "./components/ProtectedRoutes";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute>
                <EditDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/forget" element={<ForgetPassword />} />
          {/* Add other routes as needed */}
        </Routes>
        {/* <Footer /> */}
      </Router>
    </AuthProvider>
  );
};

export default App;
