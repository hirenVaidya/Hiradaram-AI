import React from 'react';
import './About.css';

export default function About() {
  return (
    <div className="about-container">
      <h2 className="about-title">About Us</h2>
      <p className="about-subtitle">
        We are a passionate team of designers and engineers dedicated to pushing the boundaries of what is possible on the modern web.
      </p>
      
      <div className="about-content">
        <div className="about-card">
          <h3>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
              <path d="M2 17l10 5 10-5"></path>
              <path d="M2 12l10 5 10-5"></path>
            </svg>
            Our Mission
          </h3>
          <p>
            To empower creators and businesses by providing tools that turn imagination into reality. We believe that stunning aesthetics and flawless performance should go hand-in-hand. Every digital experience we craft is engineered with precision, focusing on immersive interactions and deeply engaging user journeys.
          </p>
        </div>

        <div className="about-card">
          <h3>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 16v-4"></path>
              <path d="M12 8h.01"></path>
            </svg>
            Who We Are
          </h3>
          <p>
            Born from a simple idea to rethink standard interfaces, we've grown into a collective of forward-thinkers. By constantly exploring state-of-the-art libraries like Framer Motion and leveraging modern CSS architectures, we ensure that every project isn't just functional—it's unforgettable.
          </p>
        </div>
      </div>
    </div>
  );
}
