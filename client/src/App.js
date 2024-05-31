import React, { useState } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AuthProvider } from "./components/context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import LoginForm from "./components/login/LoginForm";
import Dashboard from "./components/dashboard/Dashboard";
import EditDashboard from "./components/editDashboard/EditDashboard";
import ProtectedRoute from "./components/ProtectedRoutes";
import ResultDashboard from "./components/dashboard/ResultDashboard";
const Layout = ({ children }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  return (
    <>
      {!isLoginPage && <Header onSearchResults={handleSearchResults} />}
      {React.cloneElement(children, { searchResults })}
      {!isLoginPage && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Layout>
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
            <Route path="/result" element={<ResultDashboard />} />
            <Route
              path="/edit/:id"
              element={
                <ProtectedRoute>
                  <EditDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
};

export default App;
