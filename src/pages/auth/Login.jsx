import './auth.css';
import logo from '../../assets/images/load.svg';
import { useState } from 'react';

function Login() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    console.log('Logging in:', { username, email, password });
  };

  return (
    <div className="login-container">
      <div className="login-image-section">
        <img src={logo} alt="YotaPerformance Logo" className="login-logo" />
      </div>
      <div className="login-form-section">
        <form onSubmit={handleLogin} className="login-form">
          <img src={logo} alt="YotaPerformance Logo" className="login-logo-small" />
          <h1>Admin Login</h1>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
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
