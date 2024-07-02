import express from "express";
import { signup, getUser } from "../controller/userController.js";

// create the router
const router = express.Router();

// add routes
router.post("/create", signup);
router.get("/getUsers", getUser);

// export router
export default router;
