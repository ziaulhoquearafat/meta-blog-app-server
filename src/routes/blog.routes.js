const express = require("express");
const Blog = require("../models/blog.models");
const {
  getAllBlogs,
  getSingleBlogs,
  postAnewBlog,
  deleteABlog,
  updateABlog,
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

// update single blogs by id
router.put("/:id", updateABlog);

module.exports = router;
