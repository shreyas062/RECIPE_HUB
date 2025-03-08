// Updated Login Component
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      email: formData.email,
      password: formData.password.toString(), // Ensure password is always a string
    };

    console.log("🔹 Sending Login Data:", loginData); // Debugging

    try {
      const res = await fetch("https://recipe-hub-backend-e5yl.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await res.json();
      console.log("🔍 Response Data:", data);

      if (res.ok) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("🚨 Login Error:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login to Your Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
            required
          />
          {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
          <button type="submit" style={styles.button}>Login</button>
        </form>
        <p style={styles.text}>
          Don't have an account? <span style={styles.link} onClick={() => navigate("/signup")}>Sign Up</span>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: { display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#f9f9f9" },
  card: { padding: "30px", borderRadius: "10px", background: "#fff", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", textAlign: "center", width: "350px" },
  title: { fontSize: "24px", marginBottom: "20px", fontWeight: "bold" },
  input: { width: "100%", padding: "12px", margin: "8px 0", borderRadius: "8px", border: "1px solid #ccc", fontSize: "16px" },
  button: { width: "100%", padding: "12px", borderRadius: "8px", background: "#ff7e5f", color: "#fff", fontSize: "18px", fontWeight: "bold", cursor: "pointer", border: "none", transition: "0.3s" },
  text: { marginTop: "10px", fontSize: "14px" },
  link: { color: "#ff7e5f", fontWeight: "bold", cursor: "pointer" }
};

export default Login;
