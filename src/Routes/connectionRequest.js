const express = require("express");
const userAuth = require("../middlewares/auth");
const ConnectRequestModel = require("../model/connectionRequestSchema");
const requestRouter = express.Router();
const User = require("../model/user");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const user = req.user;
      console.log(user, "exiting User");
      const fromUserId = req.user;
      const toUserId = req.params.toUserId;
      const status = req.params.status;
      // write validation for checking the status should be in ignored state or interested
      const allowedStatusStates = ["ignored", "interested"].includes(status);
      console.log("itsPassed");
      if (!allowedStatusStates) {
        throw new Error("Hey its an Invalid Status Code");
      }
      console.log(user._id, toUserId, "isTrue");
      if (user._id === toUserId) {
        console.log("its came for same");
        throw new Error("Hey Self Request Not Allowed");
      }

      console.log("its passed 3");

      // handling duplicate edge cases where  same user cant send request 2 times and also we don't allow  toUserId to send duplicate Request
      const isRequestAlreadyExits = await ConnectRequestModel.findOne({
        $or: [
          {
            fromUserId,
            toUserId,
          },
          {
            fromUserId: toUserId,
            toUserId: fromUserId,
          },
        ],
      });
      console.log(isRequestAlreadyExits, "passed");

      if (isRequestAlreadyExits) {
        return res.status(400).send({
          message: "Connection Already Exits!!",
        });
      }

      // handle edge case where logged in user cannot create request for self

      // we don't allow  an unknown user to send request
      const isToUserIdExitsInDB = await User.findOne({ _id: toUserId });
      if (!isToUserIdExitsInDB) {
        throw new Error("Hey Dude!!! Invalid Credentials");
      }

      const connectionRequest = new ConnectRequestModel({
        fromUserId,
        toUserId,
        status,
      });
      await connectionRequest.save();
      res.send("Connection Happened SuccessFully");
    } catch (error) {
      res.status(400).send("Error on Making a Request" + error.message);
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestedId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestedId } = req.params;
      const allowedStates = ["accepted", "rejected"];
      //validations
      //1.requested id should equal to loggedInUser
      //2. status should be in accepted or rejected
      if (!allowedStates.includes(status)) {
        throw new Error("The Status is Invalid");
      }
      //3. requested id should be there in DB
      const connectionRequest = await ConnectRequestModel.findOne({
        fromUserId: requestedId,
        toUserId: loggedInUser._id,
        status: "interested",
      });
      // 5 already Exists one

      if (!connectionRequest) {
        return res.status(404).json({
          message: "Invalid Request",
        });
      }

      connectionRequest.status = status;
      const data = await connectionRequest.save();
      res.json({
        message: "Connection Request  " + connectionRequest.status,
        data,
      });
      //4. after validation save this Content
    } catch (err) {
      res.status(400).send(err.message);
    }
  }
);

module.exports = requestRouter;
