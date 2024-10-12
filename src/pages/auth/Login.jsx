// Login.jsx
import "./auth.css";
import logo from "../../assets/images/load.svg";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { adminContext } from "../../context/adminContext";
import axios from "axios";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // Import eye icons
import Animation from "../../components/animation/Animation";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const { setAdmin } = useContext(adminContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    const credentials = {
      email,
      password,
    };

    try {
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
    <>
      {isLoading && <Animation/>}
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
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"} // Toggle input type
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className="password-toggle-icon"
                  onClick={() => setShowPassword(!showPassword)} // Toggle visibility
                >
                  {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </span>
              </div>
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
