import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setError("");

    try {
      const { data } = await api.post("/auth/login", form);

      if (data.user.role !== "admin") {
        setError("This account does not have administrator access.");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  }

  return (
    <section className="card auth-card">
      <h1>Faculty/Admin Login</h1>
      <p className="muted">Use the seeded admin account for demonstration.</p>
      {error && <div className="alert error">{error}</div>}

      <form onSubmit={submit}>
        <label>Email</label>
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <label>Password</label>
        <input
          type="password"
          required
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="primary" type="submit">Admin Login</button>
      </form>

      <p><strong>Demo:</strong> admin@example.com / Admin@123</p>
    </section>
  );
}
