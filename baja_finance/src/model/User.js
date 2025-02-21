const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    collegeEmailId: {
      type: String,
      required: true,
      unique: true,
    },
    collegeRollNumber: {
      type: String,
      required: true,
      unique: true,
    },
    dob: {
      type: String,
      required: true,
    },
    numbers: {
      type: [Number],
      default: [],
    },
    alphabets: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
