# Imagaze Full-Stack Web App

A modern, high-performance web application featuring an immersive scroll-based zoom animation, a beautiful glassmorphism UI, and a fully secure backend with JWT and OAuth authentication.

## 🌟 Key Features

### Frontend (React + Vite + TypeScript)
- **Immersive Scroll Animation**: A custom-engineered Framer Motion animation on the Home page. As the user scrolls down, the text `"WE DON'T ONLY IMAGINE BUT CREATE INTO REALITY"` expands dynamically from the center, seamlessly zooming deep into the letter 'O'.
- **Glassmorphism UI**: A gorgeous, translucent aesthetic across the application, featuring a fixed frosted-glass navigation bar and glowing content cards.
- **Dynamic Routing & Views**: Seamless switching between Home, Features, and About pages without full page reloads.
- **Robust Auth UI**: A beautifully designed authentication portal supporting Login, Signup, Forgot Password, and an interactive 6-digit OTP entry screen with paste support.

### Backend (Node.js + Express + MongoDB)
- **Secure JWT Authentication**: Custom login and signup endpoints (`/api/auth/login` and `/api/auth/signup`) that securely generate JSON Web Tokens for session management.
- **Persistent Sessions**: The frontend intercepts and stores the JWT in `localStorage`, keeping users securely logged in across page refreshes.
- **Password Encryption**: All passwords are automatically salted and hashed using `bcryptjs` before being stored in the MongoDB database.
- **Google & GitHub OAuth**: Integrated `passport.js` to allow seamless third-party logins via Google and GitHub.

## 🚀 Getting Started

Because this is a full-stack application, you need to run both the frontend and backend servers simultaneously.

### 1. Start the Backend Server
First, ensure you have a local MongoDB instance running (usually on `mongodb://localhost:27017`).
```bash
cd server
# Install backend dependencies
npm install
# Start the Express server (runs on port 5000)
node index.js
```

### 2. Configure OAuth (Important)
To enable Google and GitHub logins, open `server/.env` and replace the placeholder keys with your actual API credentials:
```env
GOOGLE_CLIENT_ID=your_google_id
GOOGLE_CLIENT_SECRET=your_google_secret
GITHUB_CLIENT_ID=your_github_id
GITHUB_CLIENT_SECRET=your_github_secret
```

### 3. Start the Frontend Server
Open a new terminal window in the root directory of the project:
```bash
# Install frontend dependencies
npm install
# Start the Vite React app (runs on port 5173)
npm run dev
```

## 🛠 Tech Stack
- **Frontend**: React 18, TypeScript, Vite, Framer Motion, standard CSS.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB, Mongoose ODM.
- **Security**: JSON Web Tokens (JWT), bcryptjs, Passport.js.
