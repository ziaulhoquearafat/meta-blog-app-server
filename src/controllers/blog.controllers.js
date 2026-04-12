const Blog = require("../models/blog.models");

// get all blogs
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    // console.log(blogs);
    res.status(201).send({ message: "Blog data fetch successfully", blogs });
  } catch (error) {
    console.log("Fetching Data Error", error);
    res.status(500).send({ message: "Fetching Data Error", error });
  }
};

module.exports = {
  getAllBlogs,
};
