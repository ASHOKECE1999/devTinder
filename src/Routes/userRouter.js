const express = require("express");
const userRouter = express.Router();
const userAuth = require("../middlewares/auth");
const ConnectRequestModel = require("../model/connectionRequestSchema");
const User = require("../model/user");

// get all the pending connection request for the loggedIn User

const SAFE_DATA = ["firstName", "lastName", "about", "skills"];

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

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const allConnections = await ConnectRequestModel.find({
      $or: [
        {
          toUserId: loggedInUser._id,
          status: "accepted",
        },
        {
          fromUserId: loggedInUser._id,
          status: "accepted",
        },
      ],
    })
      .populate("fromUserId", ["firstName", "lastName", "skills"])
      .populate("toUserId", ["firstName", "lastName", "skills"]);

    if (!allConnections) {
      return res.send("You have No Connections");
    }
    console.log("-------------------------------------------------------");
    console.log(allConnections, "allConnections");
    console.log("-------------------------------------------------------");

    const responseSendData = allConnections.map((eachItem) => {
      if (loggedInUser._id.toString() === eachItem.toUserId._id.toString()) {
        return eachItem.fromUserId;
      }
      console.log("its came here");
      return eachItem.toUserId;
    });
    res.send(responseSendData);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectedUsers = await ConnectRequestModel.find({
      $or: [
        {
          fromUserId: loggedInUser._id,
        },
        {
          toUserId: loggedInUser._id,
        },
      ],
    });
    const hindFromUserFeed = new Set();
    connectedUsers.forEach((req) => {
      hindFromUserFeed.add(req.fromUserId);
      hindFromUserFeed.add(req.toUserId);
    });
    console.log(hindFromUserFeed);
    const userFeed = await User.find({
      $and: [
        {
          _id: {
            $nin: Array.from(hindFromUserFeed),
          },
        },
        {
          _id: {
            $ne: loggedInUser._id,
          },
        },
      ],
    }).select(SAFE_DATA);
    console.log(userFeed, "userFeed");
    res.send(userFeed);
  } catch (error) {
    res
      .status(400)
      .send("there is An error while Doing this Process" + error.message);
  }
});

module.exports = userRouter;
