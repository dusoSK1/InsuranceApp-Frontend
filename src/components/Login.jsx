import React, { useState } from "react";
import "../styles/LoginRegister.css";
import { toast } from "react-toastify";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

export default function Login({ setLoggedInUser }) {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = credentials;

    if (!email || !password) {
      toast.error("All fields are required!");
      return;
    }

    try {
      setLoading(true);
      const response = await api.post("api/users/login", { email, password }, { withCredentials: true });

      if (response.status === 200) {
        setLoggedInUser(response.data);
        toast.success("Login successful!");
        navigate("/"); // redirect after login
      } else {
        toast.error("Login failed!");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Invalid email or password!");
      } else {
        toast.error("Server error. Please try again.");
      }
    } finally {
      setLoading(false);
      setCredentials({ email: "", password: "" });
    }
  };

  return (
    <div className="form-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={credentials.email}
          onChange={handleChange}
          disabled={loading}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <div className="link-text">
        <a href="/register">Don't have an account? Register</a>
      </div>
    </div>
  );
}
