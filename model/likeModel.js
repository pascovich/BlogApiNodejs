import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const { Schema } = mongoose;

const likeSchema = Schema(
  {
    createdAt: { type: Date, default: Date.now },
    authorId: { type: Number },
    postId: { type: Number },
  },
  { timestamps: true }
);

const likeModel = mongoose.model("likes", likeSchema);

export default likeModel;
