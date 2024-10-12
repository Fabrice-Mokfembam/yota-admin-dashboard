import "./auth.css";
import logo from "../../assets/images/load.svg";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { adminContext } from "../../context/adminContext";
import axios from "axios";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaSpinner } from "react-icons/fa"; 

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isEmail, setIseEmail] = useState(false);

  const { setAdmin } = useContext(adminContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

    const credentials = {
      email,
      password,
    };

    try {
      const { data } = await axios.post(
        "https://yotaperformanceshop.com/yps_server/yps_admin/login",
        credentials,
        {
          withCredentials: true,
        }
      );

      console.log(data);
      if (data.message === "Email not registered") {
        setIseEmail(true);
        console.log(data);
      } else if (data.message === "Incorrect password") {
        setIsPassword(true);
      } else {
        setAdmin(data);
        localStorage.setItem("admin", JSON.stringify(data));
        navigate("/");
      }
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setIsLoading(false); // Stop loading once the process is complete
    }
  };

  return (
    <>
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
                onClick={() => {
                  setIsPassword(false);
                  setIseEmail(false);
                }}
                required
              />
              {isEmail && <span className="wrong-email">incorrect email</span>}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  onClick={() => {
                    setIsPassword(false);
                    setIseEmail(false);
                  }}
                />
                <span
                  className="password-toggle-icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <AiFillEyeInvisible className="log_icon" />
                  ) : (
                    <AiFillEye className="log_icon" />
                  )}
                </span>
                {isPassword && (
                  <span className="wrong-password">incorrect password</span>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="login-button"
              disabled={isLoading} 
            >
              {isLoading ? <FaSpinner className="spinner-icon" /> : "Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
