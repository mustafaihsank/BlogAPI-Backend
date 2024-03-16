"use strict";

require("express-async-errors");
const { UserModel } = require("../models/user.model");
const passwordEncrypt = require("../helpers/passwordEncrypt");

module.exports = {
  UserController: {
    list: async (req, res) => {
      // const data = await UserModel.find();
      const data = await res.getModelList(UserModel);
      res.status(200).send({ err: false, data });
    },
    create: async (req, res) => {
      const data = await UserModel.create(req.body);
      res.status(201).send({ err: false, data });
    },
    read: async (req, res) => {
      const data = await UserModel.findOne({ _id: req.params.userId });
      res.status(202).send({ err: false, data });
    },
    update: async (req, res) => {
      const data = await UserModel.updateOne(
        { _id: req.params.userId },
        { ...req.body }
      );
      res.status(202).send({ err: false, body: req.body, data });
    },
    deletePost: async (req, res) => {
      const data = await UserModel.deleteOne({ _id: req.params.userId });
      res.status(200).send({ err: false, data });
    },
    login: async (req, res) => {
      const { email, password } = req.body;

      if (email && password) {
        const user = await UserModel.findOne({
          email,
        });
        if (user && user.password === passwordEncrypt(password)) {
          /* COOKIES */
          req.session.id = user.id;
          req.session.password = user.password;

          // Bu if-check olursa süresi oldugu icin cookie olur!
          // Kullanici login yaptiginda remindMe true yolladiysa
          if (req.body?.remindMe) {
            req.session.remindMe = req.body.remindMe;
            req.sessionOptions.maxAge = 1000 * 60 * 60 * 24 * 3;
          }
          /* COOKIES */

          res.send({
            err: false,
            message: "Login OK",
            user,
          });
        } else {
          throw new Error("Email or password wrong.");
        }
      } else {
        throw new Error("Email and password required.");
      }
    },
    logout: async (req, res) => {
      req.session = null;
      res.status(200).send({
        err: false,
        message: "Logout OK",
      });
    },
  },
};
