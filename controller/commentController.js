import commentModel from "../model/commentModel.js";

// import mongoose from "mongoose";

export async function comment_post(req, res) {
  try {
    const { commentaire, authorId, postId } = req.body;

    if (postId && authorId) {
      const comment = await commentModel.create({
        commentaire,
        postId,
        authorId,
      });

      return res
        .status(200)
        .send({ message: "comment add successfully", comment });
    }
    return res
      .status(422)
      .send({ message: "all fields are required", comment: [] });
  } catch (error) {
    return res.status(500).send({ message: error.message, comment: "" });
  }
}
export async function delete_comment(req, res) {
  try {
    const commentId = await commentModel.findById(req.params.id);

    if (commentId) {
      await commentId.deleteOne();

      return res
        .status(200)
        .send({ message: "comment deleted successfully", comment });
    }
    return res.status(422).send({ message: "comment not found", comment: [] });
  } catch (error) {
    return res.status(500).send({ message: error.message, comment: "" });
  }
}

export async function getcomments(req, res) {
  try {
    const comments = await commentModel.find().populate("authorId", "nom");
    return res
      .status(200)
      .send({ message: "comments fetched successfully", comments });
  } catch (error) {
    return res.status(500).send({ message: error.message, comments: [] });
  }
}
// export async function getPostcomments(req, res) {
//   try {
//     const postcomments = await commentModel.findById(req.params.id).populate({
//       path: "authorId",
//       select: "username nom",
//     });
//     //   .populate("authorId", "nom");
//     return res
//       .status(200)
//       .send({ message: "all post's comments fetched successfully", postcomments });
//   } catch (error) {
//     return res.status(500).send({ message: error.message, postcomments: [] });
//   }
// }
