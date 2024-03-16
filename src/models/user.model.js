"use strict";

const mongoose = require("mongoose");
const passwordEncrypt = require("../helpers/passwordEncrypt");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: [true, "Email is required."],
      unique: true,
      //   validate: (email) => {
      //     return true;
      //   },
      validate: [
        (email) => email.includes("@") && email.includes("."),
        "Email is incorrect",
      ],
    },
    password: {
      type: String,
      trim: true,
      required: true,
      set: (password) => passwordEncrypt(password),
    },
    firstName: String,
    lastName: String,
  },
  { collection: "user", timestamps: true }
);

module.exports = {
  UserModel: mongoose.model("user", userSchema),
};
