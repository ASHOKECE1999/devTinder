const express = require("express");
const userRouter = express.Router();
const userAuth = require("../middlewares/auth");
const ConnectRequestModel = require("../model/connectionRequestSchema");

// get all the pending connection request for the loggedIn User

userRouter.get("/user/request/received", userAuth, async (req, res) => {
  try {
    const loggedUserInfo = req.user;
    console.log(loggedUserInfo, "loggedUserInfo");
    const pendingRequest = await ConnectRequestModel.find({
      toUserId: loggedUserInfo._id,
      status: "interested",
    }).populate("fromUserId", ["firstName", "lastName"]);
    res.send(pendingRequest);
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});
module.exports = userRouter;
