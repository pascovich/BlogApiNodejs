import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const { Schema } = mongoose;

const commentSchema = Schema(
  {
    title: { type: String, min: 2 },
    content: { type: Text, min: 5 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: null },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "posts" },
  },
  { timestamps: true }
);

const commentModel = mongoose.model("comments", commentSchema);

export default commentModel;
