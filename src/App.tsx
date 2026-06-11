import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import VariableProximity from './VariableProximity';
import { motion, useScroll, useTransform, useMotionValue } from 'motion/react';

type ViewMode = 'login' | 'signup' | 'forgot' | 'otp';

function App() {
  const containerRef = useRef(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (viewMode === 'login') {
      if (email.toLowerCase() === 'hiren') {
        setIsLoggedIn(true);
      } else {
        console.log('Login submitted:', { email, password });
      }
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

  const xTarget = useMotionValue(0);
  const yTarget = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["start start", "end end"]
  });
  
  const scale = useTransform(scrollYProgress, [0, 1], [1, 150]);
  const x = useTransform(scrollYProgress, v => v * xTarget.get());
  const y = useTransform(scrollYProgress, v => v * yTarget.get());

  useEffect(() => {
    if (!isLoggedIn) return;
    const updateOrigin = () => {
      const target = document.getElementById('zoom-target');
      const container = document.getElementById('zoom-container');
      if (target && container) {
        const originalTransform = container.style.transform;
        container.style.transform = 'none';
        
        const targetRect = target.getBoundingClientRect();
        
        const ox = targetRect.left + targetRect.width / 2;
        const oy = targetRect.top + targetRect.height / 2;
        
        const cx = document.documentElement.clientWidth / 2;
        const cy = window.innerHeight / 2;
        
        const dx = ox - cx;
        const dy = oy - cy;
        
        xTarget.set(-150 * dx);
        yTarget.set(-150 * dy);
        
        container.style.transform = originalTransform;
      }
    };
    
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => setTimeout(updateOrigin, 50));
    } else {
      setTimeout(updateOrigin, 300);
    }
    
    window.addEventListener('resize', updateOrigin);
    return () => window.removeEventListener('resize', updateOrigin);
  }, [isLoggedIn]);

  if (isLoggedIn) {
    return (
      <>
        <div className="glass-navbar">
          <div className="nav-left">
            {/* Logo space */}
          </div>
          <div className="nav-center">
            <a href="#">Features</a>
            <a href="#">About</a>
          </div>
          <div className="nav-right">
            <button className="nav-action-button" onClick={() => setIsLoggedIn(false)}>
              Logout
            </button>
          </div>
        </div>

        <div ref={scrollContainerRef} style={{ height: '400vh', width: '100%', background: 'var(--bg-dark)' }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <motion.div 
            id="zoom-container"
            style={{ 
              scale, 
              x,
              y,
              transformOrigin: "50% 50%",
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <div className="variable-proximity-demo" ref={containerRef} style={{ maxWidth: '100%', padding: '0 20px', position: 'relative' }}>
              <VariableProximity
                label={"WE DON'T ONLY IMAGINE"}
                highlightIndex={7}
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 1000, 'opsz' 40"
                containerRef={containerRef}
                radius={120}
                falloff="linear"
              />
              <br />
              <VariableProximity
                label={"BUT CREATE INTO REALITY"}
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 1000, 'opsz' 40"
                containerRef={containerRef}
                radius={120}
                falloff="linear"
              />
            </div>
          </motion.div>
        </div>
      </div>
      </>
    );
  }

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
                type="text" 
                id="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder=" "
              />
              <label htmlFor="email">Email or Username</label>
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
