const express = require("express");
const connectDB = require("./config/database");
const User = require("./model/user");

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
  console.log(req.body);
  const userObj = req.body;
  const user = new User(userObj);
  try {
    await user.save();
    res.send("userAddedSuccessFully");
  } catch (err) {
    res.status(400).send("Bad Request on Saving User Data" + err.message);
  }
});

app.get("/user", async (req, res) => {
  console.log(req.body);
  try {
    const userData = await User.findOne({ firstName: req.body.firstName });
    if (userData.length !== 0) {
      res.send(userData);
    } else {
      res.status(400).send("No User Details Found on this Request");
    }
  } catch (err) {
    res.send("getting Error Try after some Time" + err);
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length !== 0) {
      res.send(users);
    } else {
      res.status(400).send("No User Details Found on this Request");
    }
  } catch (err) {
    res.send("getting Error Try after some Time" + err);
  }
});

app.put("/update", (req, res) => {
  const userId = req.body.Email;
});

app.delete("/delete", async (req, res) => {
  const userId = req.body.userId;
  console.log(userId);
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("User Deleted SuccessFully");
  } catch (err) {
    res.status(400).send("Bad Request on Saving User Data" + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("DB Connection Happened Successfully ");
    app.listen(3000, () => {
      console.log("Server successFully Running on port 3000");
    });
  })
  .catch(() => {
    console.log("HOO GOD SOMETHING HAPPENED PLEASE TRY AGAIN LATER");
  });
