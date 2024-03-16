"use strict";

// Pass-Encryption -> PBKDF2
const crypto = require("crypto");
const keyCode = process.env.SECRET_KEY || "write_random_chars_in_here"; // gizli anahtar
const loopCount = 10000; // kac kere sifrelenecegi
const charCount = 32; // write 32 for 64
const encType = "sha512"; // algoritma

module.exports = (password) => {
  return crypto
    .pbkdf2Sync(password, keyCode, loopCount, charCount, encType)
    .toString("hex");
};
