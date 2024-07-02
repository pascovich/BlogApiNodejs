import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const { Schema } = mongoose;

const favoriSchema = Schema(
  {
    createdAt: { type: Date, default: Date.now },
    authorId: { type: Number },
    postId: { type: Number },
  },
  { timestamps: true }
);

const favoriModel = mongoose.model("favoris", favoriSchema);

export default favoriModel;
