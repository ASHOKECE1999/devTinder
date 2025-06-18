const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, password, email } = req.body;
  if (firstName.length < 4 || lastName.length < 4) {
    throw new Error("Please Enter valid User Name");
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
