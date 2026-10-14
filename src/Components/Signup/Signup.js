import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Added Axios
import "./Signup.css";
// Removed Firebase import
import { useHistory } from "react-router";
import SignUpLoading from "../Loading/SignUpLoading";

export default function Signup() {
  const history = useHistory();
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [phone, setPhone] = useState("");
  let [password, setPassword] = useState("");
  let [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send the user data to our new Node backend
      const response = await axios.post("http://localhost:5000/api/auth/signup", {
        name: name,
        email: email,
        password: password
      });

      console.log("User created successfully:", response.data);
      history.push("/login"); // Redirect to login on success

    } catch (error) {
      console.error("Error signing up:", error);
      // Show the error message from the backend (like "User already exists")
      alert(error.response?.data?.message || "Failed to sign up.");
      setLoading(false); 
    }
  };

  return (
    <>
      {loading && <SignUpLoading />}
      <div>
        <div className="signupParentDiv">
          <img
            width="200px"
            height="200px"
            src="https://firebasestorage.googleapis.com/v0/b/olx-sijeesh-c691f.appspot.com/o/image%2Fthrift-shop%20(2).png?alt=media&token=a0fcd3f3-1667-4ffc-bb4e-1efd17ccee4b"
            alt=""
          ></img>
          <form onSubmit={handleSubmit}>
            <label>Full Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="name"
            />
            <br />
            <label>Email</label>
            <br />
            <input
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
            />
            <br />
            <label>Phone</label>
            <br />
            <input
              className="input"
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              name="phone"
            />
            <br />
            <label>Password</label>
            <br />
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
            />
            <br />
            <br />
            <button>Signup</button>
          </form>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </>
  );
}