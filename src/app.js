const express = require("express");

const app = express();

//this will only Handle GET call to /users

app.get("/user/:firstName/:lastName", (req, res) => {
  console.log(req.query);
  console.log(req.params);
  res.send({
    firstName: "Ashok Adivappa Gari",
    lastName: "Adivappa Gari",
  });
});

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

app.listen(3000, () => {
  console.log("Server successFully Running on port 3000");
});
