export function isValidEmail(email) {
  if (typeof email !== "string") return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function isValidFirstName(name) {
  if (typeof name !== "string") return false;

  // Trimming handles accidental leading/trailing whitespace
  const trimmedName = name.trim();

  // Regex Breakdown:
  // ^        : Start of string
  // [A-Za-z] : Matches any letter (uppercase or lowercase)
  // +        : Matches one or more of the preceding character
  // $        : End of string
  return /^[A-Za-z]+$/.test(trimmedName);
}



//Check validity of password on the frontend itself
//Minimum 
export function isStrongPassword(password) {
  const minLength = 8;

  // Regex checks
  // /[A-Z]/ is a rejex object. It basically scans for a pattern in a given string/pattern of characters and if its present .test returns true

  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasDigit = /[0-9]/.test(password);
  const hasSymbol = /[!@#$%^&*()_+\-=[\]{}|;:'",.<>/?`~]/.test(password);

  return (
    password.length >= minLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasDigit &&
    hasSymbol
  );
}

export function ValidateSignUpCredentials(name, email, password, setErrors) {
  const newErrors = {};

  // First Name Validation
  if (!name) {
    newErrors.name = "First name field can't be empty!";
  } else if (name.includes(" ")) {
    newErrors.name = "First name cannot contain spaces!";
  } else if (!isValidFirstName(name)) {
    newErrors.name = "First name cannot have numbers of special characters!";
  }

  // Email Validation
  if (!email) {
    newErrors.email = "Email field can't be empty!";
  } else if (email.includes(" ")) {
    newErrors.email = "Email cannot contain spaces!";
  } else if (!isValidEmail(email.trim())) {
    newErrors.email = "Please enter a valid email!";
  }

  // Password Validation
  if (!password) {
    newErrors.password = "Password field can't be empty!";
  } else if (password.includes(" ")) {
    newErrors.password = "Password cannot contain spaces!";
  } else if (!isStrongPassword(password)) {
    newErrors.password = `Password should have a minimum length of 8 characters and include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 symbol.`;
  }

  setErrors(newErrors);

  // Return true if no errors
  return Object.keys(newErrors).length === 0;
}

/*
   
   Above function helps to handle the following cases and not causing app to crash.
   -Empty name, email and password fields
   -Invalid name (containing special characters, numbers, spaces)
   -Invalid emails (containing spaces or not having @ or .xyz);
   -Invalid passwords (containing spaces, or not fulfulling requirements of strong password ( 1 of each lower, upper case letters, digits and symbols + minimum length should be 8)
   
*/
