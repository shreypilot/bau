import React, { useState } from "react";

const ForgetPassword = ({ setView }) => {
  const [email, setEmail] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);

  const handleEmailInput = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add the logic to submit the email and request OTP
    // For now, let's just toggle the showOtpField state
    setShowOtpField(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="email" className="text-xs font-semibold px-1 block">
          Email<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="email"
          name="email"
          onChange={handleEmailInput}
          value={email}
          className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
          placeholder="John@example.com"
          required
        />
      </div>
      <div className="mb-4">
        <button
          type="submit"
          className="block w-full bg-green-700 hover:bg-green-500 focus:bg-green-500 text-white rounded-lg px-3 py-3 font-semibold"
        >
          RESET PASSWORD
        </button>
      </div>
      {showOtpField && (
        <div className="mb-4">
          <label htmlFor="otp" className="text-xs font-semibold px-1 block">
            Enter OTP<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="otp"
            name="otp"
            className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
            placeholder="Enter OTP"
            required
          />
        </div>
      )}
      <p className="text-sm">
        Remember your password?{" "}
        <span
          className="text-blue-500 cursor-pointer"
          onClick={() => setView("login")}
        >
          Login here
        </span>
      </p>
    </form>
  );
};

export default ForgetPassword;
