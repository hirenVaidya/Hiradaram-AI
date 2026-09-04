require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;

const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));


// --- Passport OAuth Configuration ---

// Generate JWT Helper
const generateJWT = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
};

// Google Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || 'dummy_id',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'dummy_secret',
    callbackURL: "/api/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ googleId: profile.id });
      
      if (!user) {
        user = await User.findOne({ email: profile.emails[0].value });
        if (user) {
          user.googleId = profile.id;
          await user.save();
        } else {
          user = new User({
            username: profile.displayName.replace(/\s+/g, '') + Math.floor(Math.random()*1000),
            email: profile.emails[0].value,
            googleId: profile.id
          });
          await user.save();
        }
      }
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
));

// GitHub Strategy
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID || 'dummy_id',
    clientSecret: process.env.GITHUB_CLIENT_SECRET || 'dummy_secret',
    callbackURL: "/api/auth/github/callback",
    scope: [ 'user:email' ]
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : `${profile.username}@github.com`;
      let user = await User.findOne({ githubId: profile.id });
      
      if (!user) {
        user = await User.findOne({ email });
        if (user) {
          user.githubId = profile.id;
          await user.save();
        } else {
          user = new User({
            username: profile.username,
            email: email,
            githubId: profile.id
          });
          await user.save();
        }
      }
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
));

// --- Auth Routes ---

// Google Auth Routes
app.get('/api/auth/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }));

app.get('/api/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: 'http://localhost:5173', session: false }),
  (req, res) => {
    const token = generateJWT(req.user);
    res.redirect(`http://localhost:5173?token=${token}`);
  }
);

// GitHub Auth Routes
app.get('/api/auth/github', passport.authenticate('github', { session: false }));

app.get('/api/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: 'http://localhost:5173', session: false }),
  (req, res) => {
    const token = generateJWT(req.user);
    res.redirect(`http://localhost:5173?token=${token}`);
  }
);


// 1. Signup
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();
    const token = generateJWT(newUser);

    res.status(201).json({ token, message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// 2. Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body; 

    const user = await User.findOne({
      $or: [{ email: username }, { username: username }]
    });

    if (!user || !user.password) {
      return res.status(400).json({ message: 'Invalid credentials or user signed up via OAuth' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateJWT(user);
    res.json({ token, message: 'Logged in successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
