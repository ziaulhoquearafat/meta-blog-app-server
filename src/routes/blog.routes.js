const express = require("express");
const Blog = require("../models/blog.models");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    // console.log(blogs);
    res.status(201).send({ message: "Blog data fetch successfully", blogs });
  } catch (error) {
    console.log("Fetching Data Error", error);
    res.status(500).send({ message: "Fetching Data Error", error });
  }
});

// post a new blogs
router.post("/add-post", async (req, res) => {
  try {
    const blog = new Blog({
      ...req.body,
    });
    await blog.save();
    res.status(201).send({ message: "Creating blog Successfully", blog });
  } catch (error) {
    console.log("Error Creating blog", error);
    res.status(500).send({ message: "Error Creating Blog", error });
  }
});

module.exports = router;
