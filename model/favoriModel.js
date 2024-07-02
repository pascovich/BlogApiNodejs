import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const { Schema } = mongoose;

const favoriSchema = Schema(
  {
    createdAt: { type: Date, default: Date.now },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "posts" },
  },
  { timestamps: true }
);

const favoriModel = mongoose.model("favoris", favoriSchema);

export default favoriModel;
