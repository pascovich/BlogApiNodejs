import express from "express";
import {
  create,
  getPosts,
  getOnePost,
  getPostWithAuthorsAndLikes,
  getPostWithComments,
} from "../controller/postController.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.get("/posts", getPosts);
router.get("/posts/:id", getOnePost);
router.post("/posts", upload, create);
router.get("/getPostWithComments/:id", getPostWithComments);
router.get("/getPostWithAuthorsAndLikes/:id", getPostWithAuthorsAndLikes);

// router.post("/posts", upload.single("image"), create);

export default router;
