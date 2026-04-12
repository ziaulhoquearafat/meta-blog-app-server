const express = require("express");
const Blog = require("../models/blog.models");
const {
  getAllBlogs,
  getSingleBlogs,
  postAnewBlog,
  deleteABlog,
} = require("../controllers/blog.controllers");
const router = express.Router();

// get all blogs
router.get("/", getAllBlogs);

// get single blogs by _id
router.get("/:id", getSingleBlogs);

// post a new blogs
router.post("/add-post", postAnewBlog);

// deleted single blogs by id
router.delete("/:id", deleteABlog);

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
