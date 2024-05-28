export function validateForm(formData) {
    const errors = {};
  
    // Check if any field is empty
    for (const key in formData) {
      if (
        key !== "fileupload" &&
        key !== "confirmPasswordVisible" &&
        !formData[key]
      ) {
        errors[key] = "This field is required";
      }
    }
  
    // Check if password and confirm password match
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
  
    return errors;
  }