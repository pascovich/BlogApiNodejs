import postModel from "../model/postModel";
// import mongoose from "mongoose";

export async function create(req, res) {
  try {
    const { title, content, authorId, image } = req.body;

    if (title && content && authorId) {
      if (image) {
        post = await postModel.create({
          title,
          content,
          authorId,
          image,
        });

        return res.send({ message: "post posted successfully", post });
      } else {
        post = await postModel.create({
          title,
          authorId,
          content,
        });
        return res.send({ message: "post posted successfully", post });
      }
    }
    return res.send({ message: "all fields are required", post: "" });
  } catch (error) {
    return res.send({ message: error, post: "" });
  }
}
