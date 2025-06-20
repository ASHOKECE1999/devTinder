const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, password, emailId, age, gender, skills } =
    req.body;

  // Validate first name and last name
  if (!firstName || firstName.length < 4) {
    throw new Error("First name must be at least 4 characters long");
  }

  if (!lastName || lastName.length < 4) {
    throw new Error("Last name must be at least 4 characters long");
  }

  // Validate email
  if (!emailId || !validator.isEmail(emailId)) {
    throw new Error("Invalid email format");
  }

  // Validate password
  if (!password || password.length < 4) {
    throw new Error("Password must be at least 4 characters long");
  }

  // Validate gender (optional but if present, must be valid)
  if (gender && !["Male", "Female", "Others"].includes(gender)) {
    throw new Error("Please Enter Valid Gender Type");
  }

  // Validate skills length
  if (skills && Array.isArray(skills) && skills.length > 5) {
    throw new Error("Please Enter no more than 5 skills");
  }

  // Optional: Validate age is a number
  if (age && typeof age !== "number") {
    throw new Error("Age must be a number");
  }
};

const validateEditInfoData = (req) => {
  const allowedDataList = ["firstName", "lastName", "age", "gender", "skills"];
  const isAllowed = Object.keys(req.body).every((key) =>
    allowedDataList.includes(key)
  );
  if (!isAllowed) {
    throw new Error("Invalid Edit Request ");
  }
  return isAllowed;
};

const validatePasswordInfoData = (req) => {
  const allowedDataList = ["emailId", "password"];
  const isAllowed = Object.keys(req.body).every((key) =>
    allowedDataList.includes(key)
  );
  if (!isAllowed) {
    throw new Error("Invalid Edit Request ");
  }
  return isAllowed;
};
module.exports = {
  validateSignUpData,
  validateEditInfoData,
  validatePasswordInfoData,
};
