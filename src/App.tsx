import React, { useState } from 'react';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login submitted:', { email, password });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Please enter your details to sign in.</p>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input 
              type="email" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder=" "
            />
            <label htmlFor="email">Email address</label>
          </div>
          <div className="input-group">
            <input 
              type="password" 
              id="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder=" "
            />
            <label htmlFor="password">Password</label>
          </div>
          <div className="form-actions">
            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <a href="#" className="forgot-password">Forgot password?</a>
          </div>
          <button type="submit" className="login-button">Sign In</button>
        </form>
        <div className="social-login">
          <p>Or continue with</p>
          <div className="social-buttons">
            <button className="social-btn">Google</button>
            <button className="social-btn">GitHub</button>
          </div>
        </div>
        <div className="login-footer">
          <p>Don't have an account? <a href="#">Sign up</a></p>
        </div>
      </div>
      
      {/* Decorative background elements */}
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
    </div>
  );
}

export default App;
