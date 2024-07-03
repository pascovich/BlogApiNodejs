import express from "express";
import {
  like_post,
  unlike_post,
  getlikes,
  getPostLikes,
} from "../controller/likeController.js";

// create the router
const router = express.Router();

// add routes
router.post("/likePost", like_post);
router.delete("/unlike_post/:id", unlike_post);
router.get("/getlikes", getlikes);
router.get("/getPostLikes/:id", getPostLikes);

// export router
export default router;
