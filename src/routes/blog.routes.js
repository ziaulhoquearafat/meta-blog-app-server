const express = require("express");
const Blog = require("../models/blog.models");
const { getAllBlogs } = require("../controllers/blog.controllers");
const router = express.Router();

// get all blogs
router.get("/", getAllBlogs);

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

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateBlog = await Blog.findByIdAndUpdate(id, req.body);
    if (!updateBlog) {
      return res.status(404).send({ message: "Blog not Found" });
    }
    res.status(201).send({ message: "Blog update Successfully", updateBlog });
  } catch (error) {
    console.log("Error updating Blog", error);
    res.status(500).send({ message: "Error updating Blog", error });
  }
});

module.exports = router;
