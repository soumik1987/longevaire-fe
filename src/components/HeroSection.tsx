import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/HeroSection.css';
import ContactModal from './ContactModal';

const HeroSection: React.FC = () => {
  const [showContactModal, setShowContactModal] = useState(false);
  const [, setActiveDropdown] = useState<string | null>(null);
  const [, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <section className="hero-section-main">
        <div className="hero-container-main">
          <div className="hero-content-main">
            <h1 className="hero-title-main">
              Experience Beyond Ordinary Wellness
            </h1>
            <p className="hero-subtitle-main">
              Your gateway to exclusive wellness retreats and elite health services.
            </p>
            <div className="hero-buttons-main">
              <Link to="/explore" className="btn-primary">Explore now</Link>
              <button 
                className="btn-secondary" 
                onClick={() => {
                  setActiveDropdown(null);
                  setShowContactModal(true);
                  setIsMobileMenuOpen(false);
                }}
              >
                Contact us
              </button>
            </div>
          </div>
          
          <div className="hero-visual-main">
            <div className="image-stack-main">
              <img 
                src="https://pranissa-media.s3.us-east-1.amazonaws.com/images/balconyswim.png" 
                alt="Luxury spa treatment" 
                className="stacked-image primary-image"
              />
              <img 
                src="https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg"
                alt="Wellness center" 
                className="stacked-image secondary-image"
              />
              <img 
                src="https://pranissa-media.s3.us-east-1.amazonaws.com/images/sunriseyoga.png" 
                alt="Meditation space" 
                className="stacked-image accent-image"
              />
            </div>
          </div>
        </div>
      </section>

      {showContactModal && <ContactModal onClose={() => setShowContactModal(false)} />}
    </>
  );
};

export default HeroSection;