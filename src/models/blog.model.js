"use strict";

const mongoose = require("mongoose");

const blogCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      required: true,
    },
  },
  { collection: "BlogCategory", timestamps: true }
);

const blogPostSchema = new mongoose.Schema(
  {
    blogCategoryId: {
      type: mongoose.Schema.Types.ObjectId, // ForeignKey, RelationalId
      ref: "BlogCategory",
      required: true,
    },
    title: {
      type: String,
      trim: true,
      required: true,
      index: true,
    },
    content: {
      type: String,
      required: true,
      unique: true,
    },
    published: {
      type: Boolean,
      default: true,
    },
  },
  { collection: "blogPost", timestamps: true }
);

module.exports = {
  BlogCategoryModel: mongoose.model("BlogCategory", blogCategorySchema),
  BlogPostModel: mongoose.model("BlogPost", blogPostSchema),
};
