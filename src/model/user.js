const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      toLowerCase: true,
      trim: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Hey Please SignUp with correct Email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 4,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["Male", "Female", "Others"].includes(value)) {
          throw new Error("Please Enter Valid Gender Type");
        }
      },
    },
    skills: {
      type: [String],
      validate(value) {
        if (value.length > 5) {
          throw new Error("Please Enter Skill Less than 5");
        }
      },
    },
    profileUrl: {
      type: String,
      default:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?cs=srgb&dl=pexels-pixabay-415829.jpg&fm=jpg",
    },
    about: {
      type: String,
      default: "Hey I am a developer",
    },
  },

  {
    timestamps: true,
  }
);

userSchema.index({ emailId: 1, unique: true });

userSchema.methods.getJWTToken = async function () {
  const user = this;
  const jwtTokenGeneration = await jwt.sign(
    { _id: user._id },
    "HeyAshokKumar@123",
    {
      expiresIn: "7d",
    }
  );
  return jwtTokenGeneration;
};

userSchema.methods.validateHashedPassword = async function (password) {
  const user = this;
  const userPassword = password;
  const hashedPassword = user.password;
  const isTrue = await bcrypt.compare(userPassword, hashedPassword);
  return isTrue;
};

module.exports = mongoose.model("User", userSchema);
