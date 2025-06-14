const express = require("express");

const app = express();

app.use("/home", (req, res) => {
  res.send("Hello From the Server HOME");
});
app.use("/user", (req, res) => {
  res.send("Hello From the Server User");
});
app.use("/", (req, res) => {
  res.send("Hello From the Server");
});

app.listen(3000, () => {
  console.log("Server successFully Running on port 2000");
});
