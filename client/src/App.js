import React, { useState } from "react";
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
import AdmitCard from "./components/admitCard/admitCard";

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

const AppContent = () => {
  const { currentUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);

  const handleSearch = async () => {
    try {
      if (searchQuery.trim() !== "") {
        const response = await fetch(
          `http://localhost:8002/searchusers?name=${searchQuery}&serial_number=${searchQuery}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const searchData = await response.json();
        setSearchResults(searchData);
        setNoResults(searchData.length === 0);
      } else {
        setSearchResults([]);
        setNoResults(false);
      }
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  const handleChangeSearch = (event) => {
    setSearchQuery(event.target.value);
  };
  return (
    <Router>
      {currentUser && (
        <Header
          searchQuery={searchQuery}
          handleChangeSearch={handleChangeSearch}
          handleSearch={handleSearch}
          setSearchQuery={setSearchQuery}
        />
      )}
      <Routes>
        <Route
          path="/"
          element={currentUser ? <Navigate to="/home" /> : <LoginForm />}
        />
        <Route
          path="/home"
          element={
            currentUser ? (
              <Dashboard noResults={noResults} searchResults={searchResults} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="/result" element={<ResultDashboard />} />
        <Route path="/admitcard" element={<AdmitCard />} />
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
