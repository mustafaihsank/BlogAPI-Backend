"use strict";
// Blog API with mongoose

require("dotenv").config();
const PORT = process.env.PORT || "8000";
const HOST = process.env.HOST || "127.0.0.1";
const express = require("express");
const app = express();
app.use(express.json());
require("./src/configs/dbConnection");
const session = require("cookie-session");

app.use(
  session({
    secret: process.env.SECRET_KEY, // Sifreleme anahtari
    // maxAge: 1000 * 60 * 60 * 24 * 3, // millisecond cinsinden // 3 days // bu sekilde vakit süre globalde oldugu icin tüm cookieler bu sekilde olur ve session olmaz
  })
);

// Check Logined user
app.use(require("./src/middlewares/userControl"));

// Filter, Search, Sort, Page
app.use(require("./src/middlewares/findSearchSortPage"));

app.all("/", (req, res) => {
  // res.send("WELCOME BLOG API PROJECT");
  if (req.isLogin) {
    res.send({
      err: false,
      message: "WELCOME BLOG API PROJECT",
      session: req.session,
      user: req.user,
    });
  } else {
    res.send({
      err: false,
      message: "WELCOME BLOG API PROJECT",
      session: req.session,
    });
  }
});

app.use("/user", require("./src/routes/user.router"));
app.use("/blog", require("./src/routes/blog.router"));

app.use(require("./src/middlewares/errorHandler"));
app.listen(PORT, HOST, () => console.log(`Server is running on port ${PORT}.`));

// require("./src/sync")();
