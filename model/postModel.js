import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const { Schema } = mongoose;

const postSchema = Schema(
  {
    title: { type: String, min: 2 },
    content: { type: Text, min: 5 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: null },
    authorId: { type: Number },
  },
  { timestamps: true }
);

const postModel = mongoose.model("posts", postSchema);

export default postModel;
