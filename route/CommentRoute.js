import express from "express";
import {
  getcomments,
  delete_comment,
  comment_post,
} from "../controller/commentController.js";

const router = express.Router();

router.get("/comments", getcomments);

router.post("/comments", comment_post);
router.delete("/comments/:id", delete_comment);
// router.get("/getPostWithAuthorsAndLikes/:id", getPostWithAuthorsAndLikes);

// router.post("/posts", upload.single("image"), create);

export default router;
