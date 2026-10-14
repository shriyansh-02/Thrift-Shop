import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import Header from "../Components/Header/Header";

const Signup = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Note: Update this endpoint if your backend URL is different
      await axios.post("http://localhost:5000/api/users/register", {
        name,
        email,
        phone,
        password
      });
      alert("Signup successful! Please login.");
      history.push("/login");
    } catch (error) {
      console.error("Signup error:", error);
      alert("Error signing up. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      
      {/* 
        This wrapper uses padding-top to force the form down, 
        making it impossible for the header to hide the logo. 
      */}
      <div style={{ paddingTop: "120px", paddingBottom: "60px", minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
        <div style={{ maxWidth: "400px", margin: "0 auto", padding: "30px", border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "#fff", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
          
          {/* THRIFT SHOP LOGO */}
          <div style={{ textAlign: "center", marginBottom: "25px" }}>
            <h1 style={{ color: "#002f34", fontSize: "36px", margin: "0", fontWeight: "900", letterSpacing: "-1px" }}>
              Thrift Shop
            </h1>
            <p style={{ color: "#555", fontSize: "14px", marginTop: "5px" }}>Create your account to start selling</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <div>
              <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px", color: "#002f34", fontSize: "14px" }}>Full Name</label>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", boxSizing: "border-box" }} placeholder="John Doe" />
            </div>
            
            <div>
              <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px", color: "#002f34", fontSize: "14px" }}>Email Address</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", boxSizing: "border-box" }} placeholder="john@example.com" />
            </div>

            <div>
              <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px", color: "#002f34", fontSize: "14px" }}>Phone Number</label>
              <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", boxSizing: "border-box" }} placeholder="+91 98765 43210" />
            </div>

            <div>
              <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px", color: "#002f34", fontSize: "14px" }}>Password</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", boxSizing: "border-box" }} placeholder="••••••••" />
            </div>

            <button type="submit" disabled={loading} style={{ padding: "12px", backgroundColor: "#002f34", color: "white", fontWeight: "bold", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "16px", marginTop: "10px" }}>
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <div style={{ textAlign: "center", marginTop: "20px", fontSize: "14px", color: "#555" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#002f34", fontWeight: "bold", textDecoration: "none" }}>
              Login here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;