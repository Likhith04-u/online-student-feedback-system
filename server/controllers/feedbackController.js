import Feedback from "../models/Feedback.js";

export async function createFeedback(req, res) {
  try {
    const { courseId, rating, comment } = req.body;

    const numericRating = Number(rating);

    if (!courseId || !numericRating || !comment?.trim()) {
      return res.status(400).json({
        message: "Course, rating and comment are required"
      });
    }

    if (!Number.isInteger(numericRating) || numericRating < 1 || numericRating > 5) {
      return res.status(400).json({ message: "Rating must be an integer from 1 to 5" });
    }

    const existing = await Feedback.findOne({
      student: req.user.id,
      course: courseId
    });

    if (existing) {
      return res.status(409).json({
        message: "You have already submitted feedback for this course"
      });
    }

    const feedback = await Feedback.create({
      student: req.user.id,
      course: courseId,
      rating: numericRating,
      comment: comment.trim()
    });

    res.status(201).json({
      message: "Feedback submitted successfully",
      feedback
    });
  } catch (error) {
    res.status(500).json({ message: "Feedback submission failed", error: error.message });
  }
}

export async function getMyFeedback(req, res) {
  try {
    const feedback = await Feedback.find({ student: req.user.id })
      .populate("course", "code name faculty")
      .sort({ createdAt: -1 });

    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: "Could not load feedback", error: error.message });
  }
}

export async function getAllFeedback(req, res) {
  try {
    const feedback = await Feedback.find()
      .populate("student", "name email")
      .populate("course", "code name faculty")
      .sort({ createdAt: -1 });

    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: "Could not load all feedback", error: error.message });
  }
}
