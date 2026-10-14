import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import Header from "../Components/Header/Header";

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Note: Update this endpoint if your backend URL is different
      const response = await axios.post("https://thrift-shop-backend-532l.onrender.com/api/users/login", {
        email,
        password
      });
      
      // Save user details to localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user || response.data));
      
      history.push("/");
    } catch (error) {
      console.error("Login error:", error);
      alert("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      
      <div style={{ paddingTop: "120px", paddingBottom: "60px", minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
        <div style={{ maxWidth: "400px", margin: "0 auto", padding: "30px", border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "#fff", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
          
          {/* THRIFT SHOP LOGO */}
          <div style={{ textAlign: "center", marginBottom: "25px" }}>
            <h1 style={{ color: "#002f34", fontSize: "36px", margin: "0", fontWeight: "900", letterSpacing: "-1px" }}>
              Thrift Shop
            </h1>
            <p style={{ color: "#555", fontSize: "14px", marginTop: "5px" }}>Login to your account</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <div>
              <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px", color: "#002f34", fontSize: "14px" }}>Email Address</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", boxSizing: "border-box" }} placeholder="john@example.com" />
            </div>

            <div>
              <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px", color: "#002f34", fontSize: "14px" }}>Password</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", boxSizing: "border-box" }} placeholder="••••••••" />
            </div>

            <button type="submit" disabled={loading} style={{ padding: "12px", backgroundColor: "#002f34", color: "white", fontWeight: "bold", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "16px", marginTop: "10px" }}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div style={{ textAlign: "center", marginTop: "20px", fontSize: "14px", color: "#555" }}>
            Don't have an account?{" "}
            <Link to="/signup" style={{ color: "#002f34", fontWeight: "bold", textDecoration: "none" }}>
              Sign up here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;