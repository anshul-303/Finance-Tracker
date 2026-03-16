// This file is for login validation like empty fields in login form or invalid credentials, etc.

export function isValidEmail(email) {
  if (typeof email !== "string") return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function validateLoginCredentials(email, password, setErrors) {
  const newErrors = {};

  if (!email || email.trim() === "") {
    newErrors.email = "Email cannot be empty!";
  } else if (!isValidEmail(email.trim())) {
    newErrors.email = "Enter a valid email";
  }

  if (!password) {
    newErrors.password = "Password cannot be empty!";
  }
  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
}
