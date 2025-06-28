const express = require("express");
const userAuth = require("../middlewares/auth");
const bcrypt = require("bcrypt");
const profileRouter = express.Router();
const User = require("../model/user");
const {
  validateEditInfoData,
  validatePasswordInfoData,
} = require("../utils/validate");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  // console.log(req.cookies);
  try {
    // const { emailId, password } = req.body;
    // console.log(req.body);
    // const getUserDetails = await User.findOne({ emailId: emailId });
    // console.log(getUserDetails, "isThisOne");
    // if (!getUserDetails) {
    //   console.log("it Came here");
    //   throw new Error("Invalid Credentials");
    // }
    // if (getUserDetails.emailId.toString() !== emailId.toString()) {
    //   throw new Error("Bad request");
    // }
    const userExist = req.user;
    res.send(userExist);
  } catch (error) {
    res.status(400).send("Bad Request  " + error.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    const isEligibleForEdit = validateEditInfoData(req);
    console.log("itsCameHere");
    if (isEligibleForEdit) {
      const user = req.user;
      Object.keys(req.body).forEach((key) => (user[key] = req.body[key]));
      await user.save();
      res.json({
        message: `${user.lastName} Saved Successfully`,
        data: user,
      });
    }
  } catch (error) {
    res.status(400).send("InValid Edit Request" + error.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const isEligibleForEdit = validatePasswordInfoData(req);
    // console.log("itsCameHere");
    if (isEligibleForEdit) {
      console.log("came huhhuhu");
      const user = req.user;
      const hashedPassword = await bcrypt.hash(req.body.password, 4);
      user["password"] = hashedPassword;
      await user.save();
      res.json({
        message: `${user.lastName} Your Password Saved Successfully`,
        data: user,
      });
    }
  } catch (error) {
    res.status(400).send("InValid Password Edit Request " + error.message);
  }
});
profileRouter.patch("/profile/edit", userAuth, (req, res) => {});
module.exports = profileRouter;
