const express = require("express");
const userAuth = require("../middlewares/auth");
const ConnectRequestModel = require("../model/connectionRequestSchema");
const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const user = req.user;
      const fromUserId = req.user;
      const toUserId = req.params.toUserId;
      const status = req.params.status;
      const connectionRequest = new ConnectRequestModel({
        fromUserId,
        toUserId,
        status,
      });
      await connectionRequest.save();
      res.send("Connection Happened SuccessFully");
    } catch (error) {
      res.status(400).send("Error on Making a Request");
    }
  }
);

module.exports = requestRouter;
