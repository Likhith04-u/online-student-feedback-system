import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  function logout() {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <nav className="navbar">
      <Link className="brand" to="/">Student Feedback</Link>
      <div className="nav-links">
        {user?.role === "student" && <Link to="/dashboard">Dashboard</Link>}
        {user?.role === "admin" && <Link to="/admin">Admin Dashboard</Link>}
        {user && <button className="link-button" onClick={logout}>Logout</button>}
      </div>
    </nav>
  );
}
