import express from "express";
import {
  signup,
  getUser,
  updateUser,
  deleteUser,
} from "../controller/userController.js";

// create the router
const router = express.Router();

// add routes
router.post("/create", signup);
router.get("/getUsers", getUser);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

// export router
export default router;
