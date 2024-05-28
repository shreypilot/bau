
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DateOfBirthInput({ formData, setFormData }) {
  const handleDateChange = (date) => {
    setFormData({ ...formData, dob: date });
  };

  return (
    <>
      <label htmlFor="dob" className="text-xs font-semibold px-1 pb-1">
        Date of Birth<span className="text-red-500">*</span>
      </label>
      <DatePicker
        selected={formData.dob}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy"
        placeholderText="DD/MM/YYYY"
        className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
        required
      />
    </>
  );
}

export default DateOfBirthInput;
