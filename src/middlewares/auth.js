const jwt = require("jsonwebtoken");
const User = require("../model/user");

const userAuth = async (req, res, next) => {
  try {
    const { jwtToken } = req.cookies;
    console.log(jwtToken, "isItHere");
    const validateJwtToken = jwt.verify(jwtToken, "HeyAshokKumar@123");
    console.log(validateJwtToken);
    if (!validateJwtToken) {
      throw new Error("Invalid Token");
    }
    const userid = validateJwtToken._id;
    const userExist = await User.findOne({ _id: userid });
    if (!userExist) {
      throw new Error("User doesn't Exit");
    }
    req.user = userExist;
    next();
  } catch (error) {
    res.status(400).send("ERROR:" + error.message);
  }
};

// const adminAuth = (req, res, next) => {
//   const jwtToken = "abc";
//   const isUserAuthored = jwtToken === req.body?.auth;
//   if (!jwtToken) {
//     res.status(401).send("Please Login to test and validate this Data");
//   } else {
//     next();
//   }
// };

module.exports = userAuth;
