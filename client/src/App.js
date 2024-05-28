import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationForm from './components/registration/RegistrationForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home/Home';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

import LoginForm from './components/login/LoginForm';
import ForgetPassword from './components/forgetPassword/ForgetPassword';
import Dashboard from './components/dashboard/Dashboard';
import EditDashboard from './components/editDashboard/EditDashboard';


const App = () => {
 return (
  
    <Router>
      {/* <Header /> */}
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<LoginForm />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/edit/:id" element={<EditDashboard />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/forget" element={<ForgetPassword />} />

        {/* Add other routes as needed */}
      </Routes>
      <Footer />
    </Router>
 );
};

export default App;