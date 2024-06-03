import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { TbLogout } from "react-icons/tb";
import BauLogo from "../../assets/logo.png";
import "./header.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const [isProfileOptionsOpen, setProfileOptionsOpen] = useState(false);
  const { currentUser, setCurrentUser } = useAuth();

  const handleProfileOptionClick = () => {
    setProfileOptionsOpen(!isProfileOptionsOpen);
  };

  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.post("http://localhost:8002/logout", { token });
      localStorage.removeItem("token");
      setCurrentUser(null);

      navigate("/");
    } catch (error) {
      alert("Failed to logout");
    }
  };

  return (
    <nav className="bg-green-500 py-2 h-28 flex items-center px-4 sticky top-0">
      <img
        style={{ height: "75px", width: "360px" }}
        src={BauLogo}
        alt="Logo"
      />
      <div className="flex justify-end mx-4 items-center text-white relative">
        <div className="mx-4">
          <Link to="/home">Home</Link>
        </div>

        <div className="flex rounded-lg p-1">
          <CgProfile
            size={36}
            className="cursor-pointer"
            onClick={handleProfileOptionClick}
          />
          <RiArrowDropDownLine
            size={36}
            className="cursor-pointer"
            onClick={handleProfileOptionClick}
          />
        </div>

        {isProfileOptionsOpen && (
          <div className="absolute right-0 top-3 mt-10 w-48 bg-white rounded-lg shadow-lg z-10">
            <div className="py-2 px-2">
              <button
                onClick={handleLogout}
                className="text-gray-800 pl-2 hover:bg-gray-200 flex items-center hover:text-green-600"
              >
                <TbLogout className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
