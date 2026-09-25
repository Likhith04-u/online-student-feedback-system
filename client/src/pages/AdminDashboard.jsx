import { useEffect, useState } from "react";
import api from "../services/api";

export default function AdminDashboard() {
  const [feedback, setFeedback] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/feedback")
      .then((res) => setFeedback(res.data))
      .catch((err) => setError(err.response?.data?.message || "Could not load feedback"));
  }, []);

  const average = feedback.length
    ? (feedback.reduce((sum, item) => sum + item.rating, 0) / feedback.length).toFixed(2)
    : "0.00";

  return (
    <>
      <section className="hero">
        <h1>Faculty/Admin Dashboard</h1>
        <p>Review submitted student feedback.</p>
      </section>

      {error && <div className="alert error">{error}</div>}

      <div className="stats">
        <div className="stat card">
          <strong>{feedback.length}</strong>
          <span>Total Feedback</span>
        </div>
        <div className="stat card">
          <strong>{average}/5</strong>
          <span>Average Rating</span>
        </div>
      </div>

      <section className="card">
        <h2>Feedback List</h2>
        {feedback.length === 0 ? (
          <p className="muted">No feedback has been submitted.</p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Course</th>
                  <th>Faculty</th>
                  <th>Rating</th>
                  <th>Comment</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {feedback.map((item) => (
                  <tr key={item._id}>
                    <td>{item.student?.name || "Unknown"}<br /><small>{item.student?.email || "N/A"}</small></td>
<td>{item.course?.code || "N/A"}<br /><small>{item.course?.name || "N/A"}</small></td>
<td>{item.course?.faculty || "N/A"}</td>
                    <td>{"★".repeat(item.rating)}{"☆".repeat(5 - item.rating)}</td>
                    <td>{item.comment}</td>
                    <td>{new Date(item.createdAt).toLocaleDateString()}</td>
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
