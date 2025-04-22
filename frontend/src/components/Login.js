import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Login() {
  const [idNumber, setIdNumber] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
      if (location.state.registeredId) {
        setIdNumber(location.state.registeredId);
      }
    }
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with:", { idNumber, password });
    navigate("/dashboard");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="card p-4 shadow"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        {message && <div className="alert alert-success">{message}</div>}

        <h2 className="text-center mb-4">Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">ID Number</label>
            <input
              type="text"
              className="form-control"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
              placeholder="Enter your ID number"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>

        <p className="text-center mt-3">
          Don't have an account?{" "}
          <span
            className="text-primary"
            role="button"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/registration")}
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
