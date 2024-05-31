import React from "react";
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

const Layout = ({ children }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";
    

  return (
    <>
      {!isLoginPage && <Header  />}
      {children}
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
                  <Dashboard  />
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
        </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
};

export default App;
