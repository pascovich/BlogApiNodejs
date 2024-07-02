import express from "express";
import { create, getPosts } from "../controller/postController.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.get("/posts", getPosts);
router.post("/posts", upload, create);

// router.post("/posts", upload.single("image"), create);

export default router;
