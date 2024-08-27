import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import "../CSS-pages/login.css";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5174/api/auth/login', { email, password });
      if (response.status === 200) {
        console.log('Login successful:', response.data);
        navigate('/artist-dashboard'); // Navigate to the artist dashboard or any other route
      } else {
        console.error('Error:', response.data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            className="login-input"
            type="email"
            required
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <input
            className="login-input"
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <a className="forgot-link" href="#"> Forgot Password?</a> <br />
        <button className="login-btn" type="submit">Login</button>
        <p>Don't Have an Account?</p>
        <div className="login-account">
          <Link className="signup" to="/signUpClient">SignUp as Client</Link>
        </div>
        <div className="login-account">
          <Link className="signup" to="/signUpArtist">SignUp as Artist</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
