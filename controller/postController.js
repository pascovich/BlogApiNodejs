import postModel from "../model/postModel.js";

// import mongoose from "mongoose";

export async function create(req, res) {
  try {
    const { title, content, authorId, image } = req.body;

    if (title && content && authorId) {
      const post = await postModel.create({
        title,
        content,
        authorId,
        image: req.file ? req.file.path : null,
      });

      return res
        .status(200)
        .send({ message: "post posted successfully", post });
    }
    return res
      .status(422)
      .send({ message: "all fields are required", post: "" });
  } catch (error) {
    return res.status(500).send({ message: error.message, post: "" });
  }
}

export async function getPosts() {
  try {
    const posts = await postModel.find().populate("authorId", "username");
    return res
      .status(200)
      .send({ message: "posts fetched successfully", posts });
  } catch (error) {
    return res.status(500).send({ message: error.message, posts: [] });
  }
}
