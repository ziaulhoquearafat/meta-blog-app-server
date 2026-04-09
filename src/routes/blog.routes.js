const express = require("express");
const Blog = require("../models/blog.models");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("This is the blogs section");
});

// post a new blogs
router.post("/add-post", async (req, res) => {
  const newBlog = new Blog({
    ...req.body,
  });

  const blog = await newBlog.save();
  res.status(200).send({ message: "Post is created Successfully", blog });
});

module.exports = router;
