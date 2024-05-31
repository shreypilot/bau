import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import backgroundImage from "../../assets/background1.png";
import "react-toastify/dist/ReactToastify.css";
import ForgetPassword from "../forgetPassword/ForgetPassword";
import RegisterForm from "../registration/RegistrationForm";
import { useAuth } from "../context/AuthContext";

const LoginForm = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState("");
  const [view, setView] = useState("login");
  const [registerRole, setRegisterRole] = useState("Student");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8002/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

       if (response.ok) {
         console.log("Login successful");
         toast.success("Login successful!", {
           onClose: () => {
        login(data.token);
             navigate("/home");
           },
         });
       } else {
         setLoginError(data.error || "Login failed");
       }
    } catch (error) {
      console.error("Error occurred during login:", error);
      toast.error("Invalid email and password");
    }
  };



  const renderLogin = () => (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="email" className="text-xs font-semibold px-1 block">
          Email<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="email"
          name="email"
          onChange={handleInput}
          value={values.email}
          className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
          placeholder="John@example.com"
          required
        />
      </div>
      <div className="">
        <label htmlFor="password" className="text-xs font-semibold px-1 block">
          Password<span className="text-red-500">*</span>
        </label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleInput}
          value={values.password}
          className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
          placeholder="**********"
          required
        />
      </div>
      {loginError && <p className="text-red-500">{loginError}</p>}
      <p
        className="text-blue-500 flex justify-end my-2 text-sm cursor-pointer"
        onClick={() => setView("forgotPassword")}
      >
        Forgot your password?{" "}
      </p>
      <div className="mb-2">
        <button
          type="submit"
          className="block w-full bg-green-700 hover:bg-green-500 focus:bg-green-500 text-white rounded-lg px-3 py-3 font-semibold"
        >
          LOGIN
        </button>
      </div>

      <p className="text-sm flex justify-center">
        Don't have an account?{" "}
        <span
          className="text-blue-500 ml-1 cursor-pointer"
          onClick={() => setView("register")}
        >
          Register here
        </span>
      </p>
    </form>
  );

  return (
    <div
      className="w-screen flex justify-center relative h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full flex justify-center items-center px-6">
        <div className="border border-gray-500 bg-gray-100 opacity-80 shadow-lg rounded-lg py-4 px-8">
          <div className="text-center mb-2">
            <h1 className="font-bold text-2xl text-gray-900">
              {view === "login"
                ? "LOGIN NOW"
                : view === "register"
                ? "REGISTER NOW"
                : "FORGOT PASSWORD"}
            </h1>
            <p className="text-sm">
              {view === "login" && "Enter your information to login"}
              {view === "register" && "Enter your information to register"}
              {view === "forgotPassword" &&
                "Enter your email to reset password"}
            </p>
          </div>
          {view === "login" && renderLogin()}
          {view === "register" && (
            <RegisterForm
              setView={setView}
              setRegisterRole={setRegisterRole}
              registerRole={registerRole}
            />
          )}
          {view === "forgotPassword" && <ForgetPassword setView={setView} />}
        </div>
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
    </div>
  );
};

export default LoginForm;
