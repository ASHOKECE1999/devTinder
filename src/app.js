const express = require("express");
const bcrypt = require("bcrypt");
const connectDB = require("./config/database");
const User = require("./model/user");
const validateSignUpData = require("./utils/validate");

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
  //validate the request data
  // encrypt the password
  try {
    validateSignUpData(req);
    console.log(req.body);
    const password = req.body.password;
    const hashedPassword = bcrypt.hash(password, 20);
    const userObj = {
      fistName,
      lastName,
      emailId,
      password: hashedPassword,
      age,
      gender,
      skills,
    };
    const user = new User(userObj);
    await user.save();
    res.send("userAddedSuccessFully");
  } catch (err) {
    res.status(400).send("Bad Request on Saving User Data" + err.message);
  }
});

app.get("/user", async (req, res) => {
  console.log(req.body);
  try {
    const userData = await User.findById({ _id: req.body.userId });
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

app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  console.log();

  try {
    const isUpdateEnable = Object.keys(req.body).includes("emailId");
    if (isUpdateEnable) {
      throw new Error("Hey Update Not Enabled");
    }
    const user = await User.findByIdAndUpdate({ _id: userId }, req.body, {
      returnDocument: "before",
      runValidators: true,
    });
    console.log(user);
    res.json({
      message: "User Updated Successfully",
      user: user,
    });
  } catch (err) {
    res.status(400).send("Bad Request on Saving User Data" + err.message);
  }
});

app.delete("/user", async (req, res) => {
  const userId = req?.body?.userId;
  console.log(userId);
  try {
    if (userId === undefined) {
      throw new Error("Hey invalid ID");
    }
    const user = await User.deleteOne({ _id: userId });
    console.log(user);
    if (user.deletedCount < 1) {
      throw new Error("Hey invalid ID");
    }
    console.log(user);
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
