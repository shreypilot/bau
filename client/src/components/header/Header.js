import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { TbLogout } from "react-icons/tb";
import { AiOutlineClose } from "react-icons/ai";
import BauLogo from "../../assets/logo.png";
import "./header.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Header = ({
  handleSearch,
  handleChangeSearch,
  searchQuery,
  setSearchQuery,
}) => {
  const [isProfileOptionsOpen, setProfileOptionsOpen] = useState(false);
  const { setCurrentUser } = useAuth();
  const location = useLocation();
  const isHomePage = location.pathname === "/home";

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

  const handleClearSearch = () => {
    setSearchQuery("");
    window.location.reload();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <nav className="bg-green-500 py-2 h-28 flex items-center px-4 sticky top-0 shadow-md">
      <img
        style={{ height: "75px", width: "360px" }}
        src={BauLogo}
        alt="Logo"
        className="mr-auto"
      />
      {isHomePage && (
        <div className="max-w-md ">
          <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
            <div className="grid place-items-center h-full w-12 text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <input
              className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
              type="text"
              id="search"
              placeholder="Search something.."
              value={searchQuery}
              onChange={handleChangeSearch}
              onKeyDown={handleKeyDown}
            />

            {searchQuery && (
              <div
                className="grid place-items-center h-full w-12 text-gray-300 cursor-pointer"
                onClick={handleClearSearch}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="flex items-center text-white ml-6">
        <div
          className="flex items-center cursor-pointer"
          onClick={handleProfileOptionClick}
        >
          <CgProfile size={36} />
          <RiArrowDropDownLine size={36} />
        </div>
        {isProfileOptionsOpen && (
          <div className="absolute right-0 mt-12 w-48 bg-white rounded-lg shadow-lg z-10">
            <div className="py-2 px-2">
              <button
                onClick={handleLogout}
                className="text-gray-800 pl-2 hover:bg-gray-200 flex items-center hover:text-green-600 w-full text-left"
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
