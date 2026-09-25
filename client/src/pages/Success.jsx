import { Link } from "react-router-dom";

export default function Success() {
  return (
    <section className="card success">
      <div className="success-icon">✓</div>
      <h1>Feedback Submitted!</h1>
      <p>Your feedback has been saved successfully.</p>
      <Link className="primary button-link" to="/dashboard">Back to Dashboard</Link>
    </section>
  );
}
