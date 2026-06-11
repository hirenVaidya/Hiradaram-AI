import React, { useState, useRef } from 'react';
import './App.css';

type ViewMode = 'login' | 'signup' | 'forgot' | 'otp';

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (viewMode === 'login') {
      console.log('Login submitted:', { email, password });
    } else if (viewMode === 'signup') {
      console.log('Signup submitted:', { username, email, password });
    } else if (viewMode === 'forgot') {
      console.log('Forgot password submitted for:', email);
      // Simulate sending OTP and moving to OTP screen
      setViewMode('otp');
    } else if (viewMode === 'otp') {
      console.log('OTP submitted:', otp.join(''));
    }
  };

  const setMode = (e: React.MouseEvent, mode: ViewMode) => {
    e.preventDefault();
    setViewMode(mode);
    if (mode === 'login' || mode === 'signup') {
      setUsername('');
      setPassword('');
      setShowPassword(false);
    }
    if (mode === 'login') {
      setOtp(['', '', '', '', '', '']);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && isNaN(Number(value))) return;
    
    // Take only the last character if they pasted or typed multiple
    const digit = value.slice(-1);
    
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    // Focus next input automatically
    if (digit && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Move to previous input on backspace if current is empty
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    if (!pastedData || isNaN(Number(pastedData))) return;

    const digits = pastedData.slice(0, 6).split('');
    const newOtp = [...otp];
    
    digits.forEach((digit, i) => {
      if (i < 6) newOtp[i] = digit;
    });
    
    setOtp(newOtp);

    const nextIndex = Math.min(digits.length, 5);
    const nextInput = document.getElementById(`otp-${nextIndex}`);
    nextInput?.focus();
  };

  const renderHeader = () => {
    switch (viewMode) {
      case 'login': return { title: 'Welcome Back', subtitle: 'Please enter your details to sign in.' };
      case 'signup': return { title: 'Create an Account', subtitle: 'Please enter your details to sign up.' };
      case 'forgot': return { title: 'Reset Password', subtitle: 'Enter your email to receive a 6-digit OTP.' };
      case 'otp': return { title: 'Enter OTP', subtitle: `We sent a code to ${email || 'your email'}.` };
    }
  };

  const { title, subtitle } = renderHeader();

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
        
        <form className="login-form" onSubmit={handleSubmit}>
          
          {viewMode === 'signup' && (
            <div className="input-group">
              <input 
                type="text" 
                id="username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder=" "
              />
              <label htmlFor="username">Username</label>
            </div>
          )}

          {(viewMode === 'login' || viewMode === 'signup' || viewMode === 'forgot') && (
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
          )}

          {(viewMode === 'login' || viewMode === 'signup') && (
            <div className="input-group">
              <input 
                type={showPassword ? "text" : "password"} 
                id="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder=" "
              />
              <label htmlFor="password">Password</label>
              <button 
                type="button" 
                className="toggle-password" 
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                )}
              </button>
            </div>
          )}

          {viewMode === 'otp' && (
            <div className="otp-container">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  className="otp-input"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  onPaste={handleOtpPaste}
                  autoComplete="off"
                  maxLength={1}
                  required
                />
              ))}
            </div>
          )}

          {viewMode === 'login' && (
            <div className="form-actions">
              <div className="remember-me">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember me</label>
              </div>
              <a href="#" className="forgot-password" onClick={(e) => setMode(e, 'forgot')}>
                Forgot password?
              </a>
            </div>
          )}

          <button type="submit" className="login-button">
            {viewMode === 'login' ? 'Sign In' : 
             viewMode === 'signup' ? 'Sign Up' : 
             viewMode === 'forgot' ? 'Send OTP' : 'Verify OTP'}
          </button>
        </form>

        {(viewMode === 'login' || viewMode === 'signup') && (
          <div className="social-login">
            <p>Or continue with</p>
            <div className="social-buttons">
              <button className="social-btn">Google</button>
              <button className="social-btn">GitHub</button>
            </div>
          </div>
        )}

        <div className="login-footer">
          {viewMode === 'login' ? (
            <p>Don't have an account? <a href="#" onClick={(e) => setMode(e, 'signup')}>Sign up</a></p>
          ) : viewMode === 'signup' ? (
            <p>Already have an account? <a href="#" onClick={(e) => setMode(e, 'login')}>Sign in</a></p>
          ) : (
            <p>Remember your password? <a href="#" onClick={(e) => setMode(e, 'login')}>Back to login</a></p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
