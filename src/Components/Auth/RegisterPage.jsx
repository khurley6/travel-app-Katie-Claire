// RegisterPage.jsx
// Route: /register
// Allows new users to create an account with username, email, and password
// Uses register() from authService, redirects to home on success

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../../Common/services/authService";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle register form submission
  async function handleRegister(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await register(username, email, password);
      navigate("/");
    } catch (err) {
      setError(err.message || "Could not create account.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-card">
      <h1>Register</h1>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </div>

        <button type="submit" className="btn-primary" disabled={loading}
          style={{ width: "100%", borderRadius: 8, padding: "10px" }}>
          {loading ? "Creating account..." : "Register"}
        </button>
      </form>

      <p className="auth-footer">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default RegisterPage;