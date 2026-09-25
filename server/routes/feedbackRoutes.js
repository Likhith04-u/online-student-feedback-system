import express from "express";
import {
  createFeedback,
  getMyFeedback,
  getAllFeedback
} from "../controllers/feedbackController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createFeedback);
router.get("/mine", protect, getMyFeedback);
router.get("/", protect, adminOnly, getAllFeedback);

export default router;
