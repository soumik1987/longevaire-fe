

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HeroSection.css';

const HeroSection: React.FC = () => {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Discover the world's finest longevity experiences
          </h1>
          <p className="hero-subtitle">
            Your gateway to exclusive wellness retreats and elite health services.
          </p>
          <div className="hero-buttons">
            <Link to="/explore" className="btn-primary">Explore now</Link>
            <Link to="#contact" className="btn-secondary">Contact us</Link>
          </div>
        </div>
        
        <div className="hero-visual">
          <div className="image-stack">
            <img 
              src="https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg" 
              alt="Luxury spa treatment" 
              className="stacked-image primary-image"
            />
            <img 
              src="https://images.pexels.com/photos/6787202/pexels-photo-6787202.jpeg" 
              alt="Wellness center" 
              className="stacked-image secondary-image"
            />
            <img 
              src="https://images.pexels.com/photos/3865575/pexels-photo-3865575.jpeg" 
              alt="Meditation space" 
              className="stacked-image accent-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;