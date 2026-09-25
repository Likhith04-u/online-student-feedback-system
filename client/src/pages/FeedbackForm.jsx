import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function FeedbackForm() {
  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/courses")
      .then((res) => setCourses(res.data))
      .catch((err) => setError(err.response?.data?.message || "Could not load courses"));
  }, []);

  async function submit(e) {
    e.preventDefault();
    setError("");

    try {
      await api.post("/feedback", { courseId, rating, comment });
      navigate("/success");
    } catch (err) {
      setError(err.response?.data?.message || "Could not submit feedback");
    }
  }

  return (
    <section className="card">
      <h1>Course Feedback</h1>
      <p className="muted">Please provide honest feedback about your course.</p>
      {error && <div className="alert error">{error}</div>}

      <form onSubmit={submit}>
        <label>Course</label>
        <select
          required
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
        >
          <option value="">Select a course</option>
          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.code} - {course.name} ({course.faculty})
            </option>
          ))}
        </select>

        <label>Rating: {rating}/5</label>
        <input
          type="range"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        />

        <div className="stars">{"★".repeat(rating)}{"☆".repeat(5 - rating)}</div>

        <label>Comments</label>
        <textarea
          rows="6"
          maxLength="500"
          required
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your comments..."
        />

        <button className="primary" type="submit">Submit Feedback</button>
      </form>
    </section>
  );
}
