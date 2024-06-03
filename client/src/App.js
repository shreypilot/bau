import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./components/context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import LoginForm from "./components/login/LoginForm";
import Dashboard from "./components/dashboard/Dashboard";
import EditDashboard from "./components/editDashboard/EditDashboard";
import ResultDashboard from "./components/dashboard/ResultDashboard";

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

const AppContent = () => {
  const { currentUser } = useAuth();

  return (
    <Router>
      {currentUser && <Header />}
      <Routes>
        <Route
          path="/"
          element={currentUser ? <Navigate to="/home" /> : <LoginForm />}
        />
        <Route
          path="/home"
          element={currentUser ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/result"
          element={currentUser ? <ResultDashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/edit/:id"
          element={currentUser ? <EditDashboard /> : <Navigate to="/" />}
        />
      </Routes>
      {currentUser && <Footer />}
    </Router>
  );
};



export default App;
