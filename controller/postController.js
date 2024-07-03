import postModel from "../model/postModel.js";

import mongoose from "mongoose";

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
      .send({ message: "all fields are required", post: [] });
  } catch (error) {
    return res.status(500).send({ message: error.message, post: "" });
  }
}

export async function getPosts(req, res) {
  try {
    const posts = await postModel.find().populate("authorId", "nom");
    return res
      .status(200)
      .send({ message: "posts fetched successfully", posts });
  } catch (error) {
    return res.status(500).send({ message: error.message, posts: [] });
  }
}

export async function getOnePost(req, res) {
  try {
    const posts = await postModel
      .findById(req.params.id)
      .populate("authorId", "nom");
    return res
      .status(200)
      .send({ message: "posts fetched successfully", posts });
  } catch (error) {
    return res.status(500).send({ message: error.message, posts: [] });
  }
}

// Récupérez un document Post avec ses auteurs et le nombre de likes
export async function getPostWithAuthorsAndLikes(req, res) {
  try {
    const postId = req.params.id;

    const post = await postModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(postId) } },
      // {
      //   $lookup: {
      //     from: "users",
      //     localField: "authorId",
      //     foreignField: "_id",
      //     as: "authors",
      //   },
      // },
      // {
      //   $lookup: {
      //     from: "users",
      //     localField: "_id",
      //     foreignField: "authorId",
      //     // select: "nom",
      //     as: "authors",
      //   },
      // },

      {
        $lookup: {
          from: "likes",
          localField: "_id",
          foreignField: "postId",
          as: "likes",
        },
      },
      { $unwind: "$likes" },
      {
        $lookup: {
          from: "users",
          localField: "likes.authorId",
          foreignField: "_id",
          // select: "nom",
          as: "likes.author",
        },
      },
      // {
      //   $group: {
      //     _id: "$_id",
      //     title: { $first: "$title" },
      //     authors: { $push: "$authors" },
      //     likesCount: { $sum: { $size: "$likes" } },
      //     nbrUser: { $sum: { $size: "$authors" } },
      //   },
      // },
      {
        $addFields: {
          // likesCount: { $size: "$likes" },
          likesObject: { $objectToArray: "$likes" },
          "likes.authorName": { $arrayElemAt: ["$likes.author.nom", 0] },
          // likesAuthors: { $size: "$likesAuthors" },
        },
      },
      {
        $group: {
          _id: "$_id",
          title: { $first: "$title" },
          content: { $first: "$content" },
          likes: { $push: "$likes" },
        },
      },
      {
        $project: {
          title: 1,
          content: 1,
          likesObject: 1,
          // likesCount: { $size: "$likesObject" },
          likes: 1,
          // likesCount: 1,
          // likesAuthors: 1,
          // "likes.AuthorId": 0,
          // "likes.author": 0,
        },
      },
    ]);

    res.status(200).json(post[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getPostWithComments(req, res) {
  try {
    const postId = req.params.id;

    const post = await postModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(postId) } },
      // {
      //   $lookup: {
      //     from: "users",
      //     localField: "authorId",
      //     foreignField: "_id",
      //     as: "authors",
      //   },
      // },
      // {
      //   $lookup: {
      //     from: "users",
      //     localField: "_id",
      //     foreignField: "authorId",
      //     // select: "nom",
      //     as: "authors",
      //   },
      // },

      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "postId",
          as: "comments",
        },
      },
      { $unwind: "$comments" },
      {
        $lookup: {
          from: "users",
          localField: "comments.authorId",
          foreignField: "_id",
          // select: "nom",
          as: "comments.author",
        },
      },
      // {
      //   $group: {
      //     _id: "$_id",
      //     title: { $first: "$title" },
      //     authors: { $push: "$authors" },
      //     likesCount: { $sum: { $size: "$likes" } },
      //     nbrUser: { $sum: { $size: "$authors" } },
      //   },
      // },
      {
        $addFields: {
          // likesCount: { $size: "$likes" },
          // likesObject: { $objectToArray: "$likes" },
          "comments.authorName": { $arrayElemAt: ["$comments.author.nom", 0] },
          // likesAuthors: { $size: "$likesAuthors" },
        },
      },
      {
        $group: {
          _id: "$_id",
          commentaire: { $first: "$commentaire" },

          comments: { $push: "$comments" },
        },
      },
      {
        $project: {
          commentaire: 1,
          // likesCount: { $size: "$likesObject" },
          comments: 1,
          // likesCount: 1,
          // likesAuthors: 1,
          // "likes.AuthorId": 0,
          // "likes.author": 0,
        },
      },
    ]);

    res.status(200).json(post[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
