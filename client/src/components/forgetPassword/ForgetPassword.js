import React, { useState } from "react";

const ForgetPassword = ({ setView }) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  const handleEmailInput = (event) => {
    setEmail(event.target.value);
  };

  const handleOtpInput = (event) => {
    setOtp(event.target.value);
  };

  const handleNewPasswordInput = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordInput = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!showOtpField) {
      // Here you can add the logic to submit the email and request OTP
      // For now, let's just toggle the showOtpField state
      setShowOtpField(true);
    } else if (!showPasswordFields && otp !== "") {
      // Here you can add the logic to verify the OTP
      // For now, let's just toggle the showPasswordFields state
      setShowPasswordFields(true);
    } else if (
      showPasswordFields &&
      newPassword !== "" &&
      confirmPassword !== ""
    ) {
      // Here you can add the logic to submit the new password
      // For now, let's just log the new password
      console.log("New Password:", newPassword);
      // After submitting the new password, you can navigate to another view or perform any other action
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {!showOtpField && (
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
      )}

      {showOtpField && !showPasswordFields && (
        <div className="mb-4">
          <label htmlFor="otp" className="text-xs font-semibold px-1 block">
            Enter OTP<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="otp"
            name="otp"
            onChange={handleOtpInput}
            value={otp}
            className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
            placeholder="Enter OTP"
            required
          />
        </div>
      )}

      {showPasswordFields && (
        <>
          <div className="mb-4">
            <label
              htmlFor="newPassword"
              className="text-xs font-semibold px-1 block"
            >
              New Password<span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              onChange={handleNewPasswordInput}
              value={newPassword}
              className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
              placeholder="Enter New Password"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="text-xs font-semibold px-1 block"
            >
              Confirm Password<span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              onChange={handleConfirmPasswordInput}
              value={confirmPassword}
              className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
              placeholder="Confirm New Password"
              required
            />
          </div>
        </>
      )}

      <div className="mb-4">
        <button
          type="submit"
          className="block w-full bg-green-700 hover:bg-green-500 focus:bg-green-500 text-white rounded-lg px-3 py-3 font-semibold"
        >
          {showOtpField
            ? showPasswordFields
              ? "Change Password"
              : "Verify OTP"
            : "Reset Password"}
        </button>
      </div>
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
