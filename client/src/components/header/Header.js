import React, { useState } from "react";
import "./header.css";
import BauLogo from "../../assets/logo.png";
// import { Navbar, Container, Nav } from 'react-bootstrap';
// import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
// import BauLog from '../../assets/bau-logo.png';

const Header = () => {
  // State to keep track of user's login status
  const [isLoggedIn] = useState(false);

  return (
    <nav class="flex align-center">
      <img style={{height:'75px',width:'360px'}}
        src={BauLogo}
        // alt="Your Logo"
      
        // className="d-inline-block align-top"
      />
      <ul>
        <li class="big-screens">
          <a href="/home">Home</a>
          <a href="/">Store</a>
          <a href="/">About Us</a>
          <a href="/register" class="btn register">
            Register
          </a>
          <a href="/" class="btn login">
            Log In
          </a>
        </li>
        <li class="small-screens">
          <i class="fa-solid fa-bars"></i>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
