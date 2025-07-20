import React from 'react';
import '../styles/SecretsSection.css';

const SecretsSection: React.FC = () => {
  return (
    <section className="secrets-section">
      <div className="secrets-container">
        <div className="secrets-content fade-in-up">
          <h2 className="secrets-title">Discover the secrets to a longer life</h2>
          <a href="#explore" className="btn-primary secrets-btn">Explore now</a>
        </div>
        <div className="secrets-visual fade-in-up">
          <img 
            src="https://images.pexels.com/photos/4047148/pexels-photo-4047148.jpeg" 
            alt="Sophisticated wellness clinic entrance" 
            className="secrets-image"
          />
        </div>
      </div>
    </section>
  );
};

export default SecretsSection;