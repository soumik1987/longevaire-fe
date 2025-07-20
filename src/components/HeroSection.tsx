import React from 'react';
import '../styles/HeroSection.css';

const HeroSection: React.FC = () => {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title fade-in-up">
            Discover the world's finest longevity experiences
          </h1>
          <p className="hero-subtitle fade-in-up">
            Your gateway to exclusive wellness retreats and elite health services.
          </p>
          <div className="hero-buttons fade-in-up">
            <a href="#explore" className="btn-primary">Explore now</a>
            <a href="#contact" className="btn-secondary">Contact us</a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="image-grid">
            <img 
              src="https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg" 
              alt="Luxury spa treatment room" 
              className="hero-image main-image"
            />
            <img 
              src="https://images.pexels.com/photos/6787202/pexels-photo-6787202.jpeg" 
              alt="Modern wellness center" 
              className="hero-image secondary-image"
            />
            <img 
              src="https://images.pexels.com/photos/3865575/pexels-photo-3865575.jpeg" 
              alt="Serene meditation space" 
              className="hero-image accent-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;