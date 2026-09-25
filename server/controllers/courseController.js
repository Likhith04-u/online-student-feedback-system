import Course from "../models/Course.js";

export async function getCourses(req, res) {
  try {
    const courses = await Course.find().sort({ code: 1 });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Could not load courses", error: error.message });
  }
}
