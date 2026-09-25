import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function StudentDashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    api.get("/feedback/mine")
      .then((res) => setFeedback(res.data))
      .catch(() => {});
  }, []);

  return (
    <>
      <section className="hero">
        <h1>Welcome, {user.name}</h1>
        <p>Choose a course and submit your feedback.</p>
        <Link className="primary button-link" to="/feedback">Give Feedback</Link>
      </section>

      <section className="card">
        <h2>Your Previous Feedback</h2>
        {feedback.length === 0 ? (
          <p className="muted">No feedback submitted yet.</p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Faculty</th>
                  <th>Rating</th>
                  <th>Comment</th>
                </tr>
              </thead>
              <tbody>
                {feedback.map((item) => (
                  <tr key={item._id}>
                    <td>{item.course.code} - {item.course.name}</td>
                    <td>{item.course.faculty}</td>
                    <td>{"★".repeat(item.rating)}</td>
                    <td>{item.comment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
