import React from 'react';
import './Features.css';

const featuresList = [
  {
    title: 'Immersive Animations',
    description: 'Experience buttery-smooth scroll interactions and dynamic text scaling powered by Framer Motion.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
      </svg>
    )
  },
  {
    title: 'Glassmorphism UI',
    description: 'Modern, semi-transparent frosted glass aesthetics that blend perfectly with vibrant backgrounds.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="3" y1="9" x2="21" y2="9"></line>
        <line x1="9" y1="21" x2="9" y2="9"></line>
      </svg>
    )
  },
  {
    title: 'Responsive Layouts',
    description: 'Flawlessly scales across all devices, from ultra-wide desktop monitors to compact mobile screens.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
        <line x1="12" y1="18" x2="12.01" y2="18"></line>
      </svg>
    )
  }
];

export default function Features() {
  return (
    <div className="features-container">
      <h2 className="features-title">Cutting-Edge Features</h2>
      <p className="features-subtitle">
        We don't just imagine the future of web design, we build it. Discover the capabilities that make our platform stand out.
      </p>
      
      <div className="features-grid">
        {featuresList.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">
              {feature.icon}
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
