"use strict";

const router = require("express").Router();
const {
  BlogCategoryController,
  BlogPostController,
} = require("../controllers/blog.controller");

// Blog Category
router
  .route("/categories")
  .get(BlogCategoryController.list)
  .post(BlogCategoryController.create);

router
  .route("/categories/:categoryId")
  .get(BlogCategoryController.read)
  .put(BlogCategoryController.update)
  .patch(BlogCategoryController.update)
  .delete(BlogCategoryController.deletePost);

// Blog Post
router
  .route("/posts")
  .get(BlogPostController.list)
  .post(BlogPostController.create);

router
  .route("/posts/:postId")
  .get(BlogPostController.read)
  .put(BlogPostController.update)
  .patch(BlogPostController.update)
  .delete(BlogPostController.deletePost);

module.exports = router;
