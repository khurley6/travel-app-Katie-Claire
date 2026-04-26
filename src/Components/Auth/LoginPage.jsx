// LoginPage.jsx
// Route: /login
// Allows existing users to log in with username and password
// Uses login() from authService, redirects to home on success

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../Common/services/authService";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle login form submission
  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(username, password);
      navigate("/");
    } catch (err) {
      setError(err.message || "Invalid username or password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-card">
      <h1>Login</h1>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleLogin}>
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
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="auth-footer">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default LoginPage;