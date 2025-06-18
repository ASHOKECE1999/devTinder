const express = require("express");
const userRouter = express.Router();
const userAuth = require("../middlewares/auth");

userRouter.post("/sendConnectionRequest", userAuth, (req, res) => {
  res.send("Here is your User Connection Details");
});
module.exports = userRouter;
