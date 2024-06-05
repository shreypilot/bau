import React, { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EditDashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 

  const [inpval, setINP] = useState({
    salutation: "",
    name: "",
    father_name: "",
    category: "",
    gender: "",
    formatted_dob: "",
    email: "",
    mobile_number: "",
    course: "",
    image: null,
    state: "",
    district : "",
  });

  useEffect(() => {
    getdata();
  }, []);

  const getdata = async () => {
    try {
      const res = await fetch(`http://localhost:8002/induser/${id}`);
      if (!res.ok) {
        throw new Error("Network response was not ok.");
      }
      const data = await res.json();
      setINP(data[0]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const setdata = (e) => {
    const { name, value } = e.target;
    setINP((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const updateuser = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();
    formData.append("salutation", inpval.salutation);
    formData.append("name", inpval.name);
    formData.append("father_name", inpval.father_name);
    formData.append("category", inpval.category);
    formData.append("gender", inpval.gender);
    formData.append("formatted_dob", inpval.formatted_dob);
    formData.append("email", inpval.email);
    formData.append("mobile_number", inpval.mobile_number);
    formData.append("course", inpval.course);
    formData.append("course", inpval.state);
    formData.append("course", inpval.district);
    if (inpval.image) {
      formData.append("image", inpval.image);
    }

    const res = await axios.patch(
      `http://localhost:8002/updateuser/${id}`,
      formData
    );

    const data = res.data;
    if (res.status === 200) {
      console.log(data);
      toast.success("Profile updated successfully", {
        onClose: () => {
          navigate("/home");
        },
      });

    } else {
      toast.error("Failed to update profile");
    }
  } catch (error) {
    console.error("Error occurred during profile update:", error.message);
    toast.error("Error occurred during profile update");
  }
};


  return (
    <div className="flex justify-center items-center h-full mt-3 mb-3">
      <div className="w-full md:w-1/2 py-10 px-10 md:px-10 border border-gray-800 rounded-lg">
        <div className="text-center mb-2">
          <h1 className="font-bold text-3xl text-gray-900">UPDATE NOW</h1>
          <p>Enter your information to register</p>
        </div>
        <form>
          <div className="flex -mx-3">
            <div className="w-1/2 px-3 mb-2">
              <label
                htmlFor="salutation"
                className="text-xs font-semibold px-1"
              >
                Salutation<span className="text-red-500">*</span>
              </label>
              <select
                id="salutation"
                name="salutation"
                value={inpval.salutation}
                onChange={setdata}
                className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
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
                value={inpval.name}
                onChange={setdata}
                className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                placeholder="John Doe"
                required
              />
            </div>
          </div>
          <div className="flex -mx-3">
            <div className="w-1/2 px-3 mb-2">
              <label
                htmlFor="fatherName"
                className="text-xs font-semibold px-1"
              >
                Father's Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="father_name"
                name="father_name"
                value={inpval.father_name}
                onChange={setdata}
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
                value={inpval.category}
                onChange={setdata}
                className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
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
                value={inpval.gender}
                onChange={setdata}
                className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="w-1/2 px-3 mb-2 flex flex-col">
              <label htmlFor="formatted_dob" className="text-xs font-semibold px-1 pb-1">
                Date of Birth<span className="text-red-500">*</span>
              </label>
              <DatePicker
                dateFormat="dd/MM/yyyy"
                selected={inpval.formatted_dob}
                onChange={(date) =>
                  setINP((preval) => ({ ...preval, formatted_dob: date }))
                }
                // placeholderText="DD/MM/YYYY"
                className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                required
              />
            </div>
          </div>

          <div className="flex -mx-3">
            <div className="w-1/2 px-3 mb-2">
              <label htmlFor="state" className="text-xs font-semibold px-1">
                state<span className="text-red-500">*</span>
              </label>
              <input
                type="state"
                id="state"
                name="state"
                value={inpval.state}
                onChange={setdata}
                className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                placeholder="John@example.com"
                required
              />
            </div>
            <div className="w-1/2 px-3 mb-2">
              <label htmlFor="district" className="text-xs font-semibold px-1">
                district<span className="text-red-500">*</span>
              </label>
              <input
                type="district"
                id="district"
                name="district"
                value={inpval.district}
                onChange={setdata}
                className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                placeholder="John@example.com"
                required
              />
            </div>
          </div>
          <div className="flex -mx-3">
            <div className="w-1/2 px-3 mb-2">
              <label htmlFor="email" className="text-xs font-semibold px-1">
                Email<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={inpval.email}
                onChange={setdata}
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
                id="mobile_number"
                name="mobile_number"
                value={inpval.mobile_number}
                onChange={setdata}
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
                value={inpval.course}
                onChange={setdata}
                className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
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
              <label htmlFor="image" className="text-xs font-semibold px-1">
                Upload Image<span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={(e) =>
                  setINP((preval) => ({
                    ...preval,
                    image: e.target.files[0],
                  }))
                }
                className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                required
                placeholder={inpval.image}
              />
            </div>
          </div>

          <div className="flex -mx-3">
            <div className="w-full px-3 mb-2">
              <button
                type="submit"
                className="block w-full mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
                onClick={updateuser}
              >
                UPDATE PROFILE
              </button>

              <p className="mt-6 text-sm font-semibold text-gray-600 dark:text-gray-400 cursor-pointer">
                Already have an account?
                <span className="text-blue-600 dark:text-red-500 hover:text-blue-700 focus:text-blue-700 active:text-blue-800">
                  <NavLink
                    className="ml-1"
                    to="/login"
                    style={{ color: "indigo", textDecoration: "none" }}
                  >
                    Sign In
                  </NavLink>
                </span>
              </p>
            </div>
          </div>
        </form>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </div>
  );
};

export default EditDashboard;
