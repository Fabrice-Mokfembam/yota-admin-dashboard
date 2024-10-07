// Login.jsx
import "./auth.css";
import logo from "../../assets/images/load.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { useContext } from "react";
import { adminContext } from "../../context/adminContext";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 

  const { setAdmin } = useContext(adminContext);


const handleLogin = async (e) => {
  e.preventDefault();

  const credentials = {
    email,
    password,
  };

  try {
    // Add withCredentials to enable sending/receiving cookies
    const { data } = await axios.post(
      "https://yotaperformanceshop.com/yps_server/yps_admin/login",
      credentials,
      {
        withCredentials: true, // Allows cookies to be sent/received
      }
    );

    if (data) {
      setAdmin(data);
      console.log(data);
      localStorage.setItem("admin", JSON.stringify(data));
      navigate("/");
    } else {
      console.log("Login failed");
    }
  } catch (error) {
    console.error("Error during login:", error);
  }
};

  return (
    <div className="login-container">
      <div className="login-image-section">
        <img src={logo} alt="YotaPerformance Logo" className="login-logo" />
      </div>
      <div className="login-form-section">
        <form onSubmit={handleLogin} className="login-form">
          <img
            src={logo}
            alt="YotaPerformance Logo"
            className="login-logo-small"
          />
          <h1>Admin Login</h1>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
