import likeModel from "../model/likeModel.js";
import postModel from "../model/postModel.js";

// import mongoose from "mongoose";

export async function like_post(req, res) {
  try {
    const { authorId, postId } = req.body;

    if (postId && authorId) {
      const like = await likeModel.create({
        postId,
        authorId,
      });

      return res.status(200).send({ message: "post liked successfully", like });
    }
    return res
      .status(422)
      .send({ message: "all fields are required", like: [] });
  } catch (error) {
    return res.status(500).send({ message: error.message, like: "" });
  }
}
export async function unlike_post(req, res) {
  try {
    const likeId = await likeModel.findById(req.params.id);

    if (likeId) {
      await likeId.deleteOne();

      return res
        .status(200)
        .send({ message: "post unliked successfully", like });
    }
    return res.status(422).send({ message: "like not found", like: [] });
  } catch (error) {
    return res.status(500).send({ message: error.message, like: "" });
  }
}

export async function getlikes(req, res) {
  try {
    const likes = await likeModel.find().populate("authorId", "nom");
    return res
      .status(200)
      .send({ message: "likes fetched successfully", likes });
  } catch (error) {
    return res.status(500).send({ message: error.message, likes: [] });
  }
}
export async function getPostLikes(req, res) {
  try {
    const postlikes = await likeModel.findById(req.params.id).populate({
      path: "authorId",
      select: "username nom",
    });
    //   .populate("authorId", "nom");
    return res
      .status(200)
      .send({ message: "all post's likes fetched successfully", postlikes });
  } catch (error) {
    return res.status(500).send({ message: error.message, postlikes: [] });
  }
}
