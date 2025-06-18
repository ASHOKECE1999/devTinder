const express = require("express");
const cookieParser = require("cookie-parser");
const userAuth = require("./middlewares/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const connectDB = require("./config/database");
const User = require("./model/user");
const validateSignUpData = require("./utils/validate");

const app = express();
app.use(cookieParser());
app.use(express.json());

app.post("/signup", async (req, res) => {
  //validate the request data
  // encrypt the password
  try {
    const { firstName, lastName, password, emailId, skills, age, gender } =
      req.body;
    validateSignUpData(req);
    const hashedPassword = await bcrypt.hash(password, 4);
    const userObj = {
      firstName,
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

app.post("/login", async (req, res) => {
  console.log("we got hiy");
  try {
    const { emailId, password } = req.body;
    const getUserDetails = await User.findOne({ emailId: emailId });
    console.log(getUserDetails);
    if (!getUserDetails) {
      throw new Error("Invalid Credentials");
    }
    const isExit = await getUserDetails.validateHashedPassword(password);

    console.log(isExit);
    if (isExit) {
      const jwtTokenGeneration = await getUserDetails.getJWTToken();
      console.log(jwtTokenGeneration, "isItPrintHere");
      const token = res.cookie("jwtToken", jwtTokenGeneration);
      res.send("Logged In SuccessFully");
    } else {
      res.status(400).send("Please Enter Valid Password");
    }
  } catch (error) {
    res.send(error);
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

app.post("/profile", userAuth, async (req, res) => {
  console.log(req.cookies);
  try {
    const userExist = req.user;
    res.send(userExist);
  } catch (error) {
    res.status(400).send("Bad Request");
  }
});

app.post("/sendConnectionRequest", userAuth, (req, res) => {
  res.send("Here is your User Connection Details");
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
