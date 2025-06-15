const mongoose = require("mongoose");

const connectionURL =
  "mongodb+srv://ashokkumarece2020:pe5bpSqaVvH8J2B4@nodejsproject.2xjwwhd.mongodb.net/devTinder";

const connectDB = async () => {
  await mongoose.connect(connectionURL);
};
module.exports = connectDB;
