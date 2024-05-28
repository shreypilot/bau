// RegisterForm.js
import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DateOfBirthInput from "./DateOfBirthInput"; // Import the DateOfBirthInput component

function RegisterForm({ setView, handleRegisterSubmit }) {
  const [formData, setFormData] = useState({
    salutation: "",
    name: "",
    fatherName: "",
    category: "",
    gender: "",
    dob: null,
    email: "",
    mobileNumber: "",
    course: "",
    password: "",
    confirmPassword: "",
    fileUpload: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAvatarChange = (event) => {
    setFormData({ ...formData, fileUpload: event.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "dob") {
          value = value.toISOString().split("T")[0];
        }
        formDataToSend.append(key, value);
      });

      await axios.post("http://localhost:8002/register", formDataToSend);
      toast.success("Registration successful!", {
        onClose: () => {
          window.location.href = "/login";
        },
      });
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Error occurred during registration.");
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex -mx-3">
          <div className="w-1/2 px-3 mb-2">
            <label htmlFor="salutation" className="text-xs  font-semibold px-1">
              Salutation<span className="text-red-500">*</span>
            </label>
            <select
              id="salutation"
              name="salutation"
              value={formData.salutation}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-white rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
            >
              <option value="">Select Salutation</option>
              <option value="Mr">Mr.</option>
              <option value="Ms">Ms.</option>
              <option value="Mrs">Mrs.</option>
            </select>
          </div>
          <div className="w-1/2 px-3 mb-2">
            <label htmlFor="name" className="text-xs font-semibold px-1">
              Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
              placeholder="John Doe"
              required
            />
          </div>
        </div>
        <div className="flex -mx-3">
          <div className="w-1/2 px-3 mb-2">
            <label htmlFor="fatherName" className="text-xs font-semibold px-1">
              Father's Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="fatherName"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
              placeholder="John Doe Sr."
              required
            />
          </div>
          <div className="w-1/2 px-3 mb-2">
            <label htmlFor="category" className="text-xs font-semibold px-1">
              Category<span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-white border-2 border-gray-200 outline-none focus:border-indigo-500"
              required
            >
              <option value="">Select Category</option>
              <option value="General">General</option>
              <option value="EWS">EWS</option>
              <option value="OBC">OBC</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
            </select>
          </div>
        </div>
        <div className="flex -mx-3">
          <div className="w-1/2 px-3 mb-2">
            <label htmlFor="gender" className="text-xs font-semibold px-1">
              Gender<span className="text-red-500">*</span>
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-white border-2 border-gray-200 outline-none focus:border-indigo-500"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="w-1/2 px-3 mb-2 flex flex-col">
            <DateOfBirthInput formData={formData} setFormData={setFormData} />{" "}
          </div>
        </div>
        <div className="flex -mx-3">
          <div className="w-1/2 px-3 mb-2">
            <label htmlFor="email" className="text-xs font-semibold px-1">
              Email<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
              placeholder="John@example.com"
              required
            />
          </div>
          <div className="w-1/2 px-3 mb-2">
            <label
              htmlFor="mobileNumber"
              className="text-xs font-semibold px-1"
            >
              Mobile Number<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="mobileNumber"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
              placeholder="1234567890"
              required
            />
          </div>
        </div>
        <div className="flex -mx-3">
          <div className="w-full px-3 mb-3">
            <label htmlFor="course" className="text-xs font-semibold px-1">
              Course<span className="text-red-500">*</span>
            </label>
            <select
              id="course"
              name="course"
              value={formData.course}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-white rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
              required
            >
              <option value="">Select Course</option>
              <option value="B. Sc. (Ag)">B. Sc. (Ag)</option>
              <option value="B. Sc. (Hort)">B. Sc. (Hort)</option>
              <option value="M. Sc. (Ag)">M. Sc. (Ag)</option>
              <option value="Ph. D.">Ph. D.</option>
            </select>
          </div>
          <div className="w-full px-3 mb-2">
            <label htmlFor="fileUpload" className="text-xs font-semibold px-1">
              Upload Image<span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              id="fileUpload"
              name="fileUpload"
              onChange={handleAvatarChange}
              className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
              required
            />
          </div>
        </div>
        <div className="flex -mx-3">
          <div className="w-full px-3 mb-3">
            <label htmlFor="password" className="text-xs font-semibold px-1">
              Password<span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
              placeholder="************"
              required
            />
          </div>
          <div className="w-full px-3 mb-2">
            <label
              htmlFor="confirmPassword"
              className="text-xs font-semibold px-1"
            >
              Confirm Password<span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
              placeholder="************"
              required
            />
          </div>
        </div>
        <div className="flex -mx-3">
          <div className="w-full px-3 mb-2">
            <button
              type="submit"
              className="block w-full bg-green-700 hover:bg-green-500 focus:bg-green-500 text-white rounded-lg px-3 py-3 font-semibold"
              onClick={handleRegisterSubmit}
            >
              REGISTER NOW
            </button>
            <p className="flex justify-center mt-3 text-sm font-semibold text-gray-600 dark:text-gray-400 cursor-pointer">
              Already have an account?
              <span
                onClick={() => setView("login")}
                className="text-blue-500 cursor-pointer ml-1"
                onMouseOut={(e) => (e.target.style.textDecoration = "none")}
              >
                Sign In
              </span>
            </p>
          </div>
        </div>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default RegisterForm;
