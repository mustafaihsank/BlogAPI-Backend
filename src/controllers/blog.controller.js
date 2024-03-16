"use strict";

require("express-async-errors");
const { BlogCategoryModel, BlogPostModel } = require("../models/blog.model");

module.exports = {
  BlogCategoryController: {
    list: async (req, res) => {
      // const data = await BlogCategoryModel.find();
      const data = await res.getModalList(BlogCategoryModel);
      res.status(200).send({
        err: false,
        details: await res.getModelListDetails(BlogCategoryModel),
        data,
      });
    },
    create: async (req, res) => {
      const data = await BlogCategoryModel.create(req.body);
      res.status(201).send({ err: false, data });
    },
    read: async (req, res) => {
      const data = await BlogCategoryModel.findOne({
        _id: req.params.categoryId,
      });
      res.status(202).send({ err: false, data });
    },
    update: async (req, res) => {
      const data = await BlogCategoryModel.updateOne(
        { _id: req.params.categoryId },
        { ...req.body }
      );
      res.status(202).send({ err: false, body: req.body, data });
    },
    deletePost: async (req, res) => {
      const data = await BlogCategoryModel.deleteOne({
        _id: req.params.categoryId,
      });
      res.status(200).send({ err: false, data });
    },
  },
  BlogPostController: {
    list: async (req, res) => {
      // Filtering & Searching & Sorting & Pagination -> Middleware icine aldik
      // const data = await BlogPostModel.find({ ...filter, ...search })
      // .sort({
      //   ...sort,
      // })
      // .skip(skip)
      // .limit(limit);
      const data = await res.getModalList(BlogPostModel, "blogCategoryId");
      res.status(200).send({
        err: false,
        details: await res.getModelListDetails(BlogPostModel),
        data,
      });
    },
    create: async (req, res) => {
      const data = await BlogPostModel.create(req.body);
      res.status(201).send({ err: false, data });
    },
    read: async (req, res) => {
      const data = await BlogPostModel.findOne({
        _id: req.params.postId,
      }).populate("blogCategoryId");
      res.status(202).send({ err: false, data });
    },
    update: async (req, res) => {
      const data = await BlogPostModel.updateOne(
        { _id: req.params.postId },
        { ...req.body }
      );
      res.status(202).send({ err: false, body: req.body, data });
    },
    deletePost: async (req, res) => {
      const data = await BlogPostModel.deleteOne({ _id: req.params.postId });
      res.status(200).send({ err: false, data });
    },
  },
};
