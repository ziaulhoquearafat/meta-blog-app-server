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

// get single blogs by id
const getSingleBlogs = async (req, res) => {
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
};

module.exports = {
  getAllBlogs,
  getSingleBlogs,
};
