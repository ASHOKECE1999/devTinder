const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, password, email } = req.body;
  if (firstName.length < 4 || lastName.length < 4) {
    throw new Error("Please Enter valid User Name");
  }
};
module.exports = validateSignUpData;
