const express = require("express");
const app = express();
const { userAuth } = require("./middleware");

app.use("/user", userAuth);

app.get("/user", (req, res) => {
  throw new Error("Hey Error Occurred");
  res.send("Testing started");
});

app.use("/", (err, req, res, next) => {
  res.send("Hey Dear there is an Error try after some Time Please");
});

// our first Path

// our app will listen all calls in port 3000

app.listen(3000, () => {
  console.log("Our App Started Listening at port 3000");
});

app.get(
  "/user/sendData",
  (req, res, next) => {
    //   console.log(req.query);
    //   console.log(req.params);
    console.log(req.params);
    next();
    // res.send({
    //   firstName: "Ashok Adivappa Gari",
    //   lastName: "Adivappa Gari",
    // });
  },
  (req, res, next) => {
    res.send("Hey this is 2ndSecond Response");
    next();
  },
  (req, res) => {
    // res.send("Hey this is 3ndSecond Response");
  },
  (req, res) => {
    res.send("Hey this is 4ndSecond Response");
  }
);

app.post("/user", (req, res) => {
  console.log("saveData");
  res.send("Hey this is for post Data");
});

app.delete("/user", (req, res) => {
  res.send("user deleted SuccessFully");
});

// this will match all the HTTP method API calls  to /test
app.use("/test", (req, res) => {
  res.send("Hello From the Server Test");
});
