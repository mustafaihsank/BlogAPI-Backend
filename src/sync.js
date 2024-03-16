"use strict";

const { BlogCategoryModel, BlogPostModel } = require("./models/blog.model");
const { UserModel } = require("./models/user.model");

module.exports = async () => {
  /* BlogCategoryModel */

  // Get first BlogCategoryModel:
  // const BlogCategoryModel = await BlogCategoryModel.findOne();
  // // console.log(BlogCategoryModel._id)

  // if (BlogCategoryModel) {
  //   BlogPostModel.updateMany(
  //     {
  //       //? Filter:
  //       blogCategoryId: { $exists: false }, // field yok ise
  //     },
  //     {
  //       //? Update:
  //       blogCategoryId: BlogCategoryModel._id, // kaydı ata
  //     }
  //   ).catch((err) => console.log(err));
  // }

  /* UserCategoryModel */
  await UserModel.deleteMany().then(() => console.log(" - User Deleted All"));
  await BlogCategoryModel.deleteMany().then(() =>
    console.log(" - BlogCategory Deleted All")
  );
  await BlogPostModel.deleteMany().then(() =>
    console.log(" - BlogPost Deleted All")
  );

  // Example User:
  const user = await UserModel.create({
    email: "test@test.com",
    password: "12345678",
    firstName: "Test",
    lastName: "Test",
  });
  // Example Category:
  const createdCategory = await BlogCategoryModel.create({
    name: "Test Category",
  });
  // Example Posts:
  for (let key in [...Array(200)]) {
    await BlogPostModel.create({
      userId: user._id,
      blogCategoryId: createdCategory._id,
      title: `test ${key} title` || "test title",
      content: `test ${key} content` || "test content",
      published: Boolean(key % 2),
    });
  }

  // End:
  console.log("* Synchronized *");
  /* Finished */
};
