"use strict";

const router = require("express").Router();
const { UserController } = require("../controllers/user.controller");

// Login - Logout
router.post("/login", UserController.login);
router.all("/logout", UserController.logout);

// User Category
router.route("/").get(UserController.list).post(UserController.create);

router
  .route("/:userId")
  .get(UserController.read)
  .put(UserController.update)
  .patch(UserController.update)
  .delete(UserController.deletePost);

module.exports = router;
