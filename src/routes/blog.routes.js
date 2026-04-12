const express = require("express");
const Blog = require("../models/blog.models");
const router = express.Router();

// get all blogs
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

// get single blogs by _id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(401).send({ message: "blog not found" });
    }
    res.status(201).send({
      message: "Fetch blog successfully",
      blog,
    });
  } catch (error) {
    console.log("Error fatching blog by id", error);
    res.status(500).send({ message: "Error fatching blog by id", error });
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

// deleted single blogs by id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteBlog = await Blog.findByIdAndDelete(id);
    if (!deleteBlog) {
      res.status(404).send({ message: "page not found" });
    }
    res.status(200).send({ message: "Deleted Blog Successfully", deleteBlog });
  } catch (error) {
    console.log("Error to delete blog", error);
    res.status(500).send({ message: "Error to delete blog", error });
  }
});

module.exports = router;
