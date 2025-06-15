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
