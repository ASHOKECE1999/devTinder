const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const User = require("../model/user");
const { validateSignUpData } = require("../utils/validate");
authRouter.post("/signup", async (req, res) => {
  //validate the request data
  // encrypt the password
  try {
    const { firstName, lastName, password, emailId, skills, age, gender } =
      req.body;
    validateSignUpData(req);
    const hashedPassword = await bcrypt.hash(password, 4);
    const userObj = {
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
      age,
      gender,
      skills,
    };
    const user = new User(userObj);
    await user.save();
    res.send("userAddedSuccessFully");
  } catch (err) {
    res.status(400).send("Bad Request on Saving User Data" + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  console.log("we got hiy");
  try {
    const { emailId, password } = req.body;
    console.log(req.body);
    const getUserDetails = await User.findOne({ emailId: emailId });
    console.log(getUserDetails, "isThisOne");
    if (!getUserDetails) {
      console.log("it Came here");
      throw new Error("Invalid Credentials");
    }
    const isExit = await getUserDetails.validateHashedPassword(password);
    console.log(isExit);
    if (isExit) {
      const jwtTokenGeneration = await getUserDetails.getJWTToken();
      console.log(jwtTokenGeneration, "isItPrintHere");
      const token = res.cookie("jwtToken", jwtTokenGeneration);
      res.send("Logged In SuccessFully");
    } else {
      res.status(400).send("Please Enter Valid Password");
    }
  } catch (error) {
    res.send(error.message);
  }
});

authRouter.post("/logout", (req, res) => {
  res.cookie("jwtToken", null, { expires: new Date(Date.now()) });
  res.send("SuccessFullyLogout");
});

module.exports = authRouter;
